# Design Specification — Concept 04: Bold & Innovative

**Project:** مواردنا مستقبلنا (Mawaredna Mostaqbaluna)  
**Concept:** Bold & Innovative  
**Design character:** High-impact, data-driven, futuristic, confident  
**Status:** Design direction specification — implementation reference

---

## 1. Design intent

Position مواردنا مستقبلنا as an ambitious, forward-looking agricultural materials company. This concept uses a dark cinematic interface, high-contrast typography, vivid lime accents, and a strong visual representation of the circular transformation from sugarcane by-products into compost and healthier soil.

The result should feel innovative and premium without looking like a gaming interface or an unrelated software dashboard. The agricultural subject must remain unmistakable.

**Core impression:** “Turning agricultural by-products into lasting value through a smarter, more sustainable approach.”

## 2. Design principles

1. **High-impact first impression:** use a strong hero image and concise, assertive headline.
2. **Contrast with purpose:** dark surfaces create focus; lime accents identify key actions and important information.
3. **Visualize the circular story:** show the transformation loop with clear stages and arrows.
4. **Make data feel tangible:** calculator results and verified figures should be large, legible, and carefully labeled.
5. **Balance innovation and trust:** avoid excessive glow, futuristic clichés, or unsupported performance claims.

## 3. Visual system

### 3.1 Suggested color tokens

| Token | Suggested value | Usage |
|---|---:|---|
| `color-night-950` | `#071712` | Main page background |
| `color-night-900` | `#0B211A` | Large section surfaces |
| `color-night-800` | `#12352A` | Cards and elevated panels |
| `color-green-700` | `#1E6944` | Secondary green |
| `color-lime-400` | `#B5F23B` | Primary accent and CTA |
| `color-lime-300` | `#C8F66B` | Hover/highlight |
| `color-white` | `#F7FAF6` | Main text |
| `color-muted` | `#A8B7AE` | Secondary text |
| `color-border` | `#29463A` | Borders and dividers |
| `color-warning` | `#E6B85C` | Warning/notice only |

Lime is a strong accent. Reserve it for primary actions, selected values, key diagrams, and small highlights. Avoid using it for long paragraphs.

### 3.2 Typography

- Use a bold modern sans-serif for hero and section headings.
- Use a highly readable sans-serif for body text.
- Use tabular numerals for calculator outputs and any verified metrics.
- Keep heading line lengths short and dramatic.
- Arabic typography should remain clear against dark backgrounds; test weight and line-height carefully.

Suggested Latin families: `Space Grotesk` for display and `Inter` for body, or a unified family such as `Manrope`. Pair with a suitable Arabic sans-serif such as `IBM Plex Sans Arabic`.

### 3.3 Surface and effects

- Cards: dark green/charcoal surfaces with subtle green borders.
- Radius: 14–20px.
- Borders: 1px low-contrast green.
- Glow: minimal lime glow only around primary CTA or selected diagram node.
- Gradients: dark green-to-black for hero and CTA sections.
- Use image overlays to preserve text contrast.
- Avoid glassmorphism on every card; one highlighted panel is sufficient.

## 4. Layout system

- Dark full-page background with alternating dark-green surface sections.
- Centered container around 1200–1320px.
- Desktop grid: 12 columns.
- Hero: asymmetrical split, text left and circular transformation visual/right image.
- Use full-width visual bands for calculator and quotation CTA.
- Mobile: stack content and simplify diagrams; do not shrink complex diagrams until labels become unreadable.

## 5. Global navigation

### Header
- Dark transparent or solid background.
- Light logo and text.
- Navigation links in muted white, active link in lime.
- Primary CTA in lime with dark text.
- Keep header height compact.
- Mobile menu should use a clear high-contrast panel and maintain keyboard access.

### Footer
- Near-black/forest background.
- White logo and muted navigation.
- Lime used for small icons or links.
- Include official contact channels and company details only when supplied.

## 6. Page specifications

### 6.1 Homepage `/`

