# Assert Labs — Website

Production-ready static site. No build step, no framework runtime, no external
requests (fonts are self-hosted). Drag the folder onto any static host and it's live.

---

## Folder structure

```
assert-labs/
├── index.html              ← the page (all content lives here)
├── css/
│   ├── 01-tokens.css       ← design tokens: colors, fonts, spacing (edit brand HERE)
│   ├── 02-base.css         ← reset, typography, accessibility, reveal system
│   ├── 03-components.css   ← buttons, cards, plans, form, FAQ
│   └── 04-sections.css     ← nav, hero + console, ticker, footer
├── js/
│   └── main.js             ← animations & interactions (~150 lines, zero deps)
├── assets/
│   ├── fonts/              ← self-hosted variable fonts (woff2, ~130 KB total)
│   └── img/                ← favicon.svg, og-image.png, PWA icons
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md               ← you are here
```

## Tech decisions (and why)

| Choice | Reason |
|---|---|
| Static HTML/CSS/JS, no framework | A marketing page has no app state. Zero build = zero breakage, instant loads, editable by anyone. |
| Self-hosted variable fonts (via npm `@fontsource`) | No Google Fonts request → faster, GDPR-clean, works offline. One file per family. |
| Design tokens in `01-tokens.css` | Rebrand = change ~10 lines. Everything derives from tokens. |
| Vanilla JS, IntersectionObserver | All animations are scroll-driven and respect `prefers-reduced-motion`. |
| JSON-LD + OG + sitemap + manifest | Search and social previews work day one. |

**Fonts:** Bricolage Grotesque (display) · Inter (body) · JetBrains Mono (data/code).
**Palette:** Ink `#0A0D12` · Amber `#FFB224` · Pass `#12B76A` · Fail `#F5563F`.
Amber text on white uses `#8A5B00` for WCAG AA contrast.

---

## 🔴 Before launch — 6 edits

1. **Brand name** — search `Assert Labs` in `index.html` (title, nav, footer, JSON-LD, meta).
2. **Domain** — search `example.com` in `index.html`, `robots.txt`, `sitemap.xml`.
3. **Contact** — search `hello@assertlabs.com` and `+92 300` in `index.html`.
4. **Form backend** — in `js/main.js`, replace the submit handler:
   sign up at formspree.io (free), then on the `<form>` set
   `action="https://formspree.io/f/YOUR_ID" method="POST"` and delete the JS
   `submit` block. Two minutes.
5. **Rates** — confirm pricing section numbers are what you'll actually honor.
6. **Delete the amber demo bar** — remove the `<div class="notebar">…</div>` block
   at the top of `index.html`.

## Deploy (pick one, all free)

- **Netlify:** app.netlify.com → "Deploy manually" → drag the `assert-labs` folder. Done.
- **Vercel:** vercel.com → New Project → upload folder.
- **Cloudflare Pages:** dash → Pages → Upload assets.

Then point your domain in the host's dashboard (they issue HTTPS automatically).

## Editing content

All copy is in `index.html`, in reading order, with section comments
(`<!-- ===== SERVICES ===== -->` etc.). Prices are plain text inside
`.plan__p`. To add a real review later: copy a `.slot` block, remove the
`slot--live`/dashed styling by using class `slot slot--live`, and replace the text.

## House rules baked in

- Fully responsive: 360 px phones → tablets → desktop (grids collapse automatically).
- `prefers-reduced-motion` honored everywhere.
- Keyboard: skip-link, visible focus rings, semantic landmarks.
- No trackers, no cookies, no external calls.
