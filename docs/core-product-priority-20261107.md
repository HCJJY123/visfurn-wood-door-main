# Core product and buyer selection

Buyers previously reached lengthy quotation guidance before the homepage's product choices, and WPC was missing from its selected-product feature grid. Several core model quote buttons also opened a generic contact form. This release brings the two main interior-door product lines and buyer routes forward and preserves model-level context into the existing RFQ.

## Changes

- Homepage heading and metadata identify wooden and WPC interior-door supply. Immediately after the existing hero, two equal product cards lead to white moulded/PVC-faced and WPC choices, including four existing model pages. The prior four-card visual feature is replaced; all nine category URLs remain available in the main category grid.
- Distributor and project routes precede the longer quotation explanation. They lead to supply-package/sample planning and door-schedule preparation respectively.
- Four existing model pages have concise model-specific selection briefs and leaf-only, leaf/frame/trim, hardware and professional-sample RFQ links.
- The existing product-context handler recognizes the three previously missing model slugs; the fourth already worked. Product name, URL and source remain available to the contact form alongside its optional scope and purpose choices.
- The white moulded page's unqualified solid-wood wording is corrected while retaining its URL. Its free-sample label becomes a review request, the contact-linked PDF label becomes a product-data request, and absolute warping/transit claims become configuration/reduction language.
- No new model dimensions, weights, certificates, delivery promises or reference prices are invented. Current model-specific references remain in the existing specifications; the selection briefs distinguish them from the final offered assembly. Standard wooden/WPC/PVC batch minimums remain 50 sets total and 10 sets per model.

## Validation

- 59 added local URL, asset and anchor references resolve against the base tree and already-merged supply-package release.
- One H1 per changed page; JSON-LD parses; no new duplicate IDs; the new product and buyer sections precede the long homepage explainer.
- `python scripts/check-supply-packages.py` passes, including homepage `/` attribution.
- `node scripts/check-door-supply-context.cjs` passes for all four exact model selections using the actual contact options and the production scripts in order.
- `node scripts/check-inquiry-submit-mock.cjs` passes. All submission requests are mocked; no live inquiry is sent.
- `npm run build` passes; this is a static repository with a no-op build command, so the link and RFQ checks are the substantive local checks.
- Live custom-domain and visual verification follow publication; preview readiness alone does not establish production delivery.

## Target and rollback

Base main: `8c43599b236d69f3d658a6f401e7a7f00ec93221` in `HCJJY123/visfurn-wood-door-main`.

Production target: `www.visfurn.com`, existing `visfurn-wood-door-site` project (`prj_gwcK8vPfKHEf3KIFfvG5YJlFvh7L`) in Mike's projects. Prior production deployment: `dpl_CJ2E9nknNrQgyVPV7ruBap7bQaCk`.

Revert this isolated PR and redeploy main if product selection or RFQ context regresses. No project, domain, deployment-protection, analytics or form-endpoint settings are changed.

## Remaining product evidence

Actual model construction drawings, available size ranges, weights, packed dimensions, photographs and applicable documents still need supplier evidence before further parameter enrichment. This release improves selection and model attribution; it does not claim those evidence gaps have been resolved or that order conversion has already improved.
