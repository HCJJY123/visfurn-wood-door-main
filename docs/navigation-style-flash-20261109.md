# Navigation stylesheet flash repair — 2026-11-09

User reported all navigation submenus briefly spreading across the Products page before loading completed.

## Cause and changes

`setupSiteNavigation` changed the href of an already applied `global-ui.css` link to another query version. That removes its applied CSS during the second request; a load event alone did not prove that the rules for the new markup were applied. The resulting unstyled header exposed dropdown content and oversized icons.

- Never replace an applied stylesheet href.
- Reuse the applied shared styles when the explicit navigation readiness CSS property is present.
- For older cached CSS or pages without a direct shared stylesheet, append one versioned upgrade link while retaining the original styles and original navigation; initialize only after the readiness property is computed.
- Keep a usable original header when the upgrade fails; initialize the shared navigation once.
- Synchronize native hidden attributes with dropdown state and the mobile footer, with scoped CSS preserving hidden state.

## Verification

See `docs/qa/navigation-style-flash-20261109.json`. Real browser checks cover 1440 px desktop, 390 px mobile, a four-second upgrade delay with cached prior CSS, and a failed upgrade. All closed panels remained hidden; the original stylesheet URLs were retained; normal loads needed no extra navigation CSS request. Header height stayed at 101 px desktop and 79 px mobile, with no horizontal overflow. Desktop and mobile Products menus opened; mobile drawer and footer opened and closed normally.

Only shared UI JavaScript and its shared CSS change. No content, URL, form endpoint, inquiry handling, analytics, or SEO directives are changed. Preview-only QA fixtures are not deployed.

## Release

Base: `026ce0e2a84be6c951e75950a4088968739d483d`. Confirm main SHA, READY production deployment, formal domain asset hashes and rendered Products header after merge. Roll back this focused change using the pre-release production deployment or revert its commit.
