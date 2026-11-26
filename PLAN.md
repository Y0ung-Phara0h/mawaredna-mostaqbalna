# MM Enhancement & Visual Fix Plan (`PLAN.md`)

> **Target Project**: `MM/` — **مواردنا مستقبلنا (Mawardna Mostaqbalna)**  
> **Stack**: React 19 + ReactDOM 19 (`^19.0.0`), Vite (client + SSR prerender), Vanilla CSS (`src/styles/main.css`), Custom Preview Compression Middleware  
> **Brand Palette**: Forest `#1c4a27` (`#101a12` dark), Primary Green `#286631` (`#7ab34c` dark), Sprout `#7ab34c`, Soil `#4a3523`, Earth `#a87945`, Cream `#e9e3d4`, BG `#f6f2e8` (`#1a201a` dark), Surface `#fdfbf6` (`#222a21` dark)  
> **Brand Typography**: `Hanimation` (Arabic) & `Outfit` (Latin / Numerals)

---

## 1. Executive Summary & Current Architecture

`MM` is a single-page Arabic (`dir="rtl"`, `lang="ar"`) landing page and dual-unit farm compost calculator for **مواردنا مستقبلنا**, a 100% plant-based sugarcane compost producer in Egypt.

### Current Build & Rendering Pipeline
- **Client Entry**: `src/main.jsx` mounts or hydrates `<App />` inside `#root` wrapped in `requestAnimationFrame`.
- **SSR Prerendering**: `npm run build` runs `vite build`, then `vite build --ssr src/entry-server.jsx`, then `node scripts/prerender.mjs`, which:
  1. Injects SSR HTML into `dist/index.html`.
  2. Inlines the entire compiled stylesheet into `<style>...</style>`.
  3. Replaces `<script type="module" ...>` with an inline deferred-hydration loader triggered by first interaction or `3500ms + requestIdleCallback`.
- **Sections in `src/App.jsx`**: `Header` → `Hero` (+ `.stats`) → `AudiencePaths` → `About` → `Services` → `CompostProduct` → `ProcessSection` → `FarmCalculator` → `FaqSection` → `Gallery` → `Contact` → `Footer` + mobile `#fab`.

### Key Findings Overview
While the site achieves fast initial paint and clean visual direction, a deep code audit uncovered **critical interactive hydration bugs, a `String.replace` prerender corruption hazard, broken mobile SVG panning in RTL, an uncommitted button-padding regression hurting mobile touch targets, dead font weight (~520 KB), an unusable `og:image` SVG for social sharing, fragile `mailto:` lead capture, and the 5 visual/UX issues identified on inspection**.

---

## 2. Part 1 — Weaknesses, Vulnerabilities, Bugs & Performance Issues

Issues are ranked by real-world impact (**Critical → High → Medium → Low**) with exact file references.

### 2.1 Critical Issues

#### [CRIT-01] Deferred Hydration Swallows First User Actions & Causes Native Form Reloads
- **Location**: `scripts/prerender.mjs` (lines 24–28), `src/main.jsx` (lines 18–23)
- **Root Cause**: `prerender.mjs` strips the Vite module script and only injects it *after* the first `pointerdown`, `mousemove`, `keydown`, `touchstart`, `scroll`, `click`, or a `3500ms` post-`load` idle timer. Because loading + parsing + executing the 284 KB JS bundle and calling `hydrateRoot` happens *asynchronously after* the click event completes:
  1. **Swallowed first click**: A mobile visitor tapping the burger menu, dark-mode toggle, service tab, FAQ item, or calculator hint button before `3.5s` triggers script download, **not** the React `onClick` handler. The UI appears frozen on the first tap.
  2. **Accidental page reload on form submit**: Submitting `#calcForm` (`FarmCalculator.jsx`) or `#reqForm` (`Contact.jsx`) before hydration completes executes a native HTML form GET submission (`?`), wiping inputs and reloading the page.
- **Fix**:
  - Replace the event-hijacking script with standard `<script type="module" ...>` + `<link rel="modulepreload" ...>` (module scripts are non-render-blocking by spec) **or** use a tiny inline event-capture buffer that records pre-hydration clicks/submits (`e.preventDefault()` on forms) and replays/handles them once hydrated.
  - Even better: hydrate immediately on idle/next frame after FCP (`requestIdleCallback` with a short `100ms–300ms` timeout, plus `modulepreload` so the chunk is already fetched without blocking first paint).
- **Expected Impact**: Eliminates 100% of dead first taps and pre-hydration form resets on mobile.

#### [CRIT-02] Global `.btn` Padding Regression Breaks 44px Touch Targets
- **Location**: `src/styles/main.css` (line 182, uncommitted working-tree diff)
- **Root Cause**: `git diff` shows `.btn` padding was changed globally from `13px 28px` to `6px 18px` (likely intended only for the header CTA button). This shrinks **every** primary CTA button (`Hero`, `CompostProduct`, `FarmCalculator`, `Contact`) below the WCAG 2.5.5 / Mobile UX **44×44px** minimum touch target height.
- **Fix**: Restore `.btn` to `padding: 12px 24px; min-height: 44px;` and scope the compact button styling specifically to `header .tools .btn { padding: 8px 18px; min-height: 40px; }`.

