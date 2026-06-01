# 🌿 Plant Doctor

> A mobile-first web app that identifies plants from photos and provides personalised nutritional recommendations — **no API key, no sign-up, no server required.**

**Live site:** https://sivahari1983.github.io/Plant-Docter/

---

## Overview

Plant Doctor lets you point your phone camera at any plant and instantly receive:

- The plant's common and scientific name
- A confidence score for the identification
- A full nutritional status report (Nitrogen, Phosphorus, Potassium, and key micronutrients)
- Fertiliser suggestions tailored to that plant species
- General care advice and visible deficiency symptoms to watch for

The entire identification runs inside your browser using **TensorFlow.js** and a pre-trained MobileNet model — your photos are never uploaded to any external service.

---

## Screenshots

| Capture | Analysing | Results |
|---|---|---|
| Point camera or upload a photo | AI model runs in-browser | Nutritional status + care tips |

---

## Features

- **No API key needed** — identification powered by TensorFlow.js MobileNet running entirely client-side
- **Camera capture** — opens the rear camera directly on mobile devices
- **Gallery upload** — supports JPEG, PNG, and WebP up to 5 MB
- **20+ plant species** in the nutritional database, including vegetables, fruit trees, herbs, flowers, and houseplants
- **Nutrient status cards** — colour-coded sufficient / low / deficient status for N, P, K, Fe, Mg, Ca, and more
- **Fertiliser recommendations** — specific product and amendment suggestions per species
- **Offline-capable** — after the first visit the AI model is cached by the browser; the app works without an internet connection
- **Mobile-first responsive design** — optimised for 375 px screens, scales to tablet and desktop
- **WCAG 2.1 AA accessible** — semantic HTML, ARIA labels, focus rings, minimum 44 px touch targets

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 6 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Icons | Lucide React |
| Plant identification | TensorFlow.js 4 + MobileNet v2 |
| Nutritional data | Static JSON database (client-side) |
| Fonts | Playfair Display · Nunito · JetBrains Mono (Google Fonts) |
| Deployment | GitHub Pages (`gh-pages` branch) |

---

## Project Structure

```
Plant Docter/
├── public/
│   └── plant.svg               # Favicon
├── src/
│   ├── components/
│   │   ├── CaptureScreen.jsx   # Home screen with camera & upload buttons
│   │   ├── LoadingScreen.jsx   # Animated scanning screen while AI runs
│   │   ├── ResultsScreen.jsx   # Plant name, nutrients, fertiliser tips
│   │   ├── ErrorScreen.jsx     # Friendly error state with retry
│   │   └── NutrientCard.jsx    # Reusable status card (sufficient/low/deficient)
│   ├── data/
│   │   └── plantNutrition.js   # Static plant nutritional database + lookup logic
│   ├── hooks/
│   │   └── usePlantAnalysis.js # TF.js MobileNet integration hook
│   ├── utils/
│   │   └── imageUtils.js       # File validation, base64 conversion, canvas resize
│   ├── App.jsx                 # Root component with useReducer state machine
│   ├── index.css               # Tailwind directives + custom animations
│   └── main.jsx                # React DOM entry point
├── index.html                  # Vite entry point
├── tailwind.config.js          # Custom color palette and font stack
├── vite.config.js              # base: './' for GitHub Pages compatibility
└── package.json
```

---

## How It Works

1. **User captures or uploads** a plant photo
2. The image is resized to a maximum of 1024 px (canvas-based, client-side)
3. **TensorFlow.js MobileNet** classifies the image into the top 5 ImageNet labels
4. The labels are matched against the **plant nutritional database** using keyword scoring
5. The matched entry's nutritional data is displayed — or a sensible generic fallback is shown
6. The AI model (~16 MB) is downloaded once from Google's CDN and cached permanently by the browser

> **First visit only:** model loading adds ~15–20 seconds on a slow connection. Every subsequent visit is instant.

---

## Supported Plant Categories

The nutritional database includes entries for:

- **Vegetables** — Tomato, Pepper, Cucumber/Squash, Broccoli/Cauliflower, Leafy Greens, Corn, Artichoke
- **Fruit** — Strawberry, Citrus (Lemon/Orange), Banana, Pineapple, Fig
- **Flowers** — Rose, Sunflower, Daisy/Marigold, Tulip/Lily, Orchid, Lotus/Water Lily, Hibiscus, Magnolia
- **Herbs & Aromatics** — Lavender, Bamboo
- **Cacti & Succulents** — Cactus, Succulent, Aloe
- **Indoor Plants** — Fern, Pothos, Monstera, Philodendron, Snake Plant, and other foliage houseplants
- **Trees** — Pine, Oak, Maple, Palm, and other woody plants
- **Fungi** — Mushrooms (with substrate nutrition guidance)
- **Fallback** — General advice when the plant is not specifically identified

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open http://localhost:5173 in your browser.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Deploying to GitHub Pages

```bash
# Build and deploy in one step
npm run build
npx gh-pages -d dist
```

The live site will update at https://sivahari1983.github.io/Plant-Docter/ within ~2 minutes.

`vite.config.js` uses `base: './'` so all asset paths are relative — compatible with any subdirectory GitHub Pages URL.

---

## Design Decisions

- **No backend / no API key** — the original design used the Anthropic Claude Vision API, but was rebuilt to use TensorFlow.js so the app works without any user credentials or ongoing API costs.
- **Static nutritional database** — plant nutrition data is well-established agronomic knowledge, so a curated static JSON is more reliable and faster than a live lookup.
- **MobileNet for identification** — trained on ImageNet, which includes hundreds of plant, flower, fruit, and vegetable classes. For unrecognised plants a confidence-aware fallback is shown rather than failing silently.
- **`base: './'` in Vite config** — required for GitHub Pages subdirectory hosting; all JS/CSS asset paths are relative rather than absolute.

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | Full (WebGL TF.js backend) |
| Safari 15+ (iOS & macOS) | Full |
| Firefox 90+ | Full |
| Older browsers | May fall back to CPU inference (slower) |

Camera capture (`capture="environment"`) works on all modern mobile browsers over HTTPS.

---

## License

MIT — free to use, modify, and distribute.

---

*Built with React, TensorFlow.js, and Tailwind CSS. Deployed on GitHub Pages.*
