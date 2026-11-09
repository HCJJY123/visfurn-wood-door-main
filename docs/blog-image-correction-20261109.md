# Blog index image correction — 2026-11-09

User request: “这里的产品图片不能重复出现 而且产品图片必须完整自然展现出来”, referring to /blog.

Base main/production: 4c6f55a09ea2a4bdc09c6fad11239e67a4cbfa53, Mike project visfurn-wood-door-site, READY dpl_HuV5BEr3GVuhvTT4DAco7DQrq24c. Independent branch fix/blog-image-display-20261109; no PR198 content changes included. Existing untracked market-image temporary file excluded.

## Changes
- Nine duplicate card covers replaced with distinct, related existing images. Normalize absolute/relative site paths when checking duplicates: one duplicate group was hidden by URL spelling.
- 74 article cards retained; 62 image-bearing cards now reference 62 unique image files. Text-only cards retained. No article, destination, company, commercial statement, schema or tracking script changed.
- New blog-only CSS: object-fit:contain, natural aspect, centered image, a small safe inset, no hover/focus enlargement. A stable 4:3 display area fits horizontal scenes and vertical products without cutting their edges; standalone featured rows use page gutters. Does not change product pages or article-body images.
- Intrinsic width/height attributes now reflect existing file dimensions. No image bytes generated, edited or overwritten. Product visuals remain design references, not proof of a particular configuration or certification. Packing/planning illustrations remain illustrations.
- Sitemap: only /blog lastmod changes to actual content-modification date 2026-11-09. URL inventory unchanged.

## Replacement map
- /blog/interior-doors-sticking-rubbing-project-inspection: `/assets/images/blog/b24-hotel-door-renovation-existing-frame-hardware-compatibility-checklist/hotel-door-renovation-existing-frame-hero-1600.webp` → `/assets/images/products/wooden-doors/paint-free-brown-wooden-interior-door/01-main-square.webp`. Alt: Complete brown interior door and matching frame design reference.
- /blog/wpc-skin-vs-hollow-door-construction-comparison: `/assets/images/blog/wpc-bulk-sample-approval/wpc-sample-comparison-hero-1600.webp` → `/assets/images/products/wpc-doors/responsive/moulded-panel-wpc-interior-door-front-1200.webp`. Alt: Complete moulded-panel WPC interior door and frame design reference.
- /blog/hotel-door-schedule-fire-rated-guestroom-quote-guide: `/assets/images/blog/saudi-hotel-doors-guide/saudi-hotel-doors-guide-hero.png` → `/assets/images/products/hotel-doors/modern-finished-hotel-interior-door/visfurn-hotel-interior-door-01-front-960.webp`. Alt: Complete finished hotel interior door and matching frame design reference.
- /blog/hotel-door-replacement-phasing-room-by-room-packing-guide: `https://www.visfurn.com/assets/images/blog/b39-hotel-door-replacement-phasing-room-by-room-packing-guide/hotel-door-replacement-phasing-room-by-room-packing-guide-hero-1600.webp` → `/assets/images/blog/b39-hotel-door-replacement-phasing-room-by-room-packing-guide/hotel-room-by-room-door-replacement-packing-1200.webp`. Alt: Illustrative separately packed door and frame packages for phased delivery.
- /blog/wpc-door-frame-threshold-details-bathroom-projects: `/assets/images/blog/b23-wpc-vs-pvc-laminated-wooden-doors-humid-areas/wpc-vs-pvc-laminated-door-humid-area-hero-1600.webp` → `/assets/images/products/wpc-doors/responsive/waterproof-wpc-door-front-1200.webp`. Alt: Complete WPC interior door and frame design reference for room planning.
- /blog/door-handing-swing-direction-hardware-prep-project-schedules: `/assets/images/blog/b14-door-schedule-takeoff-checklist-for-bulk-orders/door-takeoff-estimating-hero-1600.webp` → `/assets/images/products/wpc-doors/modern-prehung/main-1200.webp`. Alt: Complete prehung WPC door and frame design reference.
- /blog/compare-door-supplier-quotes-bulk-projects: `/assets/images/blog/b14-door-schedule-takeoff-checklist-for-bulk-orders/door-takeoff-estimating-hero-1600.webp` → `/assets/images/blog/b14-door-schedule-takeoff-checklist-for-bulk-orders/door-schedule-revision-hardware-rfq-review-1200.webp`. Alt: Illustrative door quotation scope review with drawings, hardware and finish samples.
- /blog/how-to-send-door-sizes: `/assets/images/hero/visfurn-eco-wood-door-hero-1672.webp` → `/assets/images/products/interior-doors/responsive/white-moulded-door-front-1200.webp`. Alt: Complete white interior door and frame design reference for dimension review.
- /blog/door-leaf-rough-opening-jamb-depth-bulk-projects: `/assets/images/blog/b43-door-schedule-project-rfq-guide/door-schedule-project-procurement-desk.png` → `/assets/images/products/wpc-doors/taupe-woodgrain/main-01.webp`. Alt: Complete taupe woodgrain interior door and frame design reference.

## Verification
- Static npm build (no-op by existing package), git diff whitespace, JSON-LD parse, same visible article text/destination list/schema/scripts, all referenced assets exist and intrinsic dimensions decoded.
- Duplicate check uses canonical local paths/file hashes; 62 images / 62 unique files. Visual contact sheets reviewed and normalized perceptual fingerprints checked for near-identical resized copies.
- Managed preview uses exact source HTML/assets, no extra server. CSS viewport widths 375/390/1440; no whole-page horizontal overflow. Actual desktop viewport 1363 also has scrollWidth=clientWidth.
- All 62 image elements use contain and no zoom; first vertical product's entire leaf/frame appears in the screenshot. Materials filter returns 13 matching cards, no other-category card. Layout screenshots are CSS viewport checks, not physical phone tests.
- Existing form and analytics code unchanged. No real inquiry sent. No claims about inbox, SEO rank or lead results.

Publishing receipt, precise candidate SHA and formal-domain checks are recorded in the PR. Rollback is revert this isolated PR; do not overwrite newer work. Only /blog is eligible for a changed-URL notification after formal-domain acceptance; do not repeat previous PR196/197 notifications.