#### [CRIT-03] Unusable `og:image` SVG Breaks WhatsApp / Facebook / X Link Previews
- **Location**: `index.html` (lines 41, 48, 73, 109), `public/og-image.svg`
- **Root Cause**: Open Graph (`og:image`), Twitter Card (`twitter:image`), and JSON-LD point to `/og-image.svg`. Meta/WhatsApp, Twitter/X, and LinkedIn crawlers **ignore SVG files** for link preview thumbnails.
- **Fix**: Render a raster `1200×630` `public/og-image.png` (and update `og-image.svg` numbers to English before exporting), add `og:image:width="1200"`, `og:image:height="630"`, `og:image:type="image/png"`, and reference `/og-image.png` in `index.html`.

#### [CRIT-04] `String.prototype.replace` Replacement-Pattern Corruption in Prerender Script
- **Location**: `scripts/prerender.mjs` (line 13)
- **Root Cause**: `finalHtml.replace('<!--app-html-->', appHtml)` passes `appHtml` as a raw replacement string. In JS, `$$`, `$&`, `` $` ``, and `$'` inside a replacement string are interpreted as special substitution tokens. Any future text containing `$` (e.g., pricing, currencies, code) in SSR output will silently corrupt `dist/index.html`.
- **Fix**: Use a callback replacer: `finalHtml.replace('<!--app-html-->', () => appHtml);`, and strip any accidental `</style>` closing sequences when inlining CSS.

---

### 2.2 High-Impact Bugs

#### [HIGH-01] Process Scene Mobile Pan Animation Moves in the Wrong Direction in RTL
- **Location**: `src/styles/main.css` (lines 2180–2195, 2259–2266), `src/components/ProcessSection.jsx` (line 208)
- **Root Cause**:
  1. On `@media (max-width: 700px)`, `.scene` sets `overflow: hidden` and `.scene svg` sets `width: 900px` with `@keyframes pan` translating `translateX(calc(100% - 92vw + 2px))`. Because the page is `dir="rtl"`, the `900px` SVG anchors to the **right** and overflows to the **left** (`-X`). Translating `+X` pushes the SVG off the right edge into clipped space instead of revealing the left side!
  2. `<p className="note hint">اسحب المشهد يمينًا ويسارًا...</p>` is permanently hidden by duplicate `.hint { display: none; }` rules (lines 1915 and 2193).
- **Fix**:
  - Either allow native horizontal touch scrolling (`overflow-x: auto; -webkit-overflow-scrolling: touch;`) and display `.hint` on mobile (`<= 700px`) with a clean scrollbar, **or** fix the RTL pan direction to `translateX(calc(-1 * (900px - 92vw)))` (with `prefers-reduced-motion` safety) and clean up the duplicate `.hint` rule.

#### [HIGH-02] Scroll Progress Bar (`.pb`) Desyncs When Dynamic Sections Expand/Collapse
- **Location**: `src/components/Header.jsx` (lines 17–37)
- **Root Cause**: `maxScroll` is calculated from `document.body.scrollHeight - window.innerHeight` only on mount and `window.resize`. Opening/closing `FaqSection` accordions, switching `Services` tabs, or showing calculator/contact validation messages changes page height without updating `maxScroll`. Additionally, `.pb` (`main.css` line 246) uses physical `transform-origin: right`.
- **Fix**:
  - Observe `document.documentElement` with `ResizeObserver` to update `maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)`.
  - Use `transform-origin: inline-start;` (or `:dir(rtl)` / `:dir(ltr)` fallback) so the progress bar aligns with reading direction.

#### [HIGH-03] Active Nav Link Remains Stuck on "من نحن" When Scrolling Back to Top
- **Location**: `src/App.jsx` (lines 48–59), `src/components/Hero.jsx` (line 84)
- **Root Cause**: `navObs` only observes `section[id]`, while `Hero` is `<div className="hero">` with no `id`. When scrolling down to `#about` and then scrolling back to the top hero, `activeSection` never clears and `"من نحن"` stays underlined.
- **Fix**: Observe `heroRef.current` in `navObs` (or clear `activeSection` to `''` when `window.scrollY < 200` / when Hero intersects).

#### [HIGH-04] Contact Form Relies Solely on `mailto:` With No Validation, Error States, or Service Adapter
- **Location**: `src/components/Contact.jsx` (lines 11–26, 62–128)
- **Root Cause**:
  1. `window.location.href = mailto:...` fails silently on mobile/desktop setups without a default mail client (e.g., webmail-only users), yet always shows `"جاهز. افتح تطبيق البريد لإكمال الإرسال."`.
  2. `mailto:` URIs truncate or fail above ~2,000 characters on Windows/browsers; inputs lack `maxLength` and Egyptian phone validation (`01[0125]\d{8}` or landline).
  3. **Re-apply bug**: `useEffect` in `Contact.jsx` (lines 11–16) watches `[prefilledDetails]` string. If a user edits the textarea and then clicks "المتابعة لطلب عرض السعر" again with unchanged calculator values, the string reference hasn't changed, so `details` is not re-populated.
  4. **Architecture Gap**: Directly couples UI to `mailto:` instead of isolating lead transport in `src/services/leadService.js` (to support Webhook / Google Apps Script / WhatsApp / Clipboard fallback cleanly).
