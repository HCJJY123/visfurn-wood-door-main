# Projects restoration and five-page layout — 2026-11-09

## User request and current source
Restore the sparse Projects page, integrate the existing AI-search/SEO growth plan, and reduce oversized typography on the Products index and the three project-menu destinations: Hotel Door Package, Apartment Door Package and Hospital Door Planning. The screenshot identifies the Projects submenu; these exact three URLs are the scope. Base main: `2621f9e9b04a463d0f43e0877a31247767da2b06`, including the published navigation flash repair. Open PR195 and older drafts were reviewed and not merged or copied over main.

Read the current VISFURN daily automation `6ac89276bc048191b5b2f29dbb2a994e`, its growth-board tasks and daily record, Four_Sites_AI_Growth_Plan_20261108.md version 0 (126 lines), and the repository's 11/07–11/09 research/implementation records. No automation created, run or rescheduled. The 11/08 three core categories retain their original observation windows; no reset of the 30/60/90-day plan.

## Evidence and decision
The live Projects HTML matched main and had zero project cards and zero main-content images. PR182 replaced a 20-card illustrated library with procurement paragraphs on 11/05. All source images and archived case files remained available. This is the directly observed content/UX bottleneck; restoration has priority over creating country pages or another generic blog.

SEMrush fresh attempt: the exact required proxy `https://zh-d-semrush-d-com-s-sem.d.taobao-seo.com/home/` returned a rendered `401 登录已失效, 请重新登陆`. Its normal link opened the login form at d.taobao-seo.com; the authorized taobao-seo.com dashboard also showed login. No credentials were inspected or entered, and no protection was bypassed. Fresh report/AI prompt research remains blocked; no new volumes, rankings, traffic or AI mentions are claimed. Existing 11/09 Trudoor page/keyword/Gemini evidence on the growth board and 11/07 repository evidence remain historical inputs, not this run's new data.

Fresh primary-page checks: Trudoor's commercial wood-door page still organizes selection by finish/construction, explains hardware preparation and links to configuration/quotation. Use that organization, not its US origin, prices, clearance deductions or ratings. Dortek's public healthcare page returned 403 in the reader; no fresh healthcare metrics or claims were obtained. Google Search Central's AI optimization guide was read for consistent indexable text, internal discovery and structured-data scope; no special markup or recommendation guarantee is asserted.

Sources:
- https://www.trudoor.com/collections/commercial-wood-doors
- https://dortek.com/product-sector/healthcare-doors/
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://github.com/HCJJY123/visfurn-wood-door-main/pull/182

Opportunity order: (1) restore the missing visual procurement library; (2) fix five-page display hierarchy and the three project-guide reading paths; (3) clarify complete-set scope, dimensions, hardware, samples and packing with contextual RFQs; (4) obtain fresh SEMrush/GSC and assess outcomes; (5) defer new country/duplicate keyword pages because current evidence does not justify them.

## Implemented experience
- `/projects`: 20 illustrated planning cards, seven functioning filters, three prominent application guides, application/supply-scope comparison, four coordination steps, four buyer FAQs, factory-photo and RFQ routes. The 20 examples are described as planning resources; there is no claim that they represent 20 delivered customer projects.
- Three existing submenu destinations: replace long display-style case headers with two-column procurement guides; 40px desktop / 30px mobile H1, 28px maximum section headings, readable 16px copy, a specification table, a contents list, RFQ checklist, four native FAQs, and related commercial/guide links. Hotel/apartment each retain three distinct existing illustrative pictures; hospital uses two. Rewritten content does not reproduce unverified order counts, freight capacity, delivery periods or performance claims. Superseded large archive notices on the two fully rewritten pages are replaced by a relevant guide/illustration note in the content.
- `/products`: 44px maximum desktop / 32px mobile H1, 24–30px category headings, tighter category cards, reduced spacing and contextual links to Projects and the three guides. Existing category answers and FAQ content are preserved.
- Images are displayed with contain, never stretched or cropped by the new layout. Three previously large PNG library images have full-frame 720px WebP derivatives, 127,942 bytes total. Existing assets are retained. All 23 hub images are distinct; no generated picture is introduced or represented as an actual project.
- Preserve shared header/footer markup, `assets/main.js`, contact form, Formspree, GTM/GA/Ads, company identity and the navigation flash repair. No real test inquiry.

