import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const COMPRESSIBLE_EXTS = new Set([
  '.html',
  '.js',
  '.css',
  '.svg',
  '.json',
  '.xml',
  '.txt',
  '.webmanifest',
  '.ttf',
]);
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.ttf': 'font/ttf',
};

function previewCompressionPlugin() {
  const cache = new Map();
  return {
    name: 'preview-compression',
    configurePreviewServer(server) {
      const distDir = path.resolve('dist');
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        const urlPath = (req.url || '/').split('?')[0];
        const relPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
        const filePath = path.join(distDir, relPath);
        if (
          !filePath.startsWith(distDir) ||
          !fs.existsSync(filePath) ||
          fs.statSync(filePath).isDirectory()
        ) {
          return next();
        }

        const ext = path.extname(filePath).toLowerCase();
        const isImmutable =
          urlPath.startsWith('/assets/') ||
          urlPath.startsWith('/fonts/') ||
          urlPath.startsWith('/icons/') ||
          urlPath.startsWith('/brand/');

        if (isImmutable) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }

        if (!COMPRESSIBLE_EXTS.has(ext)) return next();

        const acceptEncoding = String(req.headers['accept-encoding'] || '');
        const stat = fs.statSync(filePath);
        const enc = acceptEncoding.includes('br')
          ? 'br'
          : acceptEncoding.includes('gzip')
            ? 'gzip'
            : null;
        if (!enc) return next();

        const cacheKey = `${filePath}:${stat.mtimeMs}:${enc}`;
        let compressed = cache.get(cacheKey);
        if (!compressed) {
          const raw = fs.readFileSync(filePath);
          compressed =
            enc === 'br'
              ? zlib.brotliCompressSync(raw, {
                  params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 9 },
                })
              : zlib.gzipSync(raw, { level: 9 });
          cache.set(cacheKey, compressed);
        }

        res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
        res.setHeader('Content-Encoding', enc);
        res.setHeader('Content-Length', compressed.length);
        res.setHeader('Vary', 'Accept-Encoding');
        res.end(req.method === 'HEAD' ? undefined : compressed);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), previewCompressionPlugin()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
  },
});
