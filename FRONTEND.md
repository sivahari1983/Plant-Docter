# Plant Doctor — Frontend Summary

> The Implementation Agent should read this file first before DESIGN_SPEC.md.

---

## Tech Stack

| Layer | Choice | Version |
|---|---|---|
| UI Framework | React | 18.x |
| Build Tool | Vite | 5.x |
| Styling | Tailwind CSS | 3.x |
| Icons | lucide-react | latest |
| HTTP Client | native fetch (no extra lib) | — |
| State | React useState / useReducer | built-in |
| Image handling | FileReader API + HTMLCanvasElement | built-in |

No router is needed — the app is a single-page multi-view experience managed with a top-level `view` state variable.

---

## Color Tokens

These are defined in `tailwind.config.js` under `theme.extend.colors` and used as Tailwind utility classes throughout the app.

| Token name | Hex | Usage |
|---|---|---|
| `forest-900` | `#1A3D2B` | Primary headings, logo text |
| `forest-700` | `#2D6A4F` | Primary buttons, active states |
| `forest-500` | `#52B788` | Accents, icons, success states |
| `forest-200` | `#B7E4C7` | Chip backgrounds, subtle highlights |
| `forest-50` | `#F0FAF4` | Card backgrounds, surface tint |
| `soil-800` | `#5C3D2E` | Warning/deficiency text |
| `soil-500` | `#A0522D` | Micro-nutrient badges |
| `soil-200` | `#E8C9B0` | Warning chip backgrounds |
| `soil-50` | `#FDF6F0` | Warm page background alternative |
| `cream-100` | `#FAFAF5` | Default page background |
| `cream-300` | `#EDE8D5` | Dividers, input borders at rest |
| `slate-600` | `#475569` | Body text (Tailwind default) |
| `slate-400` | `#94A3B8` | Placeholder / muted text |

---

## Font Stack

Loaded via Google Fonts `<link>` in `index.html`.

| Role | Family | Weights |
|---|---|---|
| Display / Logo | `Playfair Display` | 700 |
| Headings (h1–h3) | `Nunito` | 600, 700 |
| Body / UI | `Nunito` | 400, 500 |
| Monospace (confidence %) | `JetBrains Mono` | 400 |

Tailwind config maps:
- `font-display` → `'Playfair Display', Georgia, serif`
- `font-sans` → `'Nunito', system-ui, sans-serif`
- `font-mono` → `'JetBrains Mono', monospace`

---

## Key Tailwind Config Additions

```js
// tailwind.config.js (abbreviated)
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { forest: {...}, soil: {...}, cream: {...} },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'Nunito'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem', '3xl': '2rem' },
      boxShadow: {
        card: '0 2px 16px 0 rgba(26,61,43,0.08)',
        'card-hover': '0 4px 24px 0 rgba(26,61,43,0.14)',
        fab: '0 4px 14px 0 rgba(45,106,79,0.35)',
      },
    },
  },
  plugins: [],
}
```
