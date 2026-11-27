<div align="center">
  <img src="./public/brand/icon-logo.svg" alt="Mawardna Mostaqbalna Logo" width="72" height="72" />
  <h1>مواردنا مستقبلنا — Mawardna Mostaqbalna</h1>
  <p><strong>من مخلفاتنا نصنع مستقبلًا • من الحقل إلى الأرض مرة أخرى</strong></p>
  <p>
    Fast, SSR-prerendered RTL Arabic web application for <strong>Mawardna Mostaqbalna</strong>, an Egyptian agricultural waste recycling company producing 100% pure sugarcane-bagasse compost (كمبوست نقي 100%).
  </p>

  <p>
    <a href="https://mawardna-mostaqbalna.com/"><img src="https://img.shields.io/badge/Website-mawardna--mostaqbalna.com-286631?style=flat&logo=googlechrome&logoColor=white" alt="Live Website" /></a>
    <img src="https://img.shields.io/badge/Preact-11.2.0-673AB8?style=flat&logo=preact&logoColor=white" alt="Preact" />
    <img src="https://img.shields.io/badge/Vite-8.3.8-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=flat&logo=css&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Vercel-Hosted-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/Cloudinary-Adaptive_Video-3448C5?style=flat&logo=cloudinary&logoColor=white" alt="Cloudinary" />
    <img src="https://img.shields.io/badge/Language-Arabic_(RTL)-1C4A27?style=flat" alt="Arabic RTL" />
  </p>
</div>

---

## ![Overview](https://img.shields.io/badge/-%20-286631?style=flat&logo=leaflet&logoColor=white) Overview

**Mawardna Mostaqbalna** converts sugarcane and agricultural residues into lab-tested, weed-seed-free organic compost (`كمبوست نقي 100%`) tailored for Egyptian farms, orchards, and newly reclaimed desert land.

The web platform is engineered specifically for agricultural customers and field engineers—including visitors on mobile devices and low-bandwidth rural/desert connections—combining static SSR prerendering, deferred hydration, inline critical CSS, local WebP/WOFF2 assets, and strict security headers.

---

## ![Features](https://img.shields.io/badge/-%20-286631?style=flat&logo=checkmarx&logoColor=white) Key Features

| Feature | Description |
| :--- | :--- |
| **Dual-Unit Farm Calculator** | Calculates estimated compost requirements (min–max ranges in **tons** and **m³**) across 7 crop types and 5 soil profiles using lab bulk density (`500–550 kg/m³`), with unit conversions (feddan, kirat, hectare, m²) and one-click order handoff. |
| **Circular Process Animation** | Interactive 5-stage SVG field-to-soil animation paired with a 10-step production timeline (`المخلفات الزراعية` to `الاستخدام الزراعي`), scaling cleanly without horizontal overflow on mobile. |
| **Network-Aware Video Testimonials** | Click-to-load portrait video facade with a local WebP poster preview and adaptive Cloudinary delivery (`f_auto,q_auto`) tuned to `navigator.connection` (`saveData`, `2g`/`3g` detection). |
| **Product Spec Datasheet** | Animated laboratory composition breakdown (`45–55%` organic matter, `pH 6.5`, `35%` moisture, NPK, cellulose, and bulk density). |
| **Field Gallery & Lazy Lightbox** | Real on-site operational photography in WebP with responsive `srcSet` thumbnails and a dynamically code-split `GalleryLightbox` modal. |
| **Validated Lead Capture** | Client-side Egyptian & international phone validation, instant WhatsApp (`+20 111 134 2238`) message formatting, `mailto:` fallback, and clipboard copy. |
| **Light / Dark Theme & RTL** | Automatic `prefers-color-scheme` detection plus persistent `localStorage` toggle synced across header navigation, favicon, and footer branding. |

---

## ![Architecture](https://img.shields.io/badge/-%20-1C4A27?style=flat&logo=lightning&logoColor=white) Performance & Security Architecture

- **Static SSR Prerendering (`scripts/prerender.mjs`)**: Compiles a server bundle (`src/entry-server.jsx`), renders full HTML into `dist/index.html`, and removes temporary SSR build output.
- **Zero Render-Blocking CSS**: The build script inlines compiled stylesheet assets directly into `dist/index.html` for single-round-trip first paint.
- **Deferred Hydration + Event Replay**: An inline bootstrap script defers loading the main module bundle until first user interaction (`pointerdown`, `keydown`, `touchstart`, `scroll`, `click`) or idle callback, capturing early button clicks or form submissions and replaying them via `window.__mmFlush()`.
- **Preact Compatibility Aliasing (`vite.config.js`)**: Aliases `react` and `react-dom` to `preact/compat` to keep client JavaScript compact.
- **Asset Optimization**:
  - Subsetted local WOFF2 + TTF brand fonts (`Hanimation` Arabic & `Outfit` Latin) with high-priority preloads.
  - Responsive WebP hero artwork (`hero-cycle-sm.webp` / `hero-cycle.webp`) and a single-request WebP icon sprite (`public/icons/sprite.webp`).
  - Built-in Brotli & Gzip compression middleware in `vite preview`.
