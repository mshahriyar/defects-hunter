# QA Report — assertlabs site v1.0

Tested: Aug 11, 2026 · Chromium 141 (Playwright) · Local static server
Result: **21 / 21 checks passed · axe-core: 0 accessibility violations**

## Functional
| Check | Result |
|---|---|
| No JS / console errors on load | ✅ |
| Single `h1`, valid title & meta | ✅ |
| All anchor links resolve to real sections | ✅ |
| Hero console rebuilds on "Run again", verdict stamp fires | ✅ |
| Pricing toggle: panels swap correctly both ways | ✅ |
| FAQ accordion: only one item open at a time | ✅ |
| Form: blocks empty submit (native validation) | ✅ |
| Form: graceful fallback message on non-Netlify host | ✅ |
| KPI counters animate to 0 / 74 / 11 / 1 | ✅ |
| Mobile menu: opens, closes on link tap, navigates | ✅ |

## Responsive
No horizontal overflow at **360 / 390 / 768 / 1024 / 1280 px**. Verified visually on
Desktop 1440, iPad Pro 11, iPhone 13 emulation.

## Accessibility (axe-core, WCAG 2.1 AA)
0 violations. Fixes applied during this pass:
- Muted grays darkened for AA contrast (`--mut-2`, `--mut-d2`)
- P1 tag → ink-on-red; money text → `--fail-ink` (AA on white)
- Footer heading order corrected (h2 → h3)
- Demo bar given a named landmark; decorative quotes `aria-hidden`
- Reduced-motion honored across all animations; keyboard skip-link + focus rings

## Known limitations
- Form posts only work on Netlify hosting (by design); local shows fallback.
- Netlify Forms free tier: 100 submissions/month.
- Screenshots/emulation ≠ real devices — do one pass on a physical phone after deploy.

## Bugs found & fixed during build
1. `hidden` attribute overridden by `display:grid` — both pricing panels visible (P1)
2. Hover indicator overlapped row numbers (P3)
3. 23 color-contrast failures below WCAG AA (P2)
