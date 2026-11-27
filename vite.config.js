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
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
};

function previewCompressionPlugin() {
  const cache = new Map();
  return {
    name: 'preview-compression',
    configurePreviewServer(server) {
      const distDir = path.resolve('dist');
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        let urlPath;
        try {
          urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
        } catch {
          return next();
        }
        const relPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
        const filePath = path.resolve(distDir, relPath);
        const relCheck = path.relative(distDir, filePath);
        if (relCheck.startsWith('..') || path.isAbsolute(relCheck)) {
          return next();
        }

        let stat;
        try {
          stat = fs.statSync(filePath);
          if (!stat.isFile()) return next();
        } catch {
          return next();
        }

        const ext = path.extname(filePath).toLowerCase();
        const isImmutable =
          urlPath.startsWith('/assets/') ||
          urlPath.startsWith('/fonts/') ||
          urlPath.startsWith('/icons/') ||
          urlPath.startsWith('/brand/') ||
          urlPath.startsWith('/gallery/');

        if (isImmutable) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }

        if (!COMPRESSIBLE_EXTS.has(ext)) return next();

        const acceptEncoding = String(req.headers['accept-encoding'] || '');
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
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom/client': 'preact/compat/client',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      'react/jsx-dev-runtime': 'preact/jsx-dev-runtime',
    },
  },
  build: {
    target: 'es2020',
    minify: true,
    cssMinify: true,
    sourcemap: false,
  },
});
