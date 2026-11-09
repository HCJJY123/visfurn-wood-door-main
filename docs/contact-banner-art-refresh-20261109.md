# Contact first-banner art refresh — 2026-11-09

## Scope
User requested an artistic redesign of the small red-box area on the first Contact banner, with the door product display kept prominent, then requested publication. Replace only the first image and its matching OG/Twitter preview image. No copy, dimensions, CSS, carousel logic, second/third banner, form or tracking changes. Existing original assets remain. New filenames avoid stale image-cache reuse.

## Source and design
Original reference: assets/images/contact/contact-modern-door-collection-1859.webp. Built-in image editing output: exec-fd98553c-ff9d-4616-ab47-07739a20636e.png, 1859×846; source SHA256: 93d6e5465ebfbfdbbdf25c4cb1aa1155d07ca16750bafcdeb92101bbc126540e

Edit request: redesign only the left 28.5% decorative vignette with a warm greige curved relief wall, a light travertine plinth and one small matte ivory organic loop sculpture, soft light and negative space; remove the old toy figure, balloons and clutter. Keep all three door designs, full-height frames, grain colors, handles, angled panels, spacing and background fully visible, with the product display dominant. No added labels or product/certification claims. This is a designed marketing visual, not a factory or delivered-project photograph.

The approved generated composition was encoded as full-size and 768px WebP for the existing src/srcset. This step only encodes/resamples the approved image; no additional semantic edits. The final file ratio matches the existing banner.

## Static verification
Only the two image filenames replace their prior references in Contact. Normalizing those paths recovers the exact base Contact source; hence all other source, form endpoints, dimensions, CSS, scripts and two other banners are unchanged. All three slides and existing contain rules remain. WebP decoding and dimensions pass.

[
  {
    "path": "assets/images/contact/contact-modern-door-art-gallery-20261109-1859.webp",
    "dimensions": [
      1859,
      846
    ],
    "bytes": 85588,
    "sha256": "058a077abb6e4481988874669742ffe6c9423051b7643143ccb3e3366fb73cd4"
  },
  {
    "path": "assets/images/contact/contact-modern-door-art-gallery-20261109-768.webp",
    "dimensions": [
      768,
      350
    ],
    "bytes": 17642,
    "sha256": "961f51375634be1d24757e7cc471a08dc547070dcff0efaeff8ba931a2b72d67"
  }
]

## Release verification
Candidate and production receipts will be appended to the isolated PR after formal-domain checks. No real inquiry will be submitted. No ranking, AI citation or conversion outcome is inferred from this visual change. Roll back by reverting this isolated PR.