**Hero**
- Dark cinematic agricultural image, such as a field at sunrise or a close-up of sugarcane and soil.
- Left side: eyebrow label, headline “Turning Agricultural Waste into Lasting Value,” concise supporting copy, primary CTA “Explore Our Solution,” secondary CTA “Try the Calculator.”
- Right side: circular transformation graphic showing sugarcane → compost → growing plant, connected with directional arrows.
- Use a subtle lime highlight on one phrase or diagram node.
- Avoid making the hero overly busy: either the image or diagram should dominate, not both equally.

**Value strip**
- Dark elevated panel with three or four verified principles.
- Icons in lime, short white labels.
- Use no invented numerical metrics.

**Circular transformation section**
- Dedicated visual explanation:
  1. Sugarcane by-product.
  2. Organic compost.
  3. Soil application / plant growth.
- Label as a conceptual overview unless exact manufacturing stages and process data are verified.
- Keep arrows and stage labels clear at mobile sizes.

**Calculator feature**
- Prominent dark card with a thin green border.
- Inputs in high-contrast light or slate surfaces.
- Calculate button in lime.
- Result block uses large numerals with explicit labels:
  - Estimated mass: metric tons.
  - Estimated volume: cubic meters.
- Show both outputs together.
- Include estimate caveat and approved configuration dependency.
- Do not use fake statistics or sample calculation defaults in production.

**Product section**
- Dark section with large compost image, short description, and verified feature list.
- Use a lime CTA or text link to `/products`.

**Quality, testimonials, projects**
- Use cards with dark surfaces and thin borders.
- Certificates may use light document previews against dark frames.
- Testimonials should be visually quiet enough to keep the page credible.
- All claims, names, certificates, and project details must be client-approved.

**Quotation CTA**
- High-contrast lime or lime-to-green band near the bottom.
- Short headline and button to `/request-quotation`.
- Use dark text on lime for accessible contrast.

### 6.2 About `/about`
- Dark hero with production/field image and overlay.
- Company story in light text on dark surfaces.
- Mission and values presented as three compact cards.
- Production locations as image-led panels.
- Use timeline or process visualization only when details are confirmed.
- End with a lime-accented contact CTA.

### 6.3 Products `/products`
- Product hero with a high-quality compost close-up.
- Product description in a dark surface panel.
- Technical specifications in a structured table with clear row separators.
- Use a light surface for dense technical tables if dark contrast becomes difficult.
- Display actual documentation and certificates when supplied.
- Include calculator and quotation CTAs.

### 6.4 Calculator `/calculator`
- Dark page with a centered high-contrast calculator card.
- Input labels in white; field backgrounds in slate/green.
- Results displayed in two equal metric panels:
  - `Estimated tons`
  - `Estimated cubic meters`
- Use tabular numerals and explicit units.
- Explain calculation assumptions and estimate limitations.
- If rate/density configuration is missing, show a clear unavailable/configuration state.
- Continue action transfers data to the quotation form.

### 6.5 Request a Quotation `/request-quotation`
- Do not make the form excessively dark if that harms readability.
- Use a dark outer page with a lighter form panel or high-contrast dark fields.
- Request type selector has three distinct options: Standard, Bulk, Customized.
- Shared contact fields first; conditional project fields next.
- Calculator summary uses a highlighted border and explicit units.
- Submit button uses lime.
- Provide visible loading, success, and error states; do not rely on color alone.

### 6.6 Contact `/contact`
- Dark page with three prominent contact method cards.
- Use lime icon accents and clear action labels.
- Include approved location details.
- Maintain high contrast for phone/email text and keyboard focus.

## 7. Component inventory

- `DarkHeader`, `DarkFooter`
- `CinematicHero`, `HeroTransformationGraphic`
- `CircularProcessDiagram`, `ProcessNode`
- `DarkValueStrip`, `MetricCard`
- `DarkCalculator`, `DualUnitResult`
- `DarkProductFeature`, `TechnicalSpecTable`
- `DarkCertificateCard`, `DarkTestimonialCard`
- `RequestTypeSelector`, `HighContrastQuotationForm`
- `ContactActionCard`, `StatusBanner`