- **Automated CSP Hash Synchronization (`vercel.json`)**: `scripts/prerender.mjs` computes the SHA-256 hash of the inline hydration bootstrapper and updates `Content-Security-Policy` in `vercel.json`, alongside `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `immutable` asset caching.

---

## ![Stack](https://img.shields.io/badge/-%20-3D463C?style=flat&logo=stackshare&logoColor=white) Tech Stack

| Layer | Technology |
| :--- | :--- |
| **UI Runtime** | ![Preact](https://img.shields.io/badge/Preact-^11.2.0-673AB8?style=flat&logo=preact&logoColor=white) ![React Compat](https://img.shields.io/badge/preact--render--to--string-^6.8.3-673AB8?style=flat&logo=preact&logoColor=white) |
| **Build & Preview** | ![Vite](https://img.shields.io/badge/Vite-^8.3.8-646CFF?style=flat&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-ESM_Prerender-339933?style=flat&logo=nodedotjs&logoColor=white) |
| **Styling & Media** | ![CSS3](https://img.shields.io/badge/CSS3-Variables_%26_Grid-1572B6?style=flat&logo=css&logoColor=white) ![WebP](https://img.shields.io/badge/WebP-Sprites_%26_Thumbnails-4F8F3A?style=flat) ![Cloudinary](https://img.shields.io/badge/Cloudinary-Video_CDN-3448C5?style=flat&logo=cloudinary&logoColor=white) |
| **Hosting & SEO** | ![Vercel](https://img.shields.io/badge/Vercel-CSP_%26_Headers-000000?style=flat&logo=vercel&logoColor=white) ![JSON-LD](https://img.shields.io/badge/Schema.org-JSON--LD-7AB34C?style=flat&logo=json&logoColor=white) |

---

## ![Structure](https://img.shields.io/badge/-%20-5A432B?style=flat&logo=files&logoColor=white) Project Structure

```text
MM/
├── index.html                  # Document shell, SEO meta tags, font/LCP preloads, JSON-LD schema
├── package.json                # Scripts and dependencies (Preact + Vite)
├── vite.config.js              # Preact compat aliases & Brotli/Gzip preview plugin
├── vercel.json                 # CSP (SHA-256), security headers, immutable caching, rewrites
├── scripts/
│   └── prerender.mjs           # SSR prerender, CSS inlining, deferred hydration & CSP sync
├── public/
│   ├── brand/                  # Light/dark SVGs for navbar, footer, and favicons
│   ├── fonts/                  # Subsetted Hanimation & Outfit WOFF2/TTF fonts
│   ├── gallery/                # On-site operational WebP photos & thumbnails
│   ├── icons/                  # Brand icon sprite (sprite.webp) & WebP icons
│   ├── testimonials/           # Static WebP video poster preview
│   ├── hero-cycle*.webp        # Responsive hero circular economy visual
│   ├── manifest.webmanifest    # Arabic RTL web app manifest
│   ├── robots.txt & sitemap.xml
└── src/
    ├── main.jsx                # Client hydration entry + deferred click/submit flush
    ├── entry-server.jsx        # SSR entry point
    ├── App.jsx                 # Page sections & IntersectionObserver reveal/nav logic
    ├── components/             # Modular UI sections (Hero, FarmCalculator, ProcessSection, etc.)
    ├── data/siteData.js        # Navigation, services, datasheet, steps, FAQ, gallery & testimonials
    ├── services/leadService.js # WhatsApp / mailto inquiry formatting & validation handoff
    ├── styles/                 # main.css & icons.css
    └── utils/                  # calculator.js, validation.js, format.js
```

---

## ![Start](https://img.shields.io/badge/-%20-286631?style=flat&logo=gnubash&logoColor=white) Getting Started

### Prerequisites

- **Node.js** `^20.19.0 || >=22.12.0` and **npm**

### Local Development

```bash
# Install dependencies
npm install

# Start Vite development server with HMR
npm run dev
```

### Production Build & Preview

```bash
# Run client build, SSR build, HTML prerender, CSS inlining & vercel.json CSP sync
npm run build

# Preview production dist/ locally with Brotli/Gzip compression & cache headers
npm run preview
```

---

## ![Config](https://img.shields.io/badge/-%20-7AB34C?style=flat&logo=dotenv&logoColor=white) Optional Environment Overrides

`src/utils/calculator.js` defaults to verified lab bulk density (`0.50–0.55 t/m³`) and standard Egyptian crop/soil application rates. Any parameter can be overridden at build time via Vite environment variables:

| Variable | Purpose |
| :--- | :--- |
| `VITE_COMPOST_BULK_DENSITY_MIN_TONS_PER_M3` | Override minimum bulk density (`t/m³`) |
| `VITE_COMPOST_BULK_DENSITY_MAX_TONS_PER_M3` | Override maximum bulk density (`t/m³`) |
| `VITE_COMPOST_CROP_RATES_JSON` | JSON map overriding per-crop `minTonsPerFeddan` / `maxTonsPerFeddan` |
| `VITE_COMPOST_SOIL_MULTIPLIERS_JSON` | JSON map overriding per-soil adjustment multipliers |

---

## ![Deploy](https://img.shields.io/badge/-%20-000000?style=flat&logo=vercel&logoColor=white) Deployment

Configured for static deployment on **Vercel**:

1. Set the framework preset to **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
2. `npm run build` automatically keeps the `script-src` SHA-256 hash inside `vercel.json` synchronized with `dist/index.html`.
3. Commit any updated `vercel.json` alongside code changes if the inline loader in `scripts/prerender.mjs` changes.

---

## ![Contact](https://img.shields.io/badge/-%20-1C4A27?style=flat&logo=whatsapp&logoColor=white) Brand & Contact

- **Website**: [mawardna-mostaqbalna.com](https://mawardna-mostaqbalna.vercel.app/)
- **Email**: [mawrednamostaqpalona@gmail.com](mailto:mawrednamostaqpalona@gmail.com)
- **Facebook**: [Official Page](https://www.facebook.com/share/19b9S23gdk/)
