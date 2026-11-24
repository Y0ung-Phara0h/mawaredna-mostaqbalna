# Design Specification — Concept 03: Clean & Fresh

**Project:** مواردنا مستقبلنا (Mawaredna Mostaqbaluna)  
**Concept:** Clean & Fresh  
**Design character:** Light, approachable, optimistic, minimal, trustworthy  
**Status:** Design direction specification — implementation reference

---

## 1. Design intent

Create a welcoming, contemporary website that connects the company's sugarcane-waste compost story to healthy soil and a greener agricultural future. This concept is the lightest and most approachable of the four: white space, soft botanical shapes, fresh greens, gentle curves, and simple content blocks create an easy browsing experience.

It should feel modern and environmentally conscious without becoming playful or informal. The company remains a serious supplier serving farms, agricultural businesses, engineers, and investors.

**Core impression:** “A clear, natural, dependable solution for more sustainable agriculture.”

## 2. Design principles

1. **Freshness through restraint:** use white space and soft green accents rather than heavy decoration.
2. **Simple communication:** explain the product in plain language and short content blocks.
3. **Human-scale storytelling:** show soil, plants, sugarcane, and product textures.
4. **Low-friction actions:** calculator and quotation paths should be easy to find.
5. **Credibility through evidence:** use verified specifications and approved quality documentation.

## 3. Visual system

### 3.1 Suggested color tokens

| Token | Suggested value | Usage |
|---|---:|---|
| `color-green-900` | `#153D2B` | Main headings and footer |
| `color-green-800` | `#1D5A36` | Primary buttons |
| `color-green-600` | `#3E8B45` | Links and icons |
| `color-leaf-500` | `#8CCB4A` | Highlight accents |
| `color-leaf-200` | `#DDEFCB` | Soft decorative surfaces |
| `color-sage-100` | `#EFF5E9` | Section backgrounds |
| `color-white` | `#FFFFFF` | Main surface |
| `color-text` | `#1C3025` | Body text |
| `color-muted` | `#6A786D` | Secondary copy |
| `color-border` | `#E2EAE0` | Dividers and borders |

Use pale green as a supporting surface. Keep long-form reading areas white for clarity.

### 3.2 Typography

- Headings: friendly geometric sans-serif, medium-to-bold weight.
- Body: neutral sans-serif, regular weight, generous line-height.
- Use short headlines and avoid overly condensed fonts.
- Highlight one phrase in green rather than coloring entire paragraphs.
- Arabic type should feel open and contemporary, with sufficient line-height and correct punctuation direction.

Suggested Latin pairing: `Nunito Sans`, `Manrope`, or `Inter`. Suggested Arabic: `IBM Plex Sans Arabic` or another tested family.

### 3.3 Shape language

- Soft organic curves and rounded image masks can be used sparingly.
- Cards: 16–22px radius.
- Buttons: rounded/pill shape.
- Inputs: 10–12px radius.
- Use thin botanical line illustrations as secondary decoration.
- Avoid excessive leaf icons, blobs, and gradients; one or two recurring motifs are enough.

## 4. Layout system

- Centered max-width container around 1160–1240px.
- Desktop: alternating split sections and clean card grids.
- Use generous vertical spacing and clear section titles.
- Keep the background mostly white with occasional pale sage sections.
- Use asymmetrical image placement to prevent the site feeling like a generic template.
- Mobile: single-column, clear image/text order, and comfortable tap targets.

## 5. Global navigation

### Header
- White background with subtle bottom border.
- Compact logo lockup.
- Navigation links with simple active underline or small green marker.
- Primary CTA: **Request a Quote** in solid green.
- Keep header clean and avoid oversized navigation decoration.

### Footer
- Dark green or deep forest footer with a lighter logo treatment.
- Organize links into company, explore, and contact groups.
- Add approved social links only.
- Use a small botanical mark or soft gradient accent, not a large illustration.

## 6. Page specifications

### 6.1 Homepage `/`

**Hero**
- Clean two-column layout.
- Left: small eyebrow “Organic compost from sugarcane by-products,” headline “From Sugarcane Waste to a Greener Tomorrow,” short description, two CTAs.
- Right: sugarcane field or close-up of a young plant in dark rich soil, cropped into a soft organic shape or rounded rectangle.
- Keep the hero background white.
- Use a small floating badge such as “Plant-based compost” only if this wording is approved.

**Benefits row**
- Four evenly spaced icons with short labels.
- Example topics: plant-based origin, circular resource use, soil enrichment purpose, sustainable agriculture.
- Avoid numerical claims unless documented.

**Calculator preview**
- Pale sage panel with a clear title and one-sentence explanation.
- Form controls on white surfaces.
- Results shown in a visually distinct area with two side-by-side values: metric tons and cubic meters.
- Primary action opens `/calculator`.
- Show an explanatory estimate note.

**Product section**
- Product image and short description.
- Three concise feature points.
- Link to full product information.