## 8. Interaction and motion

- Use crisp transitions (140–200ms).
- Primary CTA may have a subtle lime glow on hover/focus.
- Diagram nodes may illuminate sequentially on hover or as they enter view, but the full information must remain available without animation.
- Use a restrained animated path around the circular diagram only if it does not distract.
- Avoid constant pulsing, flashing, cursor-follow effects, and excessive scroll animations.
- Respect reduced-motion settings.

## 9. Responsive behavior

- Desktop hero: text and circular visual in two columns.
- Tablet: reduce diagram complexity or place it below the hero text.
- Mobile: stack hero content; use a simplified vertical three-step process diagram.
- Value strip becomes a 2x2 grid.
- Calculator result cards stack or remain side-by-side only when each retains enough width.
- Technical specification tables need a light/dark high-contrast treatment and mobile stacked alternative.
- Form fields stack in one column.

## 10. Accessibility and content rules

- Check contrast for muted text, lime text, and dark surfaces.
- Lime-on-white may not have sufficient contrast for small text; use dark green text on lime buttons.
- Provide visible focus rings that are not dependent on glow alone.
- Ensure diagrams have a text equivalent or ordered list.
- Do not use color alone to indicate success/error.
- Keep all units explicit and readable.
- Respect reduced-motion settings.
- Test Arabic text and mixed Arabic/Latin units on dark surfaces.
- Avoid unsupported environmental or agronomic claims.

## 11. Assets and photography

Prioritize:
- Dramatic but realistic agricultural fields.
- Sugarcane stalks and leaves.
- Compost texture against dark soil.
- Seedlings and roots.
- Actual production facility imagery.
- Approved laboratory/testing imagery.

Use cinematic natural light and controlled contrast. Avoid artificial neon-green crops, sci-fi imagery, or visuals that misrepresent the product or production process.

## 12. Developer handoff notes

- Centralize dark-theme tokens and ensure all components use them consistently.
- Use semantic HTML and accessible contrast; visual effects must not replace focus indicators.
- Keep circular diagrams responsive and provide a mobile alternative.
- Optimize hero images and define dimensions.
- Calculator and quotation logic remain identical to the shared SRS.
- Display both tons and cubic meters using client-approved application rate and density.
- Keep Google Apps Script integration isolated and validate submissions on the receiving side.
- This concept changes the visual language only; it does not change V1 scope or routes.

## 13. Design acceptance checklist

- [ ] The site feels premium and innovative while remaining clearly agricultural.
- [ ] Dark surfaces and lime accents are balanced and readable.
- [ ] The circular transformation story is understandable without animation.
- [ ] Calculator shows both tons and cubic meters.
- [ ] Dense specifications remain accessible.
- [ ] Quotation form remains easy to complete.
- [ ] No fake metrics or unapproved claims appear.
- [ ] Mobile diagrams and forms remain usable.

---

## 14. Strict implementation contract — visual matching rules

This section is mandatory and overrides any looser wording elsewhere in this document.

### 14.1 Visual source of truth
- The supplied reference screenshot for **Bold & Innovative** is the visual source of truth. Match the dark/light balance, section layering, hero proportions, circular transformation visual, lime accent placement, type scale, and calculator treatment.
- Do not turn this into a gaming, crypto, AI, or generic futuristic SaaS website. The agricultural product and sugarcane-to-compost story must remain visually obvious.
- Do not add random neon, glowing borders on every component, sci-fi grids, particles, animated backgrounds, or glassmorphism everywhere.
- Conflict priority: (1) reference screenshot for visible appearance, (2) this DESIGN.md for responsive/hidden states, (3) SRS/product baseline for functionality.

