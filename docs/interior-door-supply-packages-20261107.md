# Interior door supply packages and qualified RFQs

The current buyer path lets visitors choose a door design but leaves several quotation decisions spread across technical guides. This release brings leaf/frame/trim/hardware scope, primed versus finished white surfaces, and professional sample/trial planning into the collection-to-inquiry journey.

## Resulting behavior

- New commercial hub: `/solutions/interior-door-supply-packages`.
- New buying guide: `/blog/white-primed-vs-white-finished-interior-doors`.
- New buying guide: `/blog/interior-door-trial-order-for-distributors-contractors`.
- Interior, wooden and WPC collections have scoped quote links. The WPC collection distinguishes leaf material from frame material; the other two clarify white finish state.
- Homepage, product index, blog index, existing project/quotation solutions and two existing technical guides link to the new content.
- Contact form has optional inquiry purpose, supply scope and finish state. Known CTA parameters preselect real form options; a restored/manual choice is preserved. Formspree endpoint, required fields, product/source context and the existing success/error handling are unchanged.
- Sitemap contains all three clean URLs and updates dates only for changed pages already in the sitemap. New pages have canonical URLs, descriptive metadata and one applicable structured-data entity, without Product/Offer or performance claims.

The standard wooden/WPC/PVC batch minimum remains 50 sets total and 10 sets per model. Samples and smaller commercial trials are separate feasibility reviews, not guaranteed lower-MOQ products. No sample credit, refund, certification, construction specification or customer project is invented. SVG illustrations explain buying scope and are labeled as diagrams.

## Validation before publication

- `python scripts/check-supply-packages.py`: passed; three new page entities, 21 contextual RFQ links, valid form fields, unique sitemap entries and blog discovery.
- `node scripts/check-door-supply-context.cjs`: passed; actual collection-prefill script and supply-prefill script run in production order against the real contact option values. Tests cover collection attribution, purpose/scope/finish, preserved choices and unknown-parameter rejection.
- `node scripts/check-inquiry-submit-mock.cjs`: passed; invalid-form guard, duplicate-click guard, HTTP error, retry, success timing/deduplication and product attribution. Requests are mocked; no real inquiry is sent.
- Added/changed local link audit: 228 URL/asset/anchor references checked against the pinned remote tree plus this release; no missing targets.
- `npm run build`: passed. This repository is static; its build command is only a no-op, so the content and form checks above are the substantive checks.

Production deployment status and rendered-page checks must be verified separately after publishing. A merged PR or a READY preview is not proof that the custom domain changed.

## Release and rollback

Base: `564ce4f710e39c346dd4c7cbf5db763f12e0e148` in `HCJJY123/visfurn-wood-door-main`. The intended Vercel project is `visfurn-wood-door-site` (`prj_gwcK8vPfKHEf3KIFfvG5YJlFvh7L`) in the existing Mike's projects account, with production domain `www.visfurn.com`.

If the new content or inquiry context causes a regression, revert the isolated release commit/PR and redeploy the restored main branch. The prior READY production deployment is `dpl_7oZtygvjYmw1bYh7fTUS7h4k74js`, associated with the base commit. Do not change project ownership, domains, deployment protection or Formspree settings to publish this release.

## Next evidence to collect

Review qualified RFQs by purpose, supply scope, finish and country after sufficient observations. Measure whether buyers supply enough configuration for a quotation; page counts or button clicks alone do not establish better order conversion. Additional product variants require model-specific construction, finish, dimension, packing and documentation evidence before publication.

Production review found the inherited article header too large for a commercial hub. The follow-up compacts this page only, places selection/quotation actions in its header, and moves the scope illustration after package comparison.
