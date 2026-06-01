# Plant Doctor

A mobile-responsive web app that identifies plants from photos and provides personalized nutritional recommendations.

## Features
- Camera capture or gallery upload
- AI-powered plant identification (Claude Vision)
- Nutritional needs analysis (N, P, K, Fe, Mg, Ca)
- Fertilizer and care recommendations
- API key stored locally in your browser — no server involved

## Setup
1. Get an [Anthropic API key](https://console.anthropic.com)
2. Visit the app and enter your key when prompted
3. Point your camera at a plant!

## Local Development
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
```bash
npm run build
# Then push the dist/ folder to your gh-pages branch, or use the GitHub Pages action.
```

The `vite.config.js` uses `base: './'` so all asset paths are relative — suitable for any subdirectory deployment.
