# VISFURN growth run — 2026-11-12 (Asia/Shanghai)

## Scope and continuity

- Site: `https://www.visfurn.com/` only. No other site, DNS, tracking, form endpoint or company identity was changed.
- Starting `main`: `3a105c3a84cb327bdeaaed8449412b8e5ac7d108` (PR #210).
- The current four-site plan and the 11 November SEMrush catch-up record were read before selecting work. The 8–30 day phase continues from 8 November; the 90-day plan was not restarted.
- The 8 November first batch is still scheduled for 15 November (technical/crawl), 22 November (early query/index) and 6 December (complete 28-day outcome). No result is claimed before those windows mature.

## Evidence boundary

### Current SEMrush attempt

The required gateway flow was opened on 12 November 2026 through `https://gwt.tuanai.me/`, which routed to `https://taobao-seo.com/#/`. The cloud browser reached the activation-code login screen and did not inherit the authorised 11 November session. No code was available in this run, no protection was bypassed and no subscription was purchased. Therefore the current-run SEMrush subtask is **blocked / incomplete**. No public search or model recollection is presented as a replacement.

### Reused recent comparable SEMrush snapshot

The independently executable change uses the saved 11 November evidence, which was collected through the specified SEMrush proxy `https://zh-d-semrush-d-com-s-sem.taobao-seo.com/home/` in the US database; desktop was recorded where displayed and report dates were 9–10 November 2026. Relevant observed values were:

| Query / prompt | Observed source and value | Use in this run |
|---|---|---|
| `hospital doors` | US volume 1,000; KD 13; CPC USD 3.01; informational | Confirms a broad category, not a conversion forecast. |
| `healthcare doors` | US volume 140; KD 13; CPC USD 2.28 | Supports clearer healthcare opening segmentation. |
| `hospital door supplier` | Volume 40; KD and intent unavailable | Treated only as a buyer-path candidate. |
| `Can you recommend suppliers for hospital ICU doors in the UK?` | Prompt listed in Dortek AI view | Supports answering ICU procurement inputs; does not prove VISFURN recommendation or citation. |
| `Can you recommend the best brands for operation theatre doors?` | Prompt listed in Dortek AI view | Supports separating operating-theatre openings; no brand/claim copied. |

The full AI answer/citation view failed after a reload on 11 November. Its reply, citations and recommendation sentiment remain unavailable. Dortek is included only as a healthcare-door information-organisation reference; its GRP construction, certifications and performance claims are excluded from VISFURN facts.

### First-party and indexing limits

- The connected GSC content-planner channel again lists `https://www.visfurn.com/` as `siteUnverifiedUser`, with three-day free access and no comparison. Account/list-site calls returned `INVALID_ARGUMENT`. This does not prove zero traffic or an indexing fault and does not establish the requested account identity.
- Fresh 28-day GSC page/query/country/device data, URL Inspection, selected canonical, Google sitemap write access, GA4/Clarity and qualified-inquiry outcomes were not available. No ranking, traffic, AI citation or lead uplift is claimed.
- Before editing, the two sampled product pages, robots and sitemap were HTTP 200 and byte-identical to starting `main`. This is a production/version baseline, not an index-status result.

## Opportunity ranking and choice

1. **Hospital room-zone RFQ and specialist-opening clarification — selected.** Strongest product/query fit, recent observed buyer prompts and an existing guide capable of a deep update without a new thin URL.
2. **8 November batch technical/crawl observation — retained, not executed early.** First due date is 15 November; current HTTP/source parity is only a baseline.
3. **Real configuration evidence for specialist hospital openings — dependent.** Requires real drawings, test/technical documents or authorised product evidence; no AI image or unverified performance claim was added.
4. **Fresh GSC demand/index diagnosis — blocked.** Minimum recovery condition: verified readable VISFURN property under the requested account with report/Inspection access.
5. **Country or near-duplicate hospital pages — rejected.** No independent market evidence or local procurement substance supports them in this run.

## Implemented actions

### 1. Deepened the existing English buyer guide

URL: `/blog/hospital-door-rfq-checklist-hygiene-hardware-vision-panels`

- Kept the existing canonical, title and H1 to avoid a competing thin article.
- Added a five-row room-zone decision matrix for wards, corridors, laboratory/clean-support rooms, ICU/operating-theatre openings and imaging/shielded rooms.
- Added supplier-response controls: one response per door mark, included scope, assumptions, exclusions, available evidence and separate commercial/technical status.
- Added an ICU/operating-theatre FAQ, updated the universal-specification answer and kept visible FAQ text exactly aligned with FAQ JSON-LD.
- Updated the meta description and Article `dateModified` to 2026-11-12.
- Routed guide quotation CTAs to Contact with `product=hospital-doors` and the guide `source_page`; no form submission was sent.

Intent: hospital-door procurement teams preparing schedules and supplier RFQs, especially specialist ICU/operating-theatre openings where configuration-specific review and evidence are needed.

### 2. Corrected the hospital category’s broad ICU/clean-room wording

URL: `/products/hospital-doors`

The former unconditional “Yes” answer was replaced in both visible content and FAQ schema. The new answer requires the room function, movement, pressure/sealing criteria, automation interfaces and requested evidence, and states that a category or product image does not establish suitability. No certification, performance, lead time, capacity, price or project claim was added.

### 3. Updated discovery metadata

Only the two substantively updated canonical URLs received `2026-11-12` sitemap `lastmod` values. No new URL was created. Existing real/labelled visuals were retained; no image was generated because a room-zone table and text provide the needed decision aid without pretending to be project evidence.

## Validation

- Static build/no-op: pass.
- `assets/main.js` syntax: pass.
- Mocked inquiry submit and source-attribution checks: pass; no external POST.
- Door-supply and core model context checks: pass.
- Changed pages: one H1, self-canonical, index-allowed/default, valid JSON-LD, valid local links: pass.
- Five visible guide FAQs equal FAQ schema byte-for-byte at the question/answer level: pass.
- Hospital category corrected answer occurs in visible content and schema; old broad answer absent: pass.
- Existing media and executable scripts on both pages unchanged: pass.
- Sitemap XML: 154 unique URLs; both target `lastmod` values correct: pass.
- Article body: 1,579 English words after update.
- Forbidden historic-name scan of publishable HTML: pass.
- `git diff --check`: pass.
- Existing `scripts/check-hospital-quote-context.cjs`: fails on unchanged `main` because it treats generic header/footer `/contact#quote-form` links as hospital-specific. A targeted check of the six actual `product=hospital-doors` links passed. The unrelated legacy assertion was not altered in this content change.

Rendered desktop/mobile and production verification are recorded with the release receipt after deployment. IndexNow is eligible only for the two updated canonical URLs after exact public verification. Google sitemap/Inspection remains blocked; notification acceptance will not be described as indexing.
