# CraftlyAI landing page (craftlyai.app)

Next.js (App Router) site deployed on Vercel project `craftly-landingpage` (craftlyai.app, www.craftlyai.app).

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## How the page is made
- The design lives in the "CraftlyAI Landing Page" design canvas (Landing3, "Full page v3 · final").
- `design/Landing3.dc.html` is a copy of that design file. `scripts/dc2jsx.py` turns it into:
  - `app/landing.tsx` — the page as one React component (hero live-app demo, tour tabs, pricing toggle, mobile menu)
  - `app/globals.css` — keyframes, hover states, phone rules
- After changing the design: copy the new design file to `design/`, then
  `python3 scripts/dc2jsx.py design/Landing3.dc.html app` and rebuild. Small copy fixes can also be made directly in `app/landing.tsx`.
- Media: `public/media/` (product film + poster), `public/assets/` (logo), `public/fonts/` (Chillax).
- SEO/share card: `app/layout.tsx` (title, description, Open Graph image).

Note: after regenerating, keep `.nav-links{display:none!important}` in the phone media query of `app/globals.css`.