**Quality section**
- White or pale green background.
- Show document/certificate previews as tidy thumbnails.
- Clearly label each item using its actual document title and issuing body.
- If no certificates are supplied, use a neutral quality-process introduction instead of empty badges.

**Testimonials**
- Simple quote cards with subtle borders.
- Use real approved customer names, roles, and quotes only.
- If no approved testimonials are available, omit the section or use a client-approved alternative.

**Projects**
- Small image gallery or two/three project cards.
- Do not imply the projects are company clients unless confirmed.

**Closing CTA**
- Pale green or dark-green banner with a clear invitation to request a quotation.

### 6.2 About `/about`
- Soft green intro band with a concise company statement.
- Story section with image and copy.
- Mission and values in simple cards.
- Production locations as clean image/text blocks.
- Optional “From by-product to soil resource” narrative, subject to approved process details.

### 6.3 Products `/products`
- White product detail page.
- Product image with soft organic shape.
- Product description and approved benefit list.
- Technical specifications in a clean two-column definition list or table.
- Download links only for actual client-provided documents.
- CTA row for calculator and quotation.

### 6.4 Calculator `/calculator`
- Simple centered page with pale-sage background around the calculator.
- Step 1: enter land area.
- Step 2: choose an approved area unit.
- Step 3: calculate.
- Results panel: estimated tons and estimated cubic meters.
- Explain that outputs are estimates and depend on company-approved application rate and bulk density.
- If configuration is unavailable, explain that the calculator is temporarily unavailable rather than displaying sample numbers.
- CTA to transfer values to quotation form.

### 6.5 Request a Quotation `/request-quotation`
- Clean white page with a short intro.
- A progress cue may be used only if the form genuinely has multiple steps.
- Request type options shown as three selectable cards or a segmented control.
- Shared contact information grouped separately from project information.
- Conditional fields appear below request type.
- Calculator summary appears as a small pale-green panel when prefilled.
- Show clear validation and submission feedback.

### 6.6 Contact `/contact`
- Friendly, direct page with clear contact method cards.
- Phone, WhatsApp, email, and approved address.
- Use simple icons and short action labels.
- Do not add a map unless the company provides a verified location and requests it.

## 7. Component inventory

- `CleanHeader`, `CleanFooter`
- `OrganicHero`, `SoftImageFrame`
- `BenefitIconCard`
- `PaleCalculatorPanel`, `CalculatorResultPair`
- `ProductFeatureList`, `SpecificationList`
- `CertificateTile`, `TestimonialQuote`, `ProjectTile`
- `RequestTypeCard`, `QuotationForm`
- `ContactMethodCard`, `InlineNotice`

## 8. Interaction and motion

- Use gentle transitions (160–240ms).
- Buttons may slightly darken and lift on hover.
- Images may have a very subtle zoom on hover, but avoid movement on touch devices.
- Soft decorative shapes should remain static or move minimally.
- Form fields should show clear focus and error states.
- Respect `prefers-reduced-motion`.

## 9. Responsive behavior

- Desktop: two-column hero and alternating image/text sections.
- Tablet: maintain two columns only where text remains readable.
- Mobile: stack sections; image should not precede the headline unless the content strategy explicitly calls for it.
- Benefits become 2x2 cards.
- Calculator inputs stack, with result values displayed in two clear rows or columns if space permits.
- Specification tables become stacked label/value pairs.
- Quotation form is one column.

## 10. Accessibility and content rules

- Maintain sufficient contrast for green text on pale green.
- Avoid very light body text.
- Ensure rounded buttons still have clear boundaries and focus indicators.
- Use semantic sections and heading order.
- Keep labels visible; do not rely on placeholder text alone.
- Ensure icons have text labels where meaning is important.
- Test Arabic RTL and mixed-unit content, including `m²`, `m³`, and `ton`.
- Do not use unverified environmental, quality, or agricultural claims.

## 11. Assets and photography

Prioritize natural, optimistic photography:
- Sugarcane fields in daylight.
- Close-up compost texture.
- Hands holding soil/compost only if the image is genuine and suitable.
- Young plants and healthy soil.
- Production and packaging photos supplied by the company.
- Approved laboratory and project images.

Use soft daylight, realistic colors, and approachable compositions. Avoid overly staged lifestyle stock photography.

## 12. Developer handoff notes

- Use CSS variables for color, spacing, radius, and typography tokens.
- Reuse card and section patterns without making every section identical.
- Keep decorative shapes in CSS/SVG and mark them decorative for assistive technology.
- Optimize all images and define aspect ratios.
- Keep calculator math separate from the UI.
- The calculator must return both tons and cubic meters using approved application rate and density.
- The unified quotation form and Google Apps Script workflow remain identical to the shared SRS.
- Keep all external integrations out of visual components.

## 13. Design acceptance checklist