### 14.2 Fixed layout measurements
Use these targets unless the screenshot clearly shows otherwise:
- Reference desktop viewport: 1440 × 900 px. Also test 1280 × 800 px and mobile 390 × 844 px.
- Main content max-width: 1280 px, centered. Header: 76 px desktop / 64 px mobile.
- Hero: asymmetric desktop split, approximately 52% message / 48% visual, 48 px gap. Keep the circular transformation graphic inside its column and prevent overflow.
- Standard section padding: 96 px desktop / 56 px mobile. Compact section padding: 64 px.
- Cards: 16 px radius, 1 px low-contrast green border. Use glow only for the primary CTA or one selected visual node. Avoid strong shadows.
- Mobile gutters: 20 px. Replace the circular process diagram with a clear vertical three-step process when the full circle cannot fit legibly.

### 14.3 Dark surface and accent locks
- Use `color-night-950` as the dominant page background and `color-night-900` / `color-night-800` to separate sections and cards. Do not randomly alternate to white sections unless the reference does so or dense data readability requires it.
- Lime is a high-value accent, not a background color for large content areas. Use it for the principal CTA, key diagram nodes, small highlighted words, and selected result details.
- Body copy must remain off-white or muted gray-green with sufficient contrast. Do not use lime for long paragraphs or small low-contrast text.
- The transformation graphic must read clearly as sugarcane by-product → organic compost → soil/plant growth. Use simple arrows and labels; do not fabricate technical process stages.

### 14.4 Typography and spacing locks
- Use a 4 px spacing base and routine spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px.
- Desktop hero headline: 52–64 px, line-height 1.02–1.1. Section titles: 34–40 px. Body: 16–18 px, line-height 1.55–1.65. Mobile hero headline: 34–40 px.
- Use Space Grotesk/Inter or the existing approved equivalents for Latin text and a tested Arabic sans-serif for Arabic content. Maximum two font families.
- Use tabular numerals for result cards. Preserve screenshot text hierarchy and wrapping; do not shrink headings simply to avoid making layout adjustments.

### 14.5 Page composition lock
Implement only the six approved routes: `/`, `/about`, `/products`, `/calculator`, `/request-quotation`, `/contact`.
- Home: dark header → asymmetric high-impact hero → verified value strip → circular transformation story → dual-unit calculator feature → single compost product section → homepage quality/testimonials/projects → high-contrast quotation CTA → footer.
- About: dark visual intro → company story/mission → verified production context/process → CTA → footer.
- Products: compost product hero → description/verified features → technical specifications/documentation only when supplied → calculator/quotation CTAs → footer.
- Calculator: dark intro → accessible form panel → two result panels (metric tons and cubic meters) → assumptions/caveat → continue-to-quotation → footer.
- Request a Quotation: one unified form for Standard/Bulk/Customized, shared contact fields, conditional fields, optional calculator summary, notes, and visible status states. A lighter form surface is permitted only if needed for legibility or shown in the reference.
- Contact: contact intro → approved contact methods/details → location only if supplied → footer.
Quality, testimonials, and agricultural projects remain homepage sections. No blog, pricing plan, customer login, custom admin, cart, checkout, or payment flows.

### 14.6 Functionality and data integrity locks
- Keep the existing React stack; do not migrate frameworks or restructure the whole app without a verified need.
- The calculator must not contain guessed application rate, bulk density, or agronomic values. If approved values are unavailable, show a configuration-needed state and prevent misleading calculation. When enabled, show both metric tons and cubic meters.
- Every result is an estimate, not an agronomic recommendation or binding quotation.
- The unified quotation form has exactly three request types: Standard, Bulk, Customized. Do not claim submission success until the Apps Script endpoint confirms it.
- Use Cloudinary for public media only; never put privileged API credentials in frontend code.
- No accounts, custom database/backend, admin dashboard, e-commerce, checkout, or payment in V1.

### 14.7 Acceptance gates
The desktop result must match the reference's dark composition, hierarchy, focal graphic, CTA, and lime restraint. Mobile diagram labels must remain readable. All six routes and form/calculator states must work, and no fake metrics, testimonials, certificates, or technical claims may appear.
