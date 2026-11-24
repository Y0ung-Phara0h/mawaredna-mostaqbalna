# STRICT IMPLEMENTATION PROMPT — MAWAREDNA MOSTAQBALUNA

You are implementing a real React website from an existing codebase. Your task is **faithful visual reproduction**, not redesign.

## INPUTS YOU MUST USE
1. The provided concept reference screenshot(s). These define the target appearance.
2. The matching concept `DESIGN.md`. This is the detailed implementation contract.
3. The existing repository. Its installed framework, router, libraries, and folder conventions must be preserved.
4. Existing SRS/requirements and approved company content, where supplied.

Before coding, identify which reference screenshot corresponds to the selected concept. Do not mix elements from the other three concepts. If multiple screenshots are supplied, map each screenshot to the relevant page and viewport before implementation.

## PRIMARY OBJECTIVE
Recreate the reference as closely as possible at the same viewport dimensions. Match, in this order:
1. Overall composition and section order.
2. Container width, margins, column proportions, alignment, and element positions.
3. Hero image choice, crop, focal point, overlay, and visual scale.
4. Typography family/weight/size/line-height and line wrapping.
5. Colors, surfaces, borders, radii, shadows, and icon size.
6. Internal spacing, button dimensions, form controls, and responsive behavior.

**Do not improvise.** Do not apply your personal design taste. Do not replace the screenshot with a generic template. Do not add unrequested content, pages, cards, visual effects, animations, gradients, icons, or decorative illustrations. If an exact image, logo, font, or icon asset is supplied, use it rather than substituting it. If an asset is missing, choose the closest semantically correct existing project asset and record the substitution; do not fabricate logos, certificates, customer testimonials, production figures, or product claims.

## REQUIRED FIRST PASS — INSPECT, DO NOT MODIFY YET
1. Inspect the project structure and `package.json`.
2. Identify React version, router, styling method (CSS/Tailwind/CSS modules/etc.), existing reusable components, assets, scripts, and environment variable conventions.
3. Identify current routes and existing functionality.
4. Read the entire matching `DESIGN.md` and relevant project requirements.
5. List what assets are available and what is missing. Identify the supplied reference viewport size. If no screenshot dimensions are given, treat 1440 × 900 as the desktop comparison target and 390 × 844 as mobile.
6. Then implement. Do not stop after producing an analysis report.

## NON-NEGOTIABLE PROJECT SCOPE
Implement only these public routes:
- `/` Home
- `/about` About
- `/products` Products
- `/calculator` Calculator
- `/request-quotation` Request a Quotation
- `/contact` Contact

Product scope is one organic compost product made from sugarcane waste. Quality, testimonials, and agricultural projects are homepage sections, not separate routes.

Do NOT add customer accounts, login/register, custom backend/database, admin dashboard, e-commerce cart, checkout, payment gateway, blog, product catalog, subscription plans, or unrelated features.

## STRICT FUNCTIONAL REQUIREMENTS
### Calculator
- Show both estimated mass in **metric tons** and estimated volume in **cubic meters**.
- Never invent application rate, bulk density, supported area units, or conversion assumptions.
- Use only values supplied in project configuration or approved requirements. If required values are absent, display a helpful configuration-needed state instead of calculating a misleading result.
- Clearly label outputs as estimates and state that they are not an agronomic recommendation or binding quotation.
- “Continue to quotation” must carry the available calculator inputs/results into the unified quote form without losing values.

### Quotation form
- One unified form only, with exactly these request types: `Standard`, `Bulk`, `Customized`.
- Shared fields should include the approved contact/project details. Reveal conditional fields based on request type, following the requirements. Do not invent mandatory business rules.
- Validate required fields accessibly; show field-level errors.
- Display loading while submitting. Display success **only after** the configured Google Apps Script endpoint confirms successful processing. On failure, show a recoverable error and preserve the user's entered data.
- Keep endpoint configuration in the project's environment/configuration convention. Do not pretend a mock request is a successful real submission.

### Media and security
- Public images may be hosted on Cloudinary. Never expose privileged Cloudinary API secrets or admin credentials in client-side code.
- Reuse existing images where possible. Optimize images, preserve aspect ratios, provide explicit dimensions/aspect ratios, and use appropriate `object-fit`/`object-position`.
- Do not add secrets to source files or commit `.env` values.

## VISUAL IMPLEMENTATION RULES
- The screenshot is the authority for the visible page. Match it; do not reinterpret it.
- Use the exact color tokens, typography guidance, measurements, layout rules, and page composition in the selected `DESIGN.md`.
- Keep the same section order and approximate heights. Do not compress or expand sections arbitrarily.
- Match the screenshot's content width, header height, hero height, column ratio, image focal position, text width, button size, border radius, and vertical rhythm.
- Do not introduce random CSS values. Use the document's spacing scale and centralize design tokens in one theme/tokens file or CSS variable section.
- Avoid emoji as icons. Use the project's current icon package if one exists; otherwise use simple inline SVG only when the reference requires an icon.
- Do not use placeholder lorem ipsum. Use supplied content. If the exact copy is not supplied, write concise neutral copy based only on approved facts, and keep its length similar to the visible reference text to preserve line wrapping.
- Do not add hover animations or scroll effects unless the reference or DESIGN.md requires them. Keep motion subtle and honor `prefers-reduced-motion`.
- Desktop fidelity must not break mobile. Implement responsive behavior as described in the design file; no horizontal overflow.
- Ensure keyboard access, visible focus states, semantic headings, form labels, and sufficient color contrast.

## CODE QUALITY RULES
- Reuse existing project patterns and components. Do not replace the app architecture.
- Keep components small and purposeful. Avoid one enormous page component.
- Separate content/data from presentation when the project already does so.
- Use semantic HTML and accessible React patterns.
- Do not duplicate header/footer implementations across pages.
- Keep calculator logic deterministic and testable; keep form submission isolated from UI components.
- Do not install new dependencies unless the existing project cannot reasonably support a required feature. Explain any dependency you add.
- Do not leave dead buttons, fake links (`href="#"`), console errors, or visible debug elements.

## VISUAL QA — REQUIRED BEFORE YOU FINISH
1. Run the existing development/build scripts and fix all build errors.
2. Render or inspect the site at 1440 × 900, 1280 × 800, and 390 × 844.
3. Compare each implemented page against its corresponding reference screenshot. Fix mismatches in this order: layout geometry → image crop → typography → spacing → colors → borders/effects.
4. Check header, hero, first section transition, calculator, quotation form, footer, and mobile navigation.
5. Test every route and every CTA. Test calculator configuration-missing state and configured state only when approved values exist. Test quotation loading, confirmed success, and failure/preserved-data state.
6. Check browser console and terminal for errors. Check for horizontal scrolling at mobile width.
7. Do not claim pixel-perfect completion unless you actually rendered and compared the result. Be honest about any remaining mismatch or missing asset.

## FINAL RESPONSE FORMAT
When implementation is finished, report:
- Files/components created or modified.
- Routes completed.
- How to run the project.
- Assets that were missing or substituted.
- Any configuration still required (especially approved calculator rate/density and Apps Script endpoint).
- QA viewports tested and any remaining visual differences.

Now implement the selected concept faithfully. Do not stop at a plan, mockup, or explanation; modify the existing project code.