## SEO and AI-search intent mapping
| Existing URL | Intent and natural terms | Role |
|---|---|---|
| /projects | project door packages; interior, wooden and WPC doors; door schedule; bulk quotation | Illustrated application/procurement hub |
| /products | door categories; interior door supplier; WPC, wooden, hotel, hospital doors | Commercial category selection, existing H1 retained |
| /case-study/mexico-boutique-hotel-moisture-resistant-bathroom-doors | hotel door package; guestroom doors; WPC bathroom doors; electronic-lock preparation | Specific hotel procurement guide, illustrative Mexico setting |
| /case-study/philippines-apartment-interior-wpc-door-package-humid-project | apartment door package; interior door sets; WPC bathroom doors; jamb depth; handing | Specific apartment procurement guide, illustrative Philippines setting |
| /case-study/hospital-door-package-specification-planning | hospital door package; room-zone schedule; clear opening; vision panel; hardware | Hospital planning framework, not a specialist rating claim |

Unique visible H1s, accurate title/descriptions, self canonicals, visible FAQ/schema agreement, stable organization ID and breadcrumbs. Hub has CollectionPage/ItemList; guides use Article/FAQPage. No Product Offer, reviews, rating or certified-performance entities. Two formerly noindex guides are now substantive original planning resources; only these two change robots to index. The other archived case pages keep their existing noindex/state and exclusions. The three rewritten existing guide URLs enter the sitemap; only five affected URL lastmods change. AI-readable llms.txt points to this same visible planning content; it is not a substitute for indexation. Commercial-category intent remains on existing products pages, with guide↔hub↔category links and source-aware RFQ URLs.

## QA and release
Static HTML, one H1/self canonical, JSON-LD, four FAQs per rewritten page, unique IDs, all added local links/anchors, distinct image references, unchanged header/footer, and sitemap uniqueness checked. Static build is a no-op; JS checks and existing fully mocked inquiry/supply-context tests pass. Real browser 1440/390/375px × five pages: all 15 document widths equal scroll widths, images loaded and use contain; header panels stay closed. H1s: Projects 44/30, Products 44/32, three guides 40/30. Filters: hotels 2 of 20, all 20 of 20; mobile native FAQ opens; hotel RFQ contains product and exact source path. Source/static/browser records are under docs/qa/projects-restoration-*-20261109.json.

Production result must be recorded in the PR receipt after merge, formal-domain bytes, page content, images and RFQ checks. A preview or merged commit alone is not a release. Rollback: revert this isolated PR against current main, retaining later unrelated changes. Existing public IndexNow key may notify only the five material canonical updates after release, once; acceptance is not indexation. Google URL Inspection, selected canonical, fresh 28-day performance, inbox delivery and qualified inquiry impact remain unverified.

## Long-term continuation
This release's technical/crawl review: 2026-11-16; indexation/query review: 11/23; complete 28-day outcome review: 12/07, through existing tasks/board, without creating reminders. Prior 11/08 category dates 11/15, 11/22 and 12/06 remain. Measure Projects→guide→product/RFQ progression, relevant queries and actual qualified inquiries/quotation progression. No current lead baseline or forecast is invented.


## Final production RFQ follow-up

PR203 production rendered correctly, but its three guide CTA parameters used display labels rather than the contact form's existing product slug allowlist. A focused follow-up changes only these link values: Hotel+Doors → hotel-doors; Interior+Doors → interior-doors; Hospital+Doors → hospital-doors. Both CTAs per guide retain the encoded case-study source_page and #quote-form anchor. Generic Projects CTAs now use the supported inquiry_purpose=specification-review parameter without selecting a door category on the buyer's behalf.

No contact form, mail endpoint, tracking controller or global navigation code is changed. The existing check-door-supply-context script passes. Production click-through verification is required after this follow-up deploys; no real inquiry is sent.
