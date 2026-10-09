# VISFURN SEO operations log

This file records material, evidence-backed changes so later maintenance cycles can avoid repeating or reversing work without new evidence.

| Date (UTC) | Website / URL | Issue and evidence | Change | Status / version | Review metric and date |
| --- | --- | --- | --- | --- | --- |
| 2026-10-09 | `https://www.visfurn.com/case-study/hospital-door-package-specification-planning` | Public crawl found two canonical tags on one indexable page. | Removed the duplicate canonical; retained the absolute self-canonical. | Local validation passed; release pending. | Re-crawl canonical after deployment; review GSC URL inspection when property access is restored. |
| 2026-10-09 | `https://www.visfurn.com/us/prehung-interior-door-sets` | Visible `{{LEAD_TIME}}` and `{{SETS_PER_40HQ}}` placeholders; fixed MOQ and “Factory Direct” claims were not supported by the available project records. | Removed placeholders and unsupported fixed claims; aligned visible FAQ and FAQPage data; clarified RFQ inputs and container-planning dependency. | Local validation passed; release pending. | Check impressions, clicks, CTR and qualified RFQs after two complete 28-day periods; inspect URL after GSC verification. |
| 2026-10-09 | `https://www.visfurn.com/fr/blocs-portes-interieures` | French page contained Spanish specifications, applications, badges and FAQ/FAQPage content; fixed MOQ and manufacturer wording lacked current evidence. | Rewrote mixed sections in French; aligned metadata, visible FAQ and structured data; removed unsupported fixed claims. | Local validation passed; release pending. | Check index status and French-query relevance after two complete 28-day periods. |
| 2026-10-09 | `https://www.visfurn.com/ru/mezhkomnatnye-dveri` | Russian page contained Spanish content and Mongolia-specific shipping terms; fixed MOQ and factory wording lacked current evidence. | Rewrote mixed sections in Russian; replaced the wrong market route with project-specific shipping inputs; aligned metadata, FAQ and schema. | Local validation passed; release pending. | Check index status and Russian-query relevance after two complete 28-day periods. |
| 2026-10-09 | Entrance, hotel, WPC and US market hub pages | Crawl anchor graph found four commercially relevant pages without ordinary HTML inbound links. | Added contextual links from the matching commercial/category hub to the apartment entrance, hotel STC, WPC sourcing and US prehung pages. | Local validation passed; release pending. | Re-crawl inbound-link count after deployment; compare discovery/index status after GSC access is restored. |

## Evidence boundary

- Crawl baseline: all 138 sitemap URLs returned HTTP 200 on 2026-10-09; conclusions about orphan pages came from an HTML anchor-link crawl, not Google crawl data.
- Google Search Console property `https://www.visfurn.com/` was visible but not verified/readable in the connected account, so no GSC performance or URL inspection data was used in this cycle.
- Bing Webmaster API access was not configured. The existing verified IndexNow key was used for recent URL submission; an accepted submission is not evidence of indexing.
- No new images were required. Existing images were retained and no generated visual is presented as factory, product-delivery or certification evidence.
