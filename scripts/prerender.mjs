import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = path.resolve('dist');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
const indexHtmlPath = path.join(distDir, 'index.html');
const vercelPath = path.resolve('vercel.json');

const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render();

let finalHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
finalHtml = finalHtml.replace('<!--app-html-->', () => appHtml);

// Inline production CSS into dist/index.html to eliminate render-blocking stylesheet round-trips
const cssLinkRegex = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g;
finalHtml = finalHtml.replace(cssLinkRegex, (match, href) => {
  const cssPath = path.join(distDir, href.replace(/^\//, ''));
  if (!fs.existsSync(cssPath)) return match;
  const cssContent = fs.readFileSync(cssPath, 'utf-8').replace(/<\/style>/gi, '<\\/style>');
  return `<style>${cssContent}</style>`;
});

// Constant inline hydration loader (reads chunk path from data-entry so its SHA-256 CSP hash never changes across builds)
const INLINE_LOADER = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}var cs=document.currentScript||document.querySelector('script[data-entry]');var entry=cs&&cs.getAttribute('data-entry');if(!entry)return;window.__mmHydrated=false;var pendingEl=null,pendingSub=null,loaded=false;window.__mmFlush=function(){if(pendingEl&&pendingEl.isConnected){var el=pendingEl;pendingEl=null;el.click();}if(pendingSub&&pendingSub.isConnected){var f=pendingSub;pendingSub=null;f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));}};document.addEventListener('click',function(e){if(window.__mmHydrated)return;var t=e.target&&e.target.closest?e.target.closest('button,.gal-card'):null;if(t){pendingEl=t;}},true);document.addEventListener('submit',function(e){if(!window.__mmHydrated){e.preventDefault();pendingSub=e.target;}},true);function boot(){if(loaded)return;loaded=true;var s=document.createElement('script');s.type='module';s.src=entry;document.body.appendChild(s);}['pointerdown','keydown','touchstart','scroll','click'].forEach(function(ev){window.addEventListener(ev,boot,{once:true,passive:true,capture:true});});window.addEventListener('load',function(){setTimeout(function(){if('requestIdleCallback'in window){requestIdleCallback(boot,{timeout:4000});}else{boot();}},7500);},{once:true});})();`;

const entryScriptRegex = /<script\s+type="module"\s+crossorigin\s+src="(\/assets\/[^"]+\.js)"[^>]*><\/script>/;
finalHtml = finalHtml.replace(entryScriptRegex, (_match, src) => {
  return `<script data-entry="${src}">${INLINE_LOADER}</script>`;
});

fs.writeFileSync(indexHtmlPath, finalHtml, 'utf-8');
fs.rmSync(path.join(distDir, 'server'), { recursive: true, force: true });

// Ensure vercel.json CSP script-src hash matches the constant INLINE_LOADER
if (fs.existsSync(vercelPath)) {
  const hash = crypto.createHash('sha256').update(INLINE_LOADER, 'utf8').digest('base64');
  const vercelCfg = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
  const rootHeaderBlock = vercelCfg.headers?.find((h) => h.source === '/(.*)');
  const cspHeader = rootHeaderBlock?.headers?.find((h) => h.key === 'Content-Security-Policy');
  const expectedScriptSrc = `script-src 'self' 'sha256-${hash}';`;
  if (cspHeader && !cspHeader.value.includes(expectedScriptSrc)) {
    cspHeader.value = cspHeader.value.replace(/script-src [^;]+;/, expectedScriptSrc);
    fs.writeFileSync(vercelPath, JSON.stringify(vercelCfg, null, 2) + '\n', 'utf-8');
  }
}

console.log(`Prerendered, inlined CSS & deferred hydration in dist/index.html (${Buffer.byteLength(finalHtml, 'utf-8')} bytes)`);
