# Taste or Shape?

A tiny static meme site: enter your name, flip through 25 suspiciously shaped foods (hot dogs, sausages, bananas, and friends), and learn whether you like each one **for the taste** or **for the shape**.

No database. No auth. No APIs. Just a Vite + React front end you can host anywhere static files go.

## Rules

- Each name gets a **deterministic** taste/shape pick per food (same name → same results).
- If the name **starts with D** (any case), every food is **because of the shape**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://127.0.0.1:4177`).

```bash
npm run build
npm run preview
```

## Deploy

Build with `npm run build` and serve the `dist/` folder on any static host (Cursor Apps, Netlify, Cloudflare Pages, GitHub Pages, S3, etc.). No env vars or backend required.

## Photos

Food photos are resized thumbnails from [Wikimedia Commons](https://commons.wikimedia.org/) (various free licenses). See file titles on Commons for attribution if you redistribute commercially.
