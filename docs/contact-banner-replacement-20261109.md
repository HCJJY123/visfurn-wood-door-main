# Contact banner replacement — 2026-11-09

## Request and boundary
Direct user request: replace all three `/contact` banners with the three supplied door-group images, remove Chinese and improve clarity, keeping every complete product visible. Start from production/main `b329acbfe3f208e33956b5617c07ecf9d0b75e5f`, Mike project `prj_gwcK8vPfKHEf3KIFfvG5YJlFvh7L`, READY `dpl_AVLVcfoKQXT4T93rtmuDbDTsSBAa`. Formal contact GET 200 matched main before editing. No unrelated open PR included.

## Assets and decisions
Built-in image editing cleaned the user references; these are enhanced reference visuals, not new factory/project evidence or measured product specifications. All Chinese/model captions and door-face Chinese removed. No added certification, price or capability claims. Visual review: 3 contemporary doors, 4 white doors, and 14 doors in 2 × 7 retained. Product details remain subject to sample/drawing confirmation; generated restoration is not recovery of original measured detail. Requested ideal 3840 width was not returned: actual native delivered widths are recorded below, not represented as 4K. Compared with the previous 640px banner files, these use materially larger sources. WebP encoding plus 768px delivery renditions; no product crop.

| ID | Supplied file | Edited image ID | Full asset / dimensions | Alt |
| --- | --- | --- | --- | --- |
| contact-modern-20261109 | ScreenShot_2026-11-09_144423_452@2x.png | exec-54f3836c-1056-4c2b-9251-471459b4e763 | assets/images/contact/contact-modern-door-collection-1859.webp / 1859×846 | Three full-height contemporary wood-grain door designs in taupe and gray |
| contact-white-20261109 | ScreenShot_2026-11-09_144803_698@2x.png | exec-e5087cc2-7aa2-439e-af50-a47c01df625e | assets/images/contact/contact-white-door-collection-1698.webp / 1698×926 | Four complete white interior door designs with frames and black handles |
| contact-wood-20261109 | ScreenShot_2026-11-09_144915_350@2x.png | exec-4a203673-41ab-4213-b3f8-0184b2342382 | assets/images/contact/contact-wood-door-collection-1612.webp / 1612×976 | Fourteen complete wooden door designs in wood-grain, red and ivory finishes |

All in Contact hero module. Purpose: show supplied selection groups naturally; mobile uses the whole group, no alternate crop. No generated image presented as real production, project or certification proof. No caption over products; actual image text removed. Replaced only Contact references to home/featured interior-room-640, modern-wooden-set-640 and steel-security-set-640; old files retained for other pages. Full prompt set: `docs/qa/contact-banner-prompts-20261109.json`.

## Implementation
- Separate original introductory copy from imagery; no dark overlay or text on door leaves.
- Contact-only responsive carousel: contained, centered images, intrinsic dimensions, responsive sources, image padding, control row outside images and 44px button targets.
- Preserve three slides, swipe/reduced-motion behavior; 6-second rotation, independent focus/hover pause; all selectors keyboard reachable, pressed state appropriate for buttons.
- Update Contact social-image references and only Contact sitemap lastmod. No new public URL or content/identity/terms changes.

## Validation
- Build passes (repository build is an explicit static/no-op command).
- Single H1/self canonical, unchanged two JSON-LD blocks parse; entire inquiry workspace, external script tags, Formspree/GTM and supply context byte-identical to baseline.
- All inline JS syntax checked; `git diff --check` passed.
- Existing inquiry mock and door-supply-context checks passed (all submissions mocked). No real inquiry sent; inbox delivery not tested.
- Actual browser: 1440/390/375px iframe widths, document client/scroll respectively 1425/1425, 375/375, 360/360. Native desktop 1348/1348. All three images loaded, computed contain, intro ends before imagery; full product groups inspected. All three selector buttons switch correctly, including Enter activation. Mobile navigation opens/closes via keyboard. No page horizontal overflow. Desktop full-page capture API omitted images despite correct DOM/native capture; not accepted as visual evidence.
- Production verification and IndexNow receipt will be added to the PR/daily record after release; this file alone is not a claim of formal deployment or indexing.

## Rollback and observation
Revert only this isolated PR if image or RFQ regression occurs; prior Mike production baseline above. No DNS/project/security/endpoint changes. Observe technical/image delivery now and seven days later; no ranking, AI recommendation or qualified-inquiry gain claimed. SEMrush service authorization issue remains independent and unresolved by this visual fix.
