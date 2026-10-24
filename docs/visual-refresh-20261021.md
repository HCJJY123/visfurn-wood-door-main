# Visual refresh: application concepts

This batch replaces eight application-image placements on five pages. All eight scenes are AI-generated illustrations, not photographs of VISFURN products, a showroom, a factory, a completed project, or a location in the named market. They do not verify any construction, material, certification, moisture, acoustic, fire, or other performance claim.

## Placement and provenance

- Home first banner: light oak door in a quiet residential corridor.
- Home second banner: white single-panel interior door.
- Interior-door category hero: light wood door beside a living area.
- Home WPC category card: wood-look door in a dry bathroom setting.
- Home hotel category card: guestroom door in a modest corridor.
- Saudi Arabia page: warm neutral apartment application concept.
- UAE page: coordinated apartment hallway application concept.
- Qatar page: guestroom application concept.

The market labels describe the page audience, not where a scene was photographed. Images are original generated assets; no competitor images were copied. Existing SKU images, provenance statements, prices, quantities, lead times, product specifications, forms, and inquiry scripts are unchanged.

## Delivery

- Responsive AVIF and WebP versions, with explicit intrinsic dimensions.
- Mobile hero crops derived from the same master scene, not a different door design.
- Mobile hero imagery presented above text to preserve the complete door/frame.
- First/LCP hero eager/high priority; secondary carousel and category images lazy loaded.
- Visible illustrative-concept labels, factual alt text, and updated homepage social image.
- Old files retained because other pages may still reference them.

## Verification

Run from repository root:

- `python scripts/check-visual-refresh.py` checks decoded assets, image budgets and dimensions, JSON-LD integrity, and unchanged commercial prose/links against production base `750891f0f7e8e04174b998314be3df68e154fce5`.
- `node scripts/check-visual-refresh.cjs` checks all five pages at 390, 768 and 1440 pixels, actual image loading, repeated carousel navigation, no local 404s, and overflow. Requires Playwright and Chromium. External requests are blocked and no lead is submitted.
- `npm run build` is the repository's existing static-site no-op build.

Browser verification must be completed on the exact preview before merge. Local Chromium could not launch in the integration runtime because socket creation was restricted; the escalation wrapper failed before launch. This is not a browser-test pass.
