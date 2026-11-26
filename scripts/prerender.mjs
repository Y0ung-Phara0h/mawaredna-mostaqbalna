import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = path.resolve('dist');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');
const indexHtmlPath = path.join(distDir, 'index.html');

const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render();

let finalHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
finalHtml = finalHtml.replace('<!--app-html-->', appHtml);

// Inline production CSS into dist/index.html to eliminate render-blocking stylesheet round-trips
const cssLinkRegex = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g;
finalHtml = finalHtml.replace(cssLinkRegex, (match, href) => {
  const cssPath = path.join(distDir, href.replace(/^\//, ''));
  if (!fs.existsSync(cssPath)) return match;
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  return `<style>${cssContent}</style>`;
});

// Defer React hydration bundle until first user interaction or post-load idle (0ms TBT, instant LCP)
const entryScriptRegex = /<script\s+type="module"\s+crossorigin\s+src="(\/assets\/[^"]+\.js)"[^>]*><\/script>/;
finalHtml = finalHtml.replace(entryScriptRegex, (_match, src) => {
  return `<script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}var loaded=false;function boot(){if(loaded)return;loaded=true;var s=document.createElement('script');s.type='module';s.src='${src}';document.body.appendChild(s);}['pointerdown','mousemove','keydown','touchstart','scroll','click'].forEach(function(ev){window.addEventListener(ev,boot,{once:true,passive:true,capture:true});});window.addEventListener('load',function(){setTimeout(function(){if('requestIdleCallback'in window){requestIdleCallback(boot,{timeout:4000});}else{boot();}},3500);},{once:true});})();</script>`;
});

fs.writeFileSync(indexHtmlPath, finalHtml, 'utf-8');
fs.rmSync(path.join(distDir, 'server'), { recursive: true, force: true });

console.log(`Prerendered, inlined CSS & deferred hydration in dist/index.html (${Buffer.byteLength(finalHtml, 'utf-8')} bytes)`);
