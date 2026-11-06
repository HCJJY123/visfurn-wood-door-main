# VISFURN: Semrush evidence and commercial-page changes — 2026-11-07

Website: https://www.visfurn.com . Baseline main: `140889a665ba86891807e194bfa8ff6b611ae086`. Existing production: `dpl_AkRxWXhuAFrWbNn1WdeuimN4GqXo`, READY. Four commercial pages, Contact, robots and sitemap returned HTTP 200 and matched main byte for byte before editing. Existing unmerged PRs, including security-only #186 and older #181/#136/#135, were read and excluded. Work is on an independent branch.

## Source and boundaries

Used the user's logged-in Semrush proxy, https://zh-d-semrush-d-com-s-sem.d.taobao-seo.com/home/ . No substitution with the official entrance. Organic comparison: US database, desktop, report date 2026-11-05; accessed 2026-11-07 Asia/Shanghai. The first WPC overview was Worldwide/2026-11-06; its 20 keywords are not mixed with the US eight-keyword count. Top Pages reports use US/2026-11-05. Keyword Magic is US, `wpc door`, rows show updated one month ago.

All traffic, volume, rank, authority and AI figures below are Semrush estimates or observations within its dataset. Commercial/transactional intent is not a measured conversion rate. AI Visibility, mentions, cited pages and LLM prompts are not a verified recommendation rate, buyer referral or lead. No competitor's analytics or actual inquiry results were available. OPPEIN and George cover other building products; their entire-domain traffic is not door traffic. Dortek is a GRP healthcare specialist, not proof of like-for-like WPC construction.

GSC rechecked: `https://www.visfurn.com/` remains `siteUnverifiedUser`; current connector allows only three recent days with no comparison. No two complete 28-day GSC periods, GA4, Clarity or qualified-lead results were read. No traffic/lead improvement is claimed.

## Screened domains

| Domain | Authority Score | US organic traffic estimate | US keywords | US AI Visibility | US AI mentions | Decision |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| trudoor.com | 33 | 42,726 | 22.6K | 33 | 792 | Primary commercial wood/interior reference; exclude hardware-only traffic and US stock/pricing promises |
| oppeinhome.com | 38 | 10.5K | 5.9K | 19 | 27 | Primary WPC/interior reference, only door URLs used |
| dortek.com | 24 | 703 | 995 | 15 | 19 | Healthcare opening/function reference, different material and performance scope |
| georgebuildings.com | 25 | 886 | 2.1K | 14 | 2 | Secondary project-sourcing reference; broad catalogue and few mentions prevent a door-specific AI-lead claim |
| wpcdoorchina.com | 7 | 0 | 8 | 0 | 0 | Product fit, but not supported as a high-traffic/AI benchmark |
| kangdawpc.com | 6 | 0 | 6 | 0 | 0 | Product fit, but not supported as a high-traffic/AI benchmark |
| goldea.com | 2 | unavailable | unavailable | 14 | 1 | SEO data unavailable; one mention does not establish a strong AI benchmark |
| visfurn.com | 2 | 0 | 34 | 0 | 0 | Our dataset baseline; zero estimate does not establish zero real visitors |

This screen supports three primary references, not a claim that five equally strong, identical-product competitors were verified. JELD-WEN was considered but its report was not completed; it is not included as a verified result.

## Specific pages, not aggregate traffic

| Competitor URL | Traffic estimate | Keywords | LLM prompts | Use for VISFURN |
| --- | ---: | ---: | ---: | --- |
| https://www.trudoor.com/collections/commercial-wood-doors | 822 | 512 | 33 | Clear construction/finish options, model selection and a quotation route on the commercial category itself |
| https://www.trudoor.com/products/commercial-wood-door-with-glass-lite-kit | 104 | 103 | 7 | Quote scope includes glazing and hardware interfaces; do not assume VISFURN's configurations share its certifications |
| https://www.oppeinhome.com/wpc-door-guide | 34 | 6 | 1 | WPC definition, construction and linked commercial selection |
| https://www.oppeinhome.com/internal-wooden-door-for-sale-ydr019d | 57 | 8 | 0 | Existing model detail can answer purchase intent without a new generic blog |
| https://dortek.com/product-sector/healthcare-doors/ | 52 | 31 | 5 | Separate healthcare opening functions and direct them to relevant options |
| https://dortek.com/product-sector/healthcare-doors/operating-room-doors-healthcare-doors/ | 35 | 13 | 6 | Specialist requirements belong to a defined assembly/document review |

Top Pages report URLs and observed row text are retained in `docs/qa/semrush-observed-20261107.json`. Public source checks also used https://www.trudoor.com/collections/commercial-wood-doors , https://www.trudoor.com/pages/faq , https://www.oppeinhome.com/product/wood_tones-doors , and https://dortek.com/product-sector/healthcare-doors/ . Their prices, stock, labels, construction and performance are not transferred to VISFURN.

## Keyword evidence and assignment

US volume is the tool's monthly average estimate. Rank is the reported desktop/database observation, not a fixed worldwide rank. The organic view includes all ranking types; duplicate keyword rows can represent different SERP appearances and are not added together. Singular/plural volumes are not summed as unique demand.