- **Fix**:
  - Extract `src/services/leadService.js` and `src/utils/validation.js`: support primary async webhook/Apps Script endpoint (configurable via `import.meta.env.VITE_LEAD_WEBHOOK_URL`) with graceful WhatsApp / Copy-Message / `mailto:` fallback buttons in the confirmation card.
  - Pass `{ text, nonce: Date.now() }` from `FarmCalculator` to `Contact` and show a clear `"تم إرفاق نتائج حاسبة المزرعة ✓"` banner when pre-filled.
  - Validate name (min 2 chars), Egyptian phone format, and input lengths (`maxLength`) with inline `role="alert"` messages.

#### [HIGH-05] `FarmCalculator` Input & Tooltip Edge Cases
- **Location**: `src/components/FarmCalculator.jsx` (lines 38–44, 198–268)
- **Bugs**:
  1. **Arabic numeral typing rejected**: `<input type="number">` rejects or yields `NaN` when users on Arabic keyboards type `٢٥`. Switching to `type="text" inputMode="decimal"` and normalizing `[٠-٩]` & `[۰-۹]` & `٫` → `0-9` & `.` before `evaluateCompostEstimate` fixes this smoothly.
  2. **Hover + Click state conflict on touch devices**: `onMouseEnter`/`onMouseLeave` combined with `onClick` on `.calc-hint` can leave `hintHovered` stuck `true` after tapping on mobile. Replace hover state with click/focus-triggered toggle (`pointerType === 'mouse'` optional, or pure click + `Escape` + outside `pointerdown`) and add `max-width: calc(100vw - 48px)` on `.calc-hint-popover`.
  3. **Hook dependency warning**: `useEffect` (lines 38–44) reads `areaFeddan` and `estimate` without listing `areaFeddan` in deps; deriving the updated estimate directly inside `onChange` / crop & soil `onChange` handlers eliminates the extra effect and render pass.

---

### 2.3 Security & Infrastructure Vulnerabilities

#### [SEC-01] Missing HTTP Security Headers & CSP Compatibility
- **Location**: `scripts/prerender.mjs` (line 27), missing deployment config (`vercel.json` / headers)
- **Risks**:
  - No `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options`, or `Permissions-Policy`.
  - Inline `<script>` generated by `prerender.mjs` forces `'unsafe-inline'` if a CSP is enabled later.
- **Fix**: Add deployment header configuration (`vercel.json` or host headers) and compute SHA-256 hash of any inline bootstrap script during `prerender.mjs` (or move hydration bootstrap to an external/module script).

#### [SEC-02] Path Prefix Check & Blocking Sync I/O in Preview Server Middleware
- **Location**: `vite.config.js` (lines 36–66)
- **Risk**: `!filePath.startsWith(distDir)` lacks `path.sep` (`!filePath.startsWith(distDir + path.sep) && filePath !== distDir`) and doesn't guard malformed `decodeURIComponent` sequences or `..` edge cases cleanly via `path.relative`. Also performs multiple synchronous `fs.existsSync`/`fs.statSync` calls per request and omits `.webp`/`.woff2` from `MIME_TYPES` (relying on fallthrough).
- **Fix**: Normalize `urlPath` with `try { decodeURIComponent(...) } catch { return next(); }`, check `const rel = path.relative(distDir, filePath); if (rel.startsWith('..') || path.isAbsolute(rel)) return next();`, and unify `fs.statSync` into a single `try/catch` lookup.

#### [SEC-03] Major Version Drift Between `package.json` and Installed Vite / Lockfile
- **Location**: `MM/package.json` (`"vite": "^6.2.0"`), `MM/package-lock.json` (`6.4.6`), actual `npm run build` runtime (`vite v8.3.8`)
- **Risk**: Running `npm run build` executed `vite v8.3.8` while `package.json` declares `^6.2.0` and `package-lock.json` locks `6.4.6`. Unpinned major version drift across environments can break SSR/build plugins or `@vitejs/plugin-react` compatibility on CI.
- **Fix**: Reconcile `package.json` and `package-lock.json` cleanly (`npm ci` against intended Vite 6.x or explicitly upgrade `@vitejs/plugin-react` + `package.json` + `package-lock.json` together and verify CI).

---

### 2.4 Performance Bottlenecks (High-Impact Gains)