- [ ] The site feels fresh and modern while remaining B2B-appropriate.
- [ ] White space and soft green accents create a calm experience.
- [ ] Homepage story is easy to understand at a glance.
- [ ] Calculator is discoverable and clearly presents both units.
- [ ] Product specifications remain readable.
- [ ] Quotation form is simple and accessible.
- [ ] Quality and testimonial content is genuine and approved.
- [ ] Mobile experience is not crowded or overly decorative.

---

## 14. Strict implementation contract — visual matching rules

This section is mandatory and overrides any looser wording elsewhere in this document.

### 14.1 Visual source of truth
- The supplied reference screenshot for **Clean & Fresh** is the visual source of truth. Reproduce its whitespace, natural shapes, image masks, section proportions, card alignment, typography, and CTA treatment as closely as possible.
- Do not add visual complexity. This concept depends on restraint. No oversized gradients, decorative leaf wallpaper, excessive pills, shadow-heavy cards, or extra floating widgets.
- Conflict priority: (1) reference screenshot for visible appearance, (2) this DESIGN.md for responsive and hidden states, (3) SRS/product baseline for functionality.

### 14.2 Fixed layout measurements
Use these targets unless the screenshot clearly indicates otherwise:
- Reference desktop viewport: 1440 × 900 px. Also test 1280 × 800 px and mobile 390 × 844 px.
- Main content max-width: 1200 px, centered. Desktop header: 72 px; mobile header: 64 px.
- Desktop grid: 12 columns, 24 px gap. Hero target: balanced 50/50 split with a 48 px gap; image and copy align vertically.
- Standard section padding: 96 px desktop / 56 px mobile. Compact section padding: 64 px.
- Cards: 18 px radius, thin light-green border, no heavy shadow. Inputs: 11 px radius. Buttons: pill shape only if the screenshot uses it; otherwise use 12 px radius.
- Mobile gutters: 20 px. Stack all paired content in the reading order shown by the reference and maintain 20–24 px gaps between stacked groups.

### 14.3 Whitespace and shape locks
- White is the dominant canvas. Pale sage is used only for selected section backgrounds or small highlighted panels. Strong green is reserved for headings, links, and actions.
- Preserve visible whitespace. Do not compress sections simply to fit more content above the fold. Do not inflate card padding beyond the visual reference.
- Organic curves and botanical line-art must be used only where the reference uses them. Keep decorative shapes behind content and never reduce contrast.
- Images should be natural, bright, and credible: compost, soil, sugarcane, seedlings, crop rows, or real production imagery. Avoid unrelated lifestyle photography.

### 14.4 Strict typography and spacing system
- Use a 4 px spacing base and this scale for routine values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px.
- Desktop hero headline: 48–56 px, line-height 1.05–1.15. Section titles: 32–38 px. Body: 16–18 px, line-height 1.6. Mobile hero headline: 34–40 px; body: 15–16 px.
- Use font families named in Section 3 where available. If not available, select the closest existing sans-serif and preserve typographic scale and weight. Maximum two families.
- Do not manually break headlines except where the reference clearly uses a deliberate line break. Do not center all content by default; preserve the screenshot's alignment.

### 14.5 Page composition lock
Implement only these six routes: `/`, `/about`, `/products`, `/calculator`, `/request-quotation`, `/contact`.
- Home: clean header → airy split hero → compact value/benefit row → product story → calculator section → homepage quality/testimonials/projects sections → quotation CTA → footer.
- About: clean intro → company story/mission → approved production context/process → CTA → footer.
- Products: one product intro/image → concise description and verified features → approved technical details/documents → calculator/quotation CTAs → footer.
- Calculator: short explanation → clear form → paired outputs in metric tons and cubic meters → assumptions/caveat → continue-to-quotation → footer.
- Request a Quotation: one unified Standard/Bulk/Customized form, shared contact fields, conditional fields, optional calculator summary, notes, and status states.
- Contact: direct contact intro → approved contact details/methods → location only if supplied → footer.
Quality, testimonials, and projects are homepage sections only. Do not introduce product catalogs, pricing pages, blogs, user accounts, ecommerce, or unrelated sections.

### 14.6 Functionality and data integrity locks
- Preserve the existing React app, router, styling approach, and dependency set. Reuse current components where possible.
- Calculator may only calculate when approved application rate and bulk density are available. Never invent them or use arbitrary example values in production. Always show both tons and cubic meters when calculation is enabled.
- Clearly say results are estimates, not agronomic recommendations or binding quotations.
- Use one quotation form with exactly three request types: Standard, Bulk, Customized. Validate user input; show success only after positive confirmation from the configured Google Apps Script integration.
- Cloudinary can host public images; never expose privileged credentials in frontend code.
- No custom backend/database, accounts, admin dashboard, checkout, or payment gateway in V1.

### 14.7 Acceptance gates
The result must preserve the light, calm, spacious character at desktop and mobile; align repeated elements consistently; avoid decorative clutter; support all six routes; and satisfy calculator/form safeguards. No fake testimonials, certificates, metrics, production claims, or client data.