| Keyword | Volume | Intent shown | Competitor observation | VISFURN destination |
| --- | ---: | --- | --- | --- |
| wpc door / wpc doors | 210 each | I + C | Keyword Magic, KD 16; no claimed unique combined demand | `/products/wpc-doors` |
| wpc door frame | 50 | I | Keyword Magic, KD 17 | Same WPC URL, complete frame/trim scope |
| commercial interior doors | 720 | C | Trudoor wood collection, rank 2, traffic estimate 95 | `/products/interior-doors` |
| wood doors and frames | 90 | T | Trudoor wood collection, rank 1, traffic estimate 22 | `/products/wooden-doors` |
| wooden door and frame | 720 | I + T | Trudoor wood collection, rank 3, traffic estimate 13 | Same wooden URL, leaf/core/frame distinction |
| hospital doors | 1,000 | I | Dortek healthcare category, rank 6, traffic estimate 34 | `/products/hospital-doors` |
| laboratory doors | 480 | C + I | Dortek research/laboratory category, rank 2, traffic estimate 21 | Existing laboratory model, linked from hospital selection |
| operating room door | 110 | I | Dortek operating-room page, rank 1, traffic estimate 9 | Hospital page: requirements review only, no blanket compliance promise |

Terms such as solid wood, fire-rated, cleanroom and hermetic can have demand, but no new performance or material claim is authorized by keyword demand. `wpc door manufacturers` shows volume 40 with unavailable intent/KD in the row; it is not evidence of VISFURN's manufacturing identity.

## Ranked opportunities and selected work

1. Make commercial selection and RFQ routes clear on the existing four collections: competitor category-page evidence and observable missing hero RFQ links on wooden/hospital pages. **Implemented.**
2. Distinguish core/construction from the visible finish, and quote leaf/frame/trim/hardware on the same basis. Supported by frame/construction queries and current product descriptions. **Implemented.**
3. Unify conflicting/repeated CollectionPage entities and visible collection descriptions. Two CollectionPage blocks existed on each affected page. **Implemented: one identified collection per page; existing ItemLists retained.**
4. Restore verified GSC access and measure actual commercial query/page demand; access is still blocked. **Dependency, no invented results.**
5. Obtain model-specific samples, section drawings and performance reports before expanding specialist targeting. **Awaiting evidence.**

### Files and buyer impact

- `products/wpc-doors.html`: title/H1 explicitly cover WPC doors and frames for bulk interiors; replace and relocate an existing buyer block with bedroom, bathroom and prehung selection routes. Include wall-depth/frame/trim scope and moisture limits. Retain original model images, wet-area guidance and sample links; correct stale price-reference wording.
- `products/interior-doors.html`: replace the generic supply-introduction block with painted/moulded, WPC and wooden/composite routes. Distinguish solid-core from solid-wood. Move model cards ahead of the longer technical blocks; retain recent edge/frame and sample/receiving guides.
- `products/wooden-doors.html`: clarify wooden interior door/frame scope, add hero RFQ/model buttons and painted versus paint-free product selection. Require the actual core/facing/edge specification. Move models before longer technical guidance.
- `products/hospital-doors.html`: add hero RFQ/model buttons, swing/laboratory versus sliding/controlled-opening selection, and a frame/glazing/hardware responsibility route. Exact specialist suitability remains subject to review.
- `assets/buyer-decision.css`: responsive three-card selector, readable links/buttons and focus indication, one column on narrow viewports. CSS scoped to these four pages; existing mobile sidebar hiding remains in effect where already configured.
- `sitemap.xml`: lastmod updated for the four materially changed canonical URLs only, retaining 148 unique URLs and the previously published guides.

All new RFQ links use the existing `/contact?product=...&source_page=...#quote-form` route. Company entity, contact details, 50 sets/order and 10/model minimums, product images, Formspree, GTM/GA/Ads and success tracking are unchanged. No new blog, country page, performance figure or certification claim was added. Image decision: reuse existing product references; no new asset or generation needed for this content decision.

## Verification and release record

Static build passed (this repository's build is a static no-op); main.js syntax and existing fully mocked inquiry validation/error/retry/success/dedup test passed. All four HTML pages have one H1, correct self canonical, one CollectionPage, valid JSON-LD, visible FAQ/schema agreement, valid internal targets and no duplicated HTML IDs. Images and external script references match baseline. No ordinary-webpage indexing request is claimed.

Browser preview uses the same source bytes in a local static preview. All four pages were checked at iframe viewport widths 375, 390 and 1440 pixels (12 cases); document scroll width did not exceed client width and new cards stacked on mobile. The 15px scrollbar accounts for the difference between iframe width and content client width. Menu opening/closing verified at WPC 390px. Local clean-route directory redirects drop query parameters; product prefill was therefore separately verified on the identical `contact.html` bytes with the query intact, including WPC, interior, wooden and hospital contexts. This preview routing difference is not a production-site fault. Real Formspree submission was not sent; inbox delivery remains unverified.

Status at this source commit: **已本地验证**. GitHub/Vercel production result and post-release checks must be appended in the PR release receipt, rather than treating code or a READY preview as live production.

## Index processing and review

GSC sitemap submission and URL Inspection remain blocked by property permissions. Existing robots allow Googlebot, Bingbot, OAI-SearchBot and ChatGPT-User on public pages while GPTBot/Google-Extended training blocks remain separate. No WAF change was needed or made. Four changed canonical URLs only become eligible for IndexNow after production HTTP/content verification; check the public key and recent history first. Acceptance will not be described as indexing.

Review 2026-12-05: compare finalized equal 28-day GSC page/query/country/device data once authorized; check commercial-page to RFQ progression and actual inquiries by product, use, quantity, destination, contactability and next action. Do not use button clicks as qualified leads. Next useful work: verified GSC access; model-specific technical evidence; further door-only competitor/AI prompt drill-down where evidence warrants a page change.