| ID | Location | Issue | Fix | Expected Impact |
|----|----------|-------|-----|-----------------|
| **PERF-01** | `public/fonts/` & `src/styles/main.css` (lines 1–36) | **~520 KB of unused `.ttf` fonts** (`Hanimation-Light/Medium/Regular/Bold.ttf`, `Outfit-*.ttf`) sit in `public/fonts/` alongside `.min.ttf`, and `.min.ttf` (~38 KB each) are served as raw TTF instead of WOFF2. | Convert the 4 subsetted `.min.ttf` fonts to `.woff2` (add `woff2` + `ttf` fallback), remove unused full `.ttf` files from `public/`, and preload `Hanimation-Regular.min.woff2` & `Hanimation-Bold.min.woff2`. | **~40–50% smaller font transfer** + **~520 KB cleaner `public/`**. |
| **PERF-02** | `dist/index.html` (~96 KB!) & `scripts/prerender.mjs` | Inlining 32.35 KB CSS + 63 KB SSR HTML (including 36 `<use>` hero canes, 14 scene stalks, unused SVG sprites) inflates initial document to **96 KB**, exceeding TCP initial congestion window (~14 KB). | Replace 36 repeated `<use>` hero canes with a repeating `<pattern>` (or 8–10 grouped stalks); remove 10 unused `<symbol>` icons from `IconSprite.jsx`; lazy-load non-critical below-the-fold styles/modals. | Shrinks `dist/index.html` by **~20–30 KB** for faster mobile TTFB/FCP. |
| **PERF-03** | `src/styles/main.css` (lines 159–160) | `section { content-visibility: auto; contain-intrinsic-size: auto 640px; }` causes scrollbar thumb jumping and inaccurate `#anchor` jump offsets when navigating directly to `#calc`, `#faq`, or `#contact`. | Remove `content-visibility: auto` on anchor-navigable `<section>` elements (or use accurate per-section `contain-intrinsic-size` only on non-interactive heavy sections). | Eliminates anchor scroll miss & scrollbar jitter. |
| **PERF-04** | `src/components/Hero.jsx`, `ProcessSection.jsx`, `main.css` | Continuous `will-change: transform` on `.orbit-dots`, `.field-sway`, `.lv svg` (9 floating leaves), and 20+ simultaneous SVG keyframe animations on mobile `.scene` drain mobile battery/GPU. | Limit mobile `.lv` leaves (`display: none` for `nth-child(n+5)` on `< 700px`), pause `.scene` animations cleanly when off-screen (already present via `.run`, verify mobile `pan` respects it), and remove unnecessary `will-change` where not actively animating. | Smoother mobile scrolling & lower GPU memory usage. |
| **PERF-05** | `src/components/Header.jsx` (lines 12, 65–72) | `theme` icon `<Icon name="moon" />` never updates visually to a sun icon in dark mode, and `Header.jsx` does not expose `aria-pressed` or live state. | Track `theme` in React state (synced with `document.documentElement.dataset.theme`), add a `sun` symbol in `IconSprite.jsx`, and toggle icon + `aria-label` / `aria-pressed`. | Better UX clarity & zero DOM/React drift. |
| **PERF-06** | `src/App.jsx` & `src/components/Gallery.jsx` | `App.jsx` imports all components eagerly in a single 284 KB JS bundle. | Code-split the interactive `GalleryLightbox` via `React.lazy` + `Suspense` so lightbox JS loads only when a user opens an image. | Keeps initial JS lean as gallery features grow. |

---

## 3. Part 2 — Visual & UX Enhancements Plan (Best-Practice Implementation)

### 3.1 Mobile & Tablet Responsiveness (Multi-Column Cards Where Content Fits)

**Problem Observed**: Most card/grid containers jump abruptly from multi-column desktop layouts straight to a single full-width column (`1fr`) at `max-width: 820px` or `max-width: 700px`, causing excessive vertical scrolling on mobile devices even where cards contain short titles and concise 1–2 line copy.

#### Concrete Grid & Card Refactoring Matrix (`src/styles/main.css`)

