# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ locally at http://localhost:4173
npm run lint      # ESLint
npx gh-pages -d dist   # manual deploy to gh-pages branch (legacy; prefer git push to trigger CI)
```

There are no tests. The app cannot be opened directly as a file — it must be served (dev server or `preview`).

## Architecture

This is a **fully static, client-side React 18 + Vite 6 app** deployed to GitHub Pages. There is no backend. All external calls go directly from the browser to third-party APIs.

### Analysis pipeline (`src/hooks/usePlantAnalysis.js`)

The single hook drives the entire analysis flow in sequence:

1. **Image pre-processing** — `resizeImage()` caps the image at 1024 px before any API call.
2. **Pl@ntNet API** — multipart POST to `my-api.plantnet.org/v2/identify/all`. Returns ranked species matches with scientific taxonomy. Key is `VITE_PLANTNET_API_KEY`.
3. **`lookupPlant()`** (`src/data/plantNutrition.js`) — maps the PlantNet response to a static nutritional entry using scored keyword matching against genus, family, scientific name, and common names. Falls back to the `'unknown'` entry if no match scores > 0.
4. **Gemini 1.5 Flash API** — JSON POST to `generativelanguage.googleapis.com`. Receives the same resized image as base64 + species name. Returns structured health diagnosis (condition, symptoms, root causes, supplements, action plan). Key is `VITE_GEMINI_API_KEY`. This step is non-fatal — if it fails, species data still displays.

Gemini failure is intentionally silent (`console.warn` only); the results screen renders with `result.healthAnalysis === null` in that case.

### State machine (`src/App.jsx`)

`useReducer` manages five screens: `apikey → capture → loading → results | error`. The `initial` screen is determined at module load by checking `import.meta.env.VITE_PLANTNET_API_KEY || localStorage.getItem('plantnet_api_key')`.

### API key strategy

| Context | Source |
|---|---|
| Production (GitHub Pages) | Keys baked into JS bundle at build time via GitHub Actions secrets |
| Local dev | User enters key once into the `ApiKeyView` UI; stored in `localStorage` |

Keys are `VITE_PLANTNET_API_KEY` and `VITE_GEMINI_API_KEY`. Both must be present in GitHub repo secrets for CI to produce a working build. Local dev only needs PlantNet (Gemini degrades gracefully).

### Plant nutritional database (`src/data/plantNutrition.js`)

Static array of ~20 plant entries. Each entry has `keywords` (common names + genus + family names) used by `lookupPlant()`. Scoring is: exact keyword match = `word_count × 3`, substring match = `1`. The `'unknown'` entry is the fallback and must remain last.

To add a new plant: add an entry to the `entries` array with genus and family names as keywords (PlantNet returns scientific taxonomy, not common names).

### Design tokens

Custom Tailwind tokens are defined in `tailwind.config.js`. The palette uses `forest-*`, `sage-*`, `soil-*`, `cream-*`. Do not use raw hex values in components — use these semantic tokens. Fonts: `font-display` (Playfair Display), `font-sans` (Nunito), `font-mono` (JetBrains Mono), all loaded from Google Fonts in `src/index.css`.

### Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` with both secrets injected, then pushes `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages@v4`. The live site is at `https://sivahari1983.github.io/Plant-Docter/`. The `base: './'` in `vite.config.js` is required for the subdirectory path to work.
