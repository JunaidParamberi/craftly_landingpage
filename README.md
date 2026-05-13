# Craftly.AI Landing Page

Static HTML/CSS/JS landing page for [Craftly.AI](https://app.craftlyai.app/).

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option 1 — GitHub (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects a static site. No build settings needed.
4. Click **Deploy**.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## Project structure

```
index.html
css/styles.css
js/main.js
assets/         # logos & favicon
vercel.json     # Vercel static config + security headers
```

## Vercel settings

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Build Command | *(leave empty)* |
| Output Directory | *(leave empty — files at root)* |
| Install Command | *(leave empty)* |