| Section / Selector | Current Mobile Behavior | Enhanced Responsive Behavior (Best Practice) | Layout & Content Adjustments |
|---|---|---|---|
| **Hero Stats** (`.stats .wrap`) | `4 cols` → `2 cols` (`<= 820px`) | Keep `2 cols` (`< 640px`), `4 cols` (`>= 640px`) | Fix logical borders so `nth-child` dividers never overlap or disappear cleanly across 2-col and 4-col modes. |
| **Audience Paths** (`.paths`) | `2 cols` → `1 col` (`<= 700px`) | **`2 cols` down to `380px`**; `1 col` only `< 380px` | On `<= 700px`, change `.path` to compact vertical card alignment (`flex-direction: column; align-items: flex-start; gap: 10px; padding: 16px 14px;`), keeping icon + heading + short description crisp side-by-side. |
| **About Facts** (`.facts`) | Always `1 col` | **Desktop**: `1 col` side-by-side with intro; **Tablet/Mobile (`480px–820px`)**: **`2 cols`** (`.fact:last-child` spans full width or `repeat(2, 1fr)` card tiles); `< 480px`: `1 col` compact cards | Add subtle card surface/padding on tablet/mobile so 2-column Vision & Mission cards feel balanced. |
| **Services Grid** (`.svc`) | `2 cols` → `1 col` (`<= 820px`) | **Desktop (`>= 960px`)**: `2 cols` (or `3 cols`); **Tablet (`640px–959px`)**: **`3 cols`** or `2 cols`; **Mobile (`360px–639px`)**: **`2 cols`**! (`1 col` only `< 360px`) | Convert mobile `.row` items into compact vertical cards (`flex-direction: column; gap: 10px; padding: 16px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--surface);`) with smaller `40px` icon box, `15px` title, and `13.5px` description. Cuts mobile section height by ~50%. |
| **Compost Ticks** (`.ticks`) | Always `1 col` | **`2 cols`** on `>= 480px` (`grid-template-columns: repeat(2, minmax(0, 1fr))`), `1 col` `< 480px` | Compact 2×2 benefit grid fits the 4 short checkmark items cleanly beside/below the animated product box. |
| **Process Steps** (`.steps`) | `5 cols` → `2 cols` (`<= 760px`) | **Desktop (`>= 900px`)**: `5 cols`; **Tablet (`640px–899px`)**: **`5 cols`** (compact); **Mobile (`390px–639px`)**: **`3 cols`**! (`2 cols` `< 390px`) | Since each of the 10 steps is a number badge + 1–2 short words, switch mobile `.step` to centered vertical mini-cards (`flex-direction: column; align-items: center; text-align: center; padding: 12px 8px;`). Last item (step 10) can center or span cleanly. |
| **Calculator Steps** (`.calc-steps`) | `3 cols` → `1 col` (`<= 820px`) | **Desktop & Tablet (`>= 640px`)**: **`3 cols`**; **Mobile (`380px–639px`)**: **`2 cols`** (step 3 full-width or horizontal 3-card scroll-snap strip `scroll-snap-type: x mandatory` / 2+1 grid); `< 380px`: `1 col` | Reduce padding (`12px`) and hide/condense verbose body text gap so steps read as quick scannable pills above the calculator. |
| **Calculator Fields** (`.calc-fields`) & **Contact `.row2`** | `3 cols` → `1 col` (`<= 820px`) | **Desktop (`>= 760px`)**: `3 cols`; **Mobile (`360px–759px`)**: `area` spans full row (`grid-column: 1 / -1`), while `crop` & `soil` sit in **`2 cols` (`1fr 1fr`)**! Contact `.row2` stays **`2 cols`** down to `480px`. | Eliminates tall stacked `<select>` dropdowns on mobile; keeps tap height `>= 44px`. |
| **Buttons** (`.cta`, `.calc-actions`) | Forced `width: 100%` `< 700px`/`820px` | Allow **2 buttons side-by-side** (`flex: 1 1 auto`) down to `400px`; stack `width: 100%` only below `400px`, and restore global `.btn` `min-height: 44px` (`padding: 12px 22px`). | Prevents oversized stacked buttons on standard 390–430px phones. |
| **Gallery** (`.gal`) | `4 cols` → `2 cols` (`<= 700px`) | **Desktop**: `4 cols` bento; **Tablet (`700px–960px`)**: `3 cols`; **Mobile (`<= 699px`)**: `2 cols` (with featured photo spanning 2 cols on top) | Use explicit `aspect-ratio` (`16/10` for featured, `4/3` or `1/1` for grid tiles) instead of fixed `130px` row heights when real factory photos are added. |

---

### 3.2 Custom Branded Scrollbar Redesign

**Goal**: Replace the default OS scrollbar with a refined, cohesive scrollbar matching **مواردنا مستقبلنا**'s organic green & cream/soil palette in both Light and Dark themes.

#### Best-Practice Implementation Strategy (`src/styles/main.css`)
> [!IMPORTANT]
> In Chromium 121+, setting standard `scrollbar-color` and `scrollbar-width` overrides `::-webkit-scrollbar` pseudo-elements. To get rich rounded pill styling + hover states on WebKit/Blink **and** brand colors in Firefox without conflict:
> - Use `::-webkit-scrollbar*` inside `@supports selector(::-webkit-scrollbar)` (or rely on `scrollbar-color` ONLY for browsers without `::-webkit-scrollbar` via `@supports not selector(::-webkit-scrollbar)`).

- **Light Mode Tokens**:
  - **Track**: `--cream` (`#e9e3d4`) or `--bg` (`#f6f2e8`) with subtle border `--line` (`#ddd5c1`).
  - **Thumb**: `--green` (`#286631`) with `border: 2px solid var(--bg); border-radius: 999px;` (creates a sleek floating capsule inside the track).
  - **Thumb Hover / Active**: `--straw` (`#7ab34c`) → `--forest` (`#1c4a27`) for clear interactive feedback.
- **Dark Mode Tokens** (`:root[data-theme="dark"]` & `@media (prefers-color-scheme: dark)`):
  - **Track**: `#141a14` / `--bg` (`#1a201a`).
  - **Thumb**: `--green` (`#7ab34c`) muted at `75%` opacity with `2px solid var(--bg)` padding; brightens to `#9ccc6f` on hover.
- **Dimensions & Ergonomics**:
  - Root page scrollbar: `width: 10px; height: 8px;` (easy to grab with mouse while staying visually slim; does not clutter mobile touch browsers where overlay scrollbars are native).
  - Inner horizontal containers (e.g., `.scene` if scrollable): slim `6px` height using `--straw` / `--mint`.

---

### 3.3 Replace All Numbers With English (Western Arabic) Numerals (`0–9`)

**Problem Observed**: The page currently mixes Eastern Arabic numerals (`٠١٢٣٤٥٦٧٨٩`, `٪`, `٫`) in static copy, SVG graphics, SEO metadata, and `formatAr()` (`toLocaleString('ar-EG')`) alongside English numerals in the calculator.

