# Products category image layout — 2026-11-09

User correction: category product images on /products are too small. Publish a layout that makes the complete image the main left column; stack image then copy on mobile.

Cause: the old inherited portrait aspect-ratio (1/1.15) combined with a 250px visual height limited the anchor to about 217px despite a much wider grid column. Inline image max-height/padding added letterboxing.

Change: a Products-only stylesheet resets the visual width to 100%, removes the inherited portrait ratio/fixed height and padding, and presents the existing 1080×607 images at natural ratio with contain. Desktop columns are 1.2fr/1fr; mobile stacks at 760px. Remove the eight competing inline sizing styles and add intrinsic image dimensions. Keep readable headings introduced in the prior restoration.

No text, product-image sources, links, schema, scripts, other pages, Contact banner or tracking changes. Static normalization confirms text/link/script/source preservation; git diff --check passes.

Cloud browser viewport checks: 1440px before/after plus 390px and 375px after; eight images per case load with contain. Client/scroll 1425/1425, 375/375 and 360/360. First image box at 1440 grows 215.4×248 (letterboxed) to 652.3×366.6 with no padding — 3.03 times the width. Mobile images fill their 309px/294px columns at natural ratio; all eight tested. QA iframe copy sets loading=eager only in the internal preview so offscreen assets are checked; production lazy-loading is unchanged.

Raw rows: docs/qa/products-large-images-20261109.json. Formal-domain and interaction evidence will be appended to the isolated PR after release. No real inquiry sent. No repeated indexing notification for this layout-only change (Products lastmod already 2026-11-09). Roll back by reverting this PR.
