# Homepage PageSpeed improvements

Baseline production: 750891f0f7e8e04174b998314be3df68e154fce5.

Official PageSpeed baseline 2026-10-21: mobile 58/96/100/100, desktop 72/96/100/100 (performance/accessibility/best-practices/SEO).

Changes: preload the actual first-showroom hero, rather than a different unused project picture; defer parsing of the existing main script until HTML is parsed; improve small-text contrast on the homepage. GTM/GA, inquiries, WhatsApp, product content, commercial claims, routes and indexing remain unchanged. PR135 is not part of this branch.

Tests and Preview verification pending. No production deployment from this branch yet.