#### Complete Replacement Inventory

1. **Number Formatting Utility (`src/utils/format.js`)**:
   - Update `formatAr` (or refactor to `formatNum(n, decimals = 0)`) to use `'en-US'` (`n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })`) so animated Hero counters, datasheet values, and process step indices (`1`–`10`) always render Western digits `0–9` with ASCII `.`.
2. **Static Data (`src/data/siteData.js`)**:
   - `HERO_STATS` (lines 25–28):
     - `initial: '35%'`, `suffix: '%'` (was `'٣٥٪'`, `'٪'`)
     - `initial: '45–55%'`, `suffix: '%'` (was `'٤٥–٥٥٪'`, `'٪'`)
     - `initial: '6.5'` (was `'٦٫٥'`)
     - `initial: '500–550'` (was `'٥٠٠–٥٥٠'`)
   - `SERVICES_DATA` (line 49): `'١٠٠٪'` → `'100%'`.
   - `DATASHEET_ROWS` (lines 111–117): `unit: '٪'` → `unit: '%'`.
   - `FAQ_ITEMS` (lines 137, 144): `'١٠٠٪'` → `'100%'`, `'٤٥–٥٥٪'` → `'45–55%'`.
3. **Component SVG & JSX Copy**:
   - `src/components/CompostProduct.jsx` (lines 39, 76): `'١٠٠٪'` → `'100%'`.
   - `src/components/ProcessSection.jsx` (lines 191, 194, 197, 200, 203): `'١ من الحقل'`…`'٥ تعود للأرض'` → `'1 من الحقل'`, `'2 النقل'`, `'3 التفريغ والتقليب'`, `'4 التخمير'`, `'5 تعود للأرض'`.
4. **Metadata, Manifest & OG Image**:
   - `index.html` (lines 8, 9, 39, 40, 46, 74, 106, 108, 117, 139, 152): replace all `١٠٠٪`, `٤٥–٥٥٪`, `٤٥٪`, `٥٥٪` with `100%`, `45–55%`, `45%`, `55%`.
   - `public/manifest.webmanifest` (line 4): `١٠٠٪` → `100%`.
   - `public/og-image.svg` (lines 16, 18) + newly exported `og-image.png`: `100%`, `45–55%`, `35%`.
   - `package.json` (line 6): `١٠٠٪` → `100%`.
5. **RTL Bidirectional & Typography Best Practices**:
   - Wrap numeric ranges and percentages (`45–55%`, `500–550`, `100%`, `6.5`) in `<span dir="ltr" className="num">...</span>` (or CSS `.num { direction: ltr; unicode-bidi: isolate; font-variant-numeric: tabular-nums; display: inline-block; }`) inside RTL Arabic sentences so the Unicode Bidi algorithm never flips `45–55%` to `%55–45` or misaligns the `%` sign.
   - Ensure `Outfit` font subset (`unicode-range`) includes `U+0030-0039` and `%` / `–` (already covered by `U+0000-00FF` & `U+2000-206F` in `main.css`) so English digits render crisply in `Outfit` across all headings, stats, and inputs.

---

### 3.4 Footer Redesign — Alignment, Layout & Organization

**Current Problems (`src/components/Footer.jsx` & `src/styles/main.css` lines 1610–1639)**:
- Uses a flat flex container with 3 unheaded `<div>`s, inline styles, tightly stacked unpadded links (`<a>` with no list semantics or vertical gap), no contact/social block, and collapses to a long single-column stack on mobile (`<= 700px`).

#### Best-Practice Footer Architecture
1. **4-Zone Semantic Grid (`<footer className="site-footer" role="contentinfo">`)**:
   - **Zone 1 — Brand Identity & Social**:
     - Clickable brand lockup (`href="#top"`) with `/brand/icon-logo-white.svg`, title, and concise mission paragraph.
     - Social / direct-action icon pills (`44×44px` minimum touch targets, `aria-label`): Facebook page (`rel="noopener noreferrer"`), Email (`mailto:mawrednamostaqpalona@gmail.com`).
   - **Zone 2 — Quick Links (`<nav aria-label="روابط سريعة">`)**:
     - Explicit heading (`<h4>روابط سريعة</h4>`) + semantic `<ul>/<li>` list (`من نحن`, `خدماتنا`, `الكومبوست`, `الأسئلة الشائعة`).
   - **Zone 3 — Tools & Resources (`<nav aria-label="الأدوات والأقسام">`)**:
     - Explicit heading (`<h4>الأدوات والأقسام</h4>`) + semantic `<ul>/<li>` list (`رحلة المخلفات`, `حاسبة المزرعة`, `معرض الصور`, `تواصل معنا`).
   - **Zone 4 — Direct Contact & Coverage**:
     - Explicit heading (`<h4>تواصل وتوريد</h4>`), clickable email, regional service summary (`التوريد لجميع محافظات مصر — مزارع وأراضي مستصلحة`), and an inline CTA (`اطلب عرض سعر` → `#contact`).
2. **Responsive Grid Breakpoints**:
   - **Desktop (`>= 960px`)**: `grid-template-columns: 1.4fr 0.85fr 0.95fr 1.15fr; gap: 36px;`
   - **Tablet (`640px–959px`)**: `grid-template-columns: repeat(2, 1fr); gap: 28px;`
   - **Mobile (`< 640px`)**: `grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px;` where **Brand** (`grid-column: 1 / -1`) sits cleanly on top, **Zone 2 & Zone 3 link lists sit side-by-side in 2 columns**, and **Zone 4 (Contact)** spans full width cleanly below!
3. **Bottom Utility Bar (`.foot-bottom`)**:
   - Flex row (`justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;`) with `© 2026 مواردنا مستقبلنا — جميع الحقوق محفوظة` on start and a subtle `"العودة للأعلى ↑"` anchor button (`href="#top"`, `min-height: 40px`) on end.
4. **Styling & Accessibility**:
   - Replace all inline styles in `Footer.jsx` with clean CSS classes.
   - Ensure link tap targets have comfortable vertical rhythm (`padding-block: 5px; display: inline-flex; align-items: center;`) and `>= 4.5:1` contrast against `--soil` (`#4a3523`).
   - Adjust mobile `footer` bottom padding (`padding-bottom: calc(76px + env(safe-area-inset-bottom))`) only when `#fab` is visible (`<= 1020px`) so the floating CTA never covers copyright text.

---

### 3.5 Factory Image Gallery & Responsive Lightbox Modal

**Goal**: Replace the 5 placeholder gradient boxes in `Gallery.jsx` with real factory photos and a responsive, accessible popup lightbox modal that works cleanly across every viewport size.

#### Architecture & Implementation Blueprint
1. **Centralized Media Manifest (`src/data/galleryData.js` or `GALLERY_ITEMS` in `src/data/siteData.js`)**:
   - Store structured items instead of plain strings:
     ```js
     {
       id: 'processing-lines',
       src: '/gallery/processing-lines.webp',
       fallbackSrc: '/gallery/processing-lines.jpg', // optional
       title: 'خطوط معالجة الكومبوست',
       caption: 'عمليات الفرز والتجهيز الميكانيكي لمخلفات قصب السكر في الموقع.',
       alt: 'خطوط معالجة وتقليب الكومبوست النباتي داخل مصنع مواردنا مستقبلنا',
       width: 1200,
       height: 800,
     }
     ```
   - Store factory photos in `public/gallery/` converted to **WebP** (with max dimension ~`1600px` for lightbox & optional `640px` `srcSet` thumbnails for the grid, target `< 150 KB` per photo).
2. **Interactive Responsive Grid (`src/components/Gallery.jsx`)**:
   - Replace `<div className="ph rv">` with semantic `<button type="button" className="gal-card rv" onClick={() => setActiveIndex(i)} aria-label={`تكبير صورة: ${item.title}`}>`.
   - Render `<img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />` with `object-fit: cover; width: 100%; height: 100%;`.
   - Add a bottom gradient scrim (`linear-gradient(to top, rgba(16, 26, 18, 0.85), transparent 60%)`), crisp white caption (`item.title`), and a subtle expand/zoom icon badge in the top-end corner (`opacity: 0.85` on touch devices, boosted on desktop hover/focus).
   - Remove the placeholder note `<p className="note">استبدل هذه المربعات بصور وفيديوهات الشركة الحقيقية.</p>` once real factory photos are wired in.
   - Grid sizing:
     - Desktop (`> 960px`): 4-column bento grid (first featured image `span 2` cols × `span 2` rows, remaining images `aspect-ratio: 4/3` or auto-rows `190px`).
     - Tablet (`641px–960px`): 3-column grid (featured image `span 2` or full row).
     - Mobile (`<= 640px`): 2-column grid with featured image `grid-column: span 2; aspect-ratio: 16 / 10;` and remaining tiles `aspect-ratio: 4 / 3;` (eliminating cramped `130px` heights).
3. **Accessible, Responsive Lightbox Component (`src/components/GalleryLightbox.jsx`, lazy-loaded via `React.lazy`)**:
   - **Dialog Semantics & Focus Management**:
     - Render via `createPortal` (or native `<dialog>` with `showModal()`) with `role="dialog"`, `aria-modal="true"`, `aria-labelledby="lightbox-title"`.
     - Lock background body scroll (`document.documentElement.style.overflow = 'hidden'`) cleanly while open and restore on close.
     - Move focus to the close button on open, trap `Tab` / `Shift+Tab` inside modal controls, and restore focus to the triggering `.gal-card` button on close.
   - **Responsive Viewport Sizing Rules (All Screens)**:
     - Container overlay: `position: fixed; inset: 0; padding: max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left)); z-index: 100; background: rgba(12, 18, 13, 0.88); backdrop-filter: blur(6px);`
     - Modal stage: `width: min(94vw, 1100px); max-height: 92dvh; display: flex; flex-direction: column;` (using `dvh` guarantees mobile browser address bars never clip the caption or close button).
     - Image sizing: `max-width: 100%; max-height: calc(92dvh - 130px); width: auto; height: auto; object-fit: contain; margin-inline: auto; border-radius: 12px;` — safely displays **both landscape and portrait** factory photos at maximum crispness without overflow or stretching on 320px phones, tablets, or 4K monitors.
   - **Controls & Gestures**:
     - **Close Button (`×`)**: Top-end, `44×44px` minimum touch target, `Escape` key + backdrop click to close.
     - **Prev / Next Navigation**: `44×44px` buttons + keyboard `ArrowRight` / `ArrowLeft` (mapped accurately for `dir="rtl"`: `ArrowLeft` advances to next image, `ArrowRight` goes to previous image).
     - **Mobile Touch Swipe**: Track `touchstart` / `touchend` X-delta (`>= 45px` threshold, ignoring vertical scroll gestures) to swipe between factory photos naturally.
     - **Caption & Counter Bar**: Displays title, optional short description, and English counter (`1 / 5`) with `tabular-nums`.
     - **Preloading & Loading State**: Show subtle skeleton/spinner while high-res image decodes, and silently preload `index - 1` and `index + 1` once open.

---

## 4. Part 3 — Implementation Roadmap & Verification Plan

### Phased Execution Order

1. **Phase 1 — Foundation, Build & Critical Fixes**
   - Reconcile `package.json` / `package-lock.json` Vite versions.
   - Fix `scripts/prerender.mjs` (`() => appHtml` replacer bug + non-blocking hydration / zero lost first taps).
   - Fix `vite.config.js` path containment (`path.relative`) + MIME types.
   - Add deployment security headers config (`vercel.json`).
   - Restore `.btn` 44px touch target & scope compact header CTA style.
   - Fix `Header.jsx` theme icon state, `ResizeObserver` progress bar, and `App.jsx` active section reset at Hero.
2. **Phase 2 — Numerals, Typography, Assets & Social SEO**
   - Convert all numerals to English (`0–9`, `.`, `%`) across `format.js`, `siteData.js`, `CompostProduct.jsx`, `ProcessSection.jsx`, `index.html`, `manifest.webmanifest`, `og-image.svg` + add CSS `.num` (`tabular-nums` + Bidi isolation).
   - Convert subsetted `.min.ttf` fonts to `.woff2`, preload them, and remove unused ~520 KB `.ttf` files from `public/fonts/`.
   - Export `1200×630` `public/og-image.png` and update Open Graph / Twitter meta tags.
   - Remove unused `<symbol>` icons from `IconSprite.jsx` and optimize hero SVG field stalks.
3. **Phase 3 — Responsiveness, Scrollbar & Footer Redesign**
   - Implement multi-column mobile/tablet grid upgrades (`.paths`, `.facts`, `.svc`, `.ticks`, `.steps`, `.calc-steps`, `.calc-fields`, `.row2`) and fix `.scene` RTL mobile pan/scroll.
   - Remove `content-visibility: auto` side effects on anchor-targeted sections.
   - Implement branded light/dark custom scrollbar following `@supports` precedence rules.
   - Rebuild `Footer.jsx` and footer CSS into the 4-zone semantic grid (2-col links on mobile, contact/social pills, back-to-top bar).
4. **Phase 4 — Factory Gallery, Lightbox & Contact Service Upgrade**
   - Prepare & optimize real factory WebP photos in `public/gallery/` and wire structured `GALLERY_ITEMS`.
   - Build lazy-loaded `GalleryLightbox.jsx` with `dvh` sizing, focus trap, RTL keyboard arrows, and touch swipe.
   - Extract `src/services/leadService.js` + `src/utils/validation.js`, fix `Contact.jsx` pre-fill nonce + validation + fallback delivery channels (Webhook / WhatsApp / Copy / `mailto:`).

### Verification Checklist (Must Pass After Implementation)
- [ ] **Production Build**: `npm run build` completes with zero errors; check `dist/index.html` size reduction and inspect rendered HTML for zero Eastern Arabic numerals (`[\u0660-\u0669\u066A\u066B]`).
- [ ] **Early Interaction Test**: Load built preview (`npm run preview`) with CPU/network throttling; immediately click theme toggle, FAQ, tabs, and calculator within `< 1s` of FCP — verify zero dropped clicks and zero native form reloads.
- [ ] **Viewport Responsiveness Matrix**: Inspect at `360×800`, `390×844`, `480×800`, `768×1024`, `1024×768`, and `1440×900` (Light & Dark modes):
  - Multi-column cards render cleanly without horizontal overflow (`scrollWidth <= innerWidth`).
  - All interactive targets measure `>= 44×44px`.
  - Footer aligns cleanly in 4 cols (desktop), 2 cols (tablet), and brand + 2-col links + contact (mobile).
  - Scrollbar matches brand palette in Chrome/Edge and Firefox.
  - Process scene pans/scrolls smoothly in RTL on mobile.
- [ ] **Gallery Lightbox QA**: Open both landscape and portrait factory images across `360px`, `768px`, and `1440px` viewports; test `Escape`, backdrop click, RTL `ArrowLeft`/`ArrowRight`, touch swipe, and Tab focus trapping.
- [ ] **Lighthouse & Accessibility Gate**: Verify Performance `>= 90`, Accessibility `>= 95`, Best Practices `>= 95`, SEO `>= 95` on production build.
