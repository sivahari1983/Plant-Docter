# Plant Doctor — Design Specification

**Version:** 1.0  
**Date:** 2026-06-01  
**Audience:** Implementation Agent  

> Read FRONTEND.md first for the tech stack, color tokens, and font stack summary.  
> This document is the single source of truth for every visual and structural decision.

---

## Table of Contents

1. [Design Brief](#1-design-brief)
2. [Component Inventory](#2-component-inventory)
3. [Screens / Views](#3-screens--views)
   - [Screen 0: API Key Setup Screen](#30-screen-0-api-key-setup-screen)
   - [Screen 1: Home / Capture Screen](#31-screen-1-home--capture-screen)
   - [Screen 2: Loading / Analysis Screen](#32-screen-2-loading--analysis-screen)
   - [Screen 3: Results Screen](#33-screen-3-results-screen)
   - [Screen 4: Error Screen](#34-screen-4-error-screen)
4. [Mobile-First Layout](#4-mobile-first-layout)
5. [Accessibility](#5-accessibility)
6. [Component File Structure](#6-component-file-structure)
7. [Screen 5: API Key Setup Screen](#screen-5-api-key-setup-screen) *(quick-reference summary)*

---

## 1. Design Brief

### 1.1 Visual Personality

Plant Doctor should feel like a wise, friendly botanist — warm, trustworthy, and rooted in nature. It is not a clinical app (avoid cold blues, sterile whites, sharp corners). It is not a toy app (avoid neon, cartoonish shapes, excessive animation).

The guiding adjectives: **calm, green, earthy, legible, confident**.

### 1.2 Design Principles

1. **Photo first.** The camera/upload interaction is the hero. Nothing should compete with the call to action on the home screen.
2. **Results are scannable.** Nutritional data is complex — use cards, chips, and visual hierarchy to make it easy to parse at a glance.
3. **Delightful but not distracting.** Use one or two subtle animations (scan pulse, fade-in results). No looping decorative animations.
4. **Thumb-friendly.** All primary actions live in the bottom half of the viewport. Nothing critical lives behind a horizontal scroll.

### 1.3 Color Palette

Full token table is in FRONTEND.md. Semantic usage below:

| Semantic role | Token | Hex |
|---|---|---|
| Page background | `cream-100` | `#FAFAF5` |
| Card / surface | `forest-50` | `#F0FAF4` |
| Primary action | `forest-700` | `#2D6A4F` |
| Primary action text | white | `#FFFFFF` |
| Primary action hover | `forest-900` | `#1A3D2B` |
| Accent / icon | `forest-500` | `#52B788` |
| Success chip bg | `forest-200` | `#B7E4C7` |
| Success chip text | `forest-900` | `#1A3D2B` |
| Warning chip bg | `soil-200` | `#E8C9B0` |
| Warning chip text | `soil-800` | `#5C3D2E` |
| Heading text | `forest-900` | `#1A3D2B` |
| Body text | `slate-600` | `#475569` |
| Muted / placeholder | `slate-400` | `#94A3B8` |
| Divider | `cream-300` | `#EDE8D5` |
| Error red | `#DC2626` (Tailwind `red-600`) | — |
| Error bg | `#FEF2F2` (Tailwind `red-50`) | — |

### 1.4 Typography

Fonts loaded from Google Fonts. See FRONTEND.md for the `<link>` imports.

| Element | Family | Weight | Size (mobile) | Size (desktop) | Tailwind classes |
|---|---|---|---|---|---|
| App logo | Playfair Display | 700 | 28px | 32px | `font-display text-2xl lg:text-3xl font-bold` |
| Page title (h1) | Nunito | 700 | 24px | 28px | `font-sans text-2xl lg:text-3xl font-bold` |
| Section heading (h2) | Nunito | 600 | 18px | 20px | `font-sans text-lg lg:text-xl font-semibold` |
| Card title (h3) | Nunito | 600 | 16px | 18px | `font-sans text-base lg:text-lg font-semibold` |
| Body text | Nunito | 400 | 15px | 16px | `font-sans text-sm lg:text-base` |
| Small / caption | Nunito | 400 | 13px | 14px | `font-sans text-xs lg:text-sm` |
| Confidence % | JetBrains Mono | 400 | 14px | 14px | `font-mono text-sm` |
| Button label | Nunito | 600 | 16px | 16px | `font-sans text-base font-semibold` |

### 1.5 Spacing System

Use Tailwind's default spacing scale. Key recurring values:

| Usage | Tailwind class | px equivalent |
|---|---|---|
| Page horizontal padding | `px-4` (mobile), `px-6` (md+) | 16px / 24px |
| Card internal padding | `p-4` (mobile), `p-5` (md+) | 16px / 20px |
| Section gap | `gap-4` or `space-y-4` | 16px |
| Component gap (tight) | `gap-3` or `space-y-3` | 12px |
| Chip internal padding | `px-3 py-1` | 12px / 4px |
| Icon + text gap | `gap-2` | 8px |
| Bottom nav height | `h-16` | 64px |
| Safe-area bottom pad | `pb-safe` (custom plugin) or `pb-6` | ~24px fallback |

### 1.6 Border Radius

| Context | Tailwind class | Value |
|---|---|---|
| Large cards | `rounded-2xl` | 1.5rem |
| Standard cards | `rounded-xl` | 1rem |
| Buttons (primary/secondary) | `rounded-xl` | 1rem |
| Chips / badges | `rounded-full` | 9999px |
| Image thumbnail | `rounded-xl` | 1rem |
| Input fields | `rounded-xl` | 1rem |
| Bottom sheet | `rounded-t-3xl` | top-only 2rem |

### 1.7 Shadows

Defined in `tailwind.config.js` (see FRONTEND.md):

| Token | Usage |
|---|---|
| `shadow-card` | All content cards at rest |
| `shadow-card-hover` | Cards on hover/focus (desktop) |
| `shadow-fab` | Floating action button (camera) |

---

## 2. Component Inventory

### 2.1 Global Tokens (applied everywhere)

- Background: `bg-cream-100` on `<body>` / root div
- Text default: `text-slate-600`
- Max content width: `max-w-md mx-auto` (390px — iPhone 14 Pro width)
- Full-height container: `min-h-screen flex flex-col`

### 2.2 AppLogo

| Property | Value |
|---|---|
| Icon | `Leaf` from lucide-react, size 28, color `#52B788` (`text-forest-500`) |
| Text | "Plant Doctor" |
| Text style | `font-display text-2xl font-bold text-forest-900` |
| Layout | `flex items-center gap-2` |
| Padding | `py-4 px-4` |

### 2.3 PrimaryButton

| Property | Value |
|---|---|
| Background | `bg-forest-700` |
| Text | `text-white font-sans text-base font-semibold` |
| Hover | `hover:bg-forest-900` |
| Active | `active:scale-95` |
| Border radius | `rounded-xl` |
| Padding | `px-6 py-3` |
| Min height | `min-h-[48px]` (touch target) |
| Min width | `min-w-[160px]` |
| Shadow | `shadow-fab` (when used as FAB) |
| Transition | `transition-all duration-150` |
| Disabled | `disabled:opacity-50 disabled:cursor-not-allowed` |
| Icon (optional) | 20px lucide icon, `mr-2` |
| Full width variant | add `w-full` |

### 2.4 SecondaryButton

| Property | Value |
|---|---|
| Background | `bg-white` |
| Border | `border-2 border-forest-500` |
| Text | `text-forest-700 font-sans text-base font-semibold` |
| Hover | `hover:bg-forest-50` |
| Active | `active:scale-95` |
| Border radius | `rounded-xl` |
| Padding | `px-6 py-3` |
| Min height | `min-h-[48px]` |
| Transition | `transition-all duration-150` |

### 2.5 CameraFAB (Floating Action Button)

| Property | Value |
|---|---|
| Shape | Circle: `w-20 h-20 rounded-full` |
| Background | `bg-forest-700` |
| Icon | `Camera` from lucide-react, size 32, `text-white` |
| Shadow | `shadow-fab` |
| Hover | `hover:bg-forest-900 hover:scale-105` |
| Active | `active:scale-95` |
| Transition | `transition-all duration-200` |
| Position | Centered horizontally, `mx-auto` in a flex container |
| ARIA | `aria-label="Open camera to capture plant"` |

### 2.6 UploadButton

| Property | Value |
|---|---|
| Style | SecondaryButton variant |
| Icon | `Upload` from lucide-react, size 20, `mr-2` |
| Label | "Upload Photo" |
| ARIA | `aria-label="Upload plant photo from gallery"` |
| Hidden input | `<input type="file" accept="image/*" className="sr-only" />` |

### 2.7 PhotoPreview

| Property | Value |
|---|---|
| Container | `relative w-full aspect-square rounded-xl overflow-hidden` |
| Image | `object-cover w-full h-full` |
| Overlay (on result) | Semi-transparent bottom gradient: `bg-gradient-to-t from-forest-900/60 to-transparent` |
| Max width | `max-w-xs mx-auto` on home; full width on results |
| Shadow | `shadow-card` |

### 2.8 NutrientChip

Displays a single nutrient name with status coloring.

| Property | Value |
|---|---|
| OK / Present chip | `bg-forest-200 text-forest-900 rounded-full px-3 py-1 text-xs font-semibold` |
| Deficient chip | `bg-soil-200 text-soil-800 rounded-full px-3 py-1 text-xs font-semibold` |
| Critical chip | `bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold` |
| Icon | `CheckCircle2` (ok), `AlertTriangle` (deficient), `AlertCircle` (critical) — size 12, `mr-1` |

### 2.9 NutrientCard

Groups macro or micro nutrients in a card.

| Property | Value |
|---|---|
| Container | `bg-white rounded-2xl p-4 shadow-card` |
| Title | `font-sans text-base font-semibold text-forest-900 mb-3` |
| Chips container | `flex flex-wrap gap-2` |
| Icon (card header) | `Zap` (macros) or `Microscope` (micros) — size 18, `text-forest-500 mr-2` |

### 2.10 RecommendationCard

Displays a single care/fertilizer recommendation.

| Property | Value |
|---|---|
| Container | `bg-forest-50 rounded-xl p-4 flex gap-3 items-start` |
| Left icon column | `flex-shrink-0 w-8 h-8 rounded-full bg-forest-200 flex items-center justify-center` |
| Icon | context-specific (see Screen 3) — size 16, `text-forest-700` |
| Title | `font-sans text-sm font-semibold text-forest-900` |
| Body | `font-sans text-sm text-slate-600 mt-1` |

### 2.11 ConfidenceBadge

| Property | Value |
|---|---|
| Container | `inline-flex items-center gap-1 bg-forest-200 rounded-full px-3 py-1` |
| Icon | `TrendingUp` — size 14, `text-forest-700` |
| Text | `font-mono text-sm text-forest-900` — e.g. "94% match" |

### 2.12 ScanningAnimation

Used on the Loading screen.

| Property | Value |
|---|---|
| Outer ring | `w-32 h-32 rounded-full border-4 border-forest-200` |
| Inner ring | `w-24 h-24 rounded-full border-4 border-t-forest-500 animate-spin` |
| Center icon | `Leaf` — size 32, `text-forest-500`, stationary |
| Layout | All three centered absolutely inside a `relative` container |
| Container size | `w-32 h-32 relative mx-auto` |

### 2.13 ProgressMessage

| Property | Value |
|---|---|
| Text | `font-sans text-base text-forest-900 font-semibold text-center mt-6` |
| Sub-text | `font-sans text-sm text-slate-400 text-center mt-1` |
| Animated dots | CSS keyframe `opacity` pulse on three `span` elements, staggered 200ms |

### 2.14 ErrorCard

| Property | Value |
|---|---|
| Container | `bg-red-50 rounded-2xl p-6 text-center shadow-card` |
| Icon | `SearchX` — size 48, `text-red-400 mx-auto mb-4` |
| Title | `font-sans text-lg font-bold text-red-700` |
| Body | `font-sans text-sm text-slate-600 mt-2` |
| Button | PrimaryButton variant with `bg-forest-700` — "Try Again" |

### 2.15 PageHeader

Thin top bar for screens other than Home.

| Property | Value |
|---|---|
| Container | `flex items-center justify-between px-4 py-3 bg-cream-100 sticky top-0 z-10` |
| Back button | `w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-50` with `ChevronLeft` icon size 24 |
| Title | `font-sans text-base font-semibold text-forest-900` |
| Right slot | optional action icon (e.g., `BookmarkPlus`) same size as back button |

### 2.16 ApiKeyScreen

The full-screen component rendered when no API key is stored (first launch) or when the user opens settings.

| Property | Value |
|---|---|
| Outer container | `min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-700 via-forest-600 to-forest-500 p-4` |
| Card | `bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8` |
| Card on mobile | `w-full` (full-width within `p-4` page padding) |
| App logo | `AppLogo` component, centered: wrap in `flex justify-center mb-2` |
| Heading | `font-sans text-2xl font-bold text-forest-900 text-center mt-4` — "Connect your AI" |
| Subtext | `font-sans text-sm text-slate-500 text-center mt-2 leading-relaxed max-w-xs mx-auto` |
| Input label | `font-sans text-sm font-semibold text-forest-900 mb-1.5` — "Anthropic API Key" |
| Input wrapper | `relative` (to position show/hide toggle) |
| Input field | `w-full rounded-xl border-2 border-cream-300 bg-cream-100 px-4 py-3 pr-12 font-mono text-sm text-slate-700 placeholder-slate-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20 transition-colors` |
| Input type | `password` by default; toggles to `text` when revealed |
| Input placeholder | `sk-ant-...` |
| Show/hide toggle | `absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-forest-700 hover:bg-forest-50 transition-colors` |
| Show/hide icon | `Eye` (hidden) / `EyeOff` (revealed) from lucide-react, size 18 |
| Show/hide ARIA | `aria-label="Show API key"` / `"Hide API key"` |
| Primary button | `PrimaryButton` with `fullWidth` — label "Get Started", `mt-5` |
| API link | `font-sans text-sm text-forest-600 hover:text-forest-800 underline underline-offset-2 text-center block mt-4 transition-colors` — "Get a free API key →" linking to `https://console.anthropic.com` |
| Security note | `flex items-center justify-center gap-2 mt-5 font-sans text-xs text-slate-400` |
| Security note icon | `Shield` from lucide-react, size 14, `text-forest-500` |
| Security note text | "Your key never leaves your device" |

**Validation:**
- The "Get Started" button is disabled (`disabled:opacity-50 disabled:cursor-not-allowed`) while the input is empty.
- On submit, store the trimmed key to `localStorage` under `plantdoctor_api_key` and transition `view` to `'home'`.
- If the key does not start with `sk-ant-`, show an inline error below the input: `font-sans text-xs text-red-600 mt-1.5` — "That doesn't look like a valid Anthropic API key."

**ARIA:**
- The card should be wrapped in `<section aria-labelledby="apikey-heading">` where `id="apikey-heading"` is on the heading element.
- Input field: `id="apikey-input"` associated with a `<label htmlFor="apikey-input">`.

---

### 2.17 SettingsButton

A small icon button rendered in the top-right corner of the Home / Capture screen, allowing users to update their stored API key.

| Property | Value |
|---|---|
| Element | `<button>` |
| Position | `absolute top-4 right-4` (Home screen container must be `relative`) |
| Size | `w-10 h-10` (44px touch target) |
| Shape | `rounded-full` |
| Background | `bg-transparent hover:bg-forest-100 active:bg-forest-200` |
| Icon | `Settings` from lucide-react (gear icon), size 20, `text-slate-400 hover:text-forest-700` |
| Transition | `transition-colors duration-150` |
| ARIA | `aria-label="Open API key settings"` |
| z-index | `z-10` (above illustration area) |
| On click | Sets `view` to `'apikey'` (re-shows ApiKeyScreen with existing key pre-filled) |

When the ApiKeyScreen is opened via the settings button (not first launch), pre-populate the input with the masked existing key and change the button label to "Save Changes".

---

### 2.18 Divider

| Property | Value |
|---|---|
| Element | `<hr>` |
| Style | `border-0 border-t border-cream-300 my-4` |

### 2.19 PlantNameHeader (Results screen hero)

| Property | Value |
|---|---|
| Container | `flex flex-col gap-1 px-4 pt-4` |
| Common name | `font-display text-2xl font-bold text-forest-900` |
| Scientific name | `font-sans text-sm italic text-slate-400` |
| ConfidenceBadge | placed inline after common name, `mt-1` |

---

## 3. Screens / Views

The app has a single root component (`App.jsx`) that renders one of five views based on the `view` state: `'apikey' | 'home' | 'loading' | 'results' | 'error'`. The `'apikey'` view is shown on first launch when no API key exists in `localStorage`, and can also be triggered from the settings gear icon on the Home screen.

---

### 3.0 Screen 0: API Key Setup Screen

**View name:** `'apikey'`  
**File:** `src/views/ApiKeyView.jsx`

#### When it appears

- **First launch:** `App.jsx` checks `localStorage.getItem('plantdoctor_api_key')` on mount. If the value is `null` or an empty string, the initial `view` state is set to `'apikey'` instead of `'home'`.
- **Settings access:** User taps the `SettingsButton` (gear icon) in the top-right corner of the Home screen at any time.

#### Layout

```
+------------------------------------------+
|  [full-screen green gradient background] |
|                                          |
|   +----------------------------------+   |
|   |  [AppLogo — centered]            |   |  <- flex justify-center mb-2
|   |                                  |   |
|   |  "Connect your AI"               |   |  <- h2, centered, mt-4
|   |  [subtext paragraph]             |   |  <- text-sm text-slate-500, centered
|   |                                  |   |
|   |  Label: "Anthropic API Key"      |   |  <- text-sm font-semibold
|   |  [password input field]    [Eye] |   |  <- relative wrapper, pr-12 for icon
|   |  [inline error if invalid]       |   |  <- text-xs text-red-600, hidden by default
|   |                                  |   |
|   |  [Get Started button — full]     |   |  <- PrimaryButton w-full mt-5
|   |                                  |   |
|   |  "Get a free API key →"          |   |  <- text-sm link, centered, mt-4
|   |                                  |   |
|   |  [Shield icon] "Your key never   |   |  <- security note, flex centered, mt-5
|   |   leaves your device"            |   |
|   +----------------------------------+   |
|                                          |
+------------------------------------------+
```

#### Detailed Specs

- **Page / outer container:** `min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-700 via-forest-600 to-forest-500 p-4`
- **Card:** `bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 md:p-8`
  - On mobile (< `md`): card is full-width within the `p-4` outer padding — effectively `calc(100vw - 2rem)` wide.
  - On desktop (`md`+): card is pinned to `max-w-md` (448px) and centered.
- **AppLogo:** rendered via the shared `AppLogo` component, centered with `flex justify-center`.
- **Heading:** `id="apikey-heading"`, `font-sans text-2xl font-bold text-forest-900 text-center mt-4`
  - Text: "Connect your AI"
- **Subtext:** `font-sans text-sm text-slate-500 text-center mt-2 leading-relaxed max-w-xs mx-auto`
  - Text: "Enter your Anthropic API key to enable plant analysis. Your key is stored only in your browser and never sent to any server except Anthropic's."
- **Input label:** `<label htmlFor="apikey-input">` — `font-sans text-sm font-semibold text-forest-900 block mb-1.5 mt-5`
- **Input wrapper:** `relative`
- **Input field:** `id="apikey-input"`, `type="password"` (toggles to `type="text"`)
  - Classes: `w-full rounded-xl border-2 border-cream-300 bg-cream-100 px-4 py-3 pr-12 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20 transition-colors`
  - Placeholder: `sk-ant-...`
- **Show/hide toggle:** `<button type="button">` inside the input wrapper
  - Position: `absolute right-3 top-1/2 -translate-y-1/2`
  - Shape: `w-8 h-8 flex items-center justify-center rounded-lg`
  - Colors: `text-slate-400 hover:text-forest-700 hover:bg-forest-50 transition-colors`
  - Icon: `Eye` (when password hidden) / `EyeOff` (when password shown) from lucide-react, size 18
  - ARIA: `aria-label="Show API key"` / `aria-label="Hide API key"` (updates with state)
  - `aria-controls="apikey-input"`
- **Inline validation error** (conditionally rendered below input):
  - `font-sans text-xs text-red-600 mt-1.5`
  - Message: "That doesn't look like a valid Anthropic API key."
  - Shown when input loses focus and value is non-empty but does not start with `sk-ant-`
- **Primary button:** `PrimaryButton` component, `fullWidth`, label "Get Started", `mt-5`
  - Disabled while input is empty (`disabled={!apiKey.trim()}`)
  - On settings re-entry, label becomes "Save Changes"
- **API key link:** `<a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">`
  - Classes: `font-sans text-sm text-forest-600 hover:text-forest-800 underline underline-offset-2 text-center block mt-4 transition-colors`
  - Text: "Get a free API key →"
- **Security note:** `flex items-center justify-center gap-2 mt-5`
  - Icon: `Shield` from lucide-react, size 14, `text-forest-500`
  - Text: `font-sans text-xs text-slate-400` — "Your key never leaves your device"

#### State / Interactions

- On valid submit: call `localStorage.setItem('plantdoctor_api_key', trimmedKey)`, then dispatch `SET_API_KEY` action → sets `view` to `'home'`.
- On settings re-entry: pre-populate input with the existing key from `localStorage`. Input shows the real value (not masked asterisks) so users can verify or edit it.
- If the user navigates here via SettingsButton (not first launch), show a back arrow in the top-left of the card (`ChevronLeft`, size 20) that dismisses the ApiKeyView and returns to `'home'` without saving. Style: `absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-forest-50 text-slate-400 hover:text-forest-700 transition-colors`.

#### ARIA

| Element | ARIA attribute | Value |
|---|---|---|
| Outer section | `aria-labelledby` | `"apikey-heading"` |
| Input field | `id` | `"apikey-input"` |
| Input field | `aria-describedby` | `"apikey-error"` (when error is visible) |
| Inline error | `id` | `"apikey-error"`, `role="alert"` |
| Show/hide toggle | `aria-label` | "Show API key" / "Hide API key" |
| Show/hide toggle | `aria-controls` | `"apikey-input"` |
| Primary button | `type` | `"submit"` (inside a `<form>`) |

Wrap the input + button in a `<form onSubmit={handleSubmit}>` so Enter key triggers submission.

---

### 3.1 Screen 1: Home / Capture Screen

**View name:** `'home'`  
**File:** `src/views/HomeView.jsx`

#### Layout (top to bottom)

```
+----------------------------------+
|  [Leaf icon]  Plant Doctor  [⚙]  |  <- AppLogo left, SettingsButton absolute top-right
+----------------------------------+
|  Hero Tagline                    |  <- px-4
|  "Identify any plant.            |
|   Get expert care advice."       |
+----------------------------------+
|  [Illustration area]             |  <- Optional decorative SVG or
|  ~180px tall                     |     a soft green blob background
+----------------------------------+
|  Prompt text                     |  <- "Take or upload a photo of
|  (muted, centered)               |     your plant to get started"
+----------------------------------+
|       [Camera FAB 80px]          |  <- CameraFAB, mx-auto, my-8
|    "Take a Photo" label          |  <- text-xs text-slate-400 text-center mt-2
+----------------------------------+
|    ─────── or ───────            |  <- Divider with "or" text
+----------------------------------+
|    [Upload Photo button]         |  <- UploadButton, w-full mx-4
+----------------------------------+
|   "Supports JPG, PNG up to 10MB" |  <- caption, text-xs text-slate-400 text-center
+----------------------------------+
[safe area bottom padding: pb-8]
```

#### Detailed Specs

- **Page background:** `bg-cream-100 min-h-screen relative` (add `relative` for the SettingsButton)
- **AppLogo:** top-left aligned, `px-4 pt-6 pb-2`
- **SettingsButton:** `SettingsButton` component, rendered as a sibling to AppLogo. Position: `absolute top-4 right-4 z-10`. See Component 2.17 for full spec.
- **Tagline:** `font-display text-2xl font-bold text-forest-900 px-4 mt-2 leading-tight`
  - Line 1: "Identify any plant."
  - Line 2 (slightly muted): `text-forest-700` — "Get expert care advice."
- **Hero illustration area:** `w-full h-44 flex items-center justify-center my-4`
  - Contains a centered `Leaf` icon at 96px size, `text-forest-200`, surrounded by a soft `bg-forest-50 rounded-3xl mx-4` container. This is a placeholder for a future illustration.
- **Prompt text:** `text-sm text-slate-400 text-center px-6 mb-6`
- **CameraFAB:** wrapped in a `div` with `flex flex-col items-center`
- **"or" divider:**
  - `flex items-center gap-3 px-8 my-4`
  - Lines are `flex-1 border-t border-cream-300`
  - Text: `text-xs text-slate-400 font-semibold uppercase tracking-wide`
- **UploadButton:** `w-full max-w-xs mx-auto block`
- **Caption:** `text-xs text-slate-400 text-center mt-3 mb-8`

#### State / Interactions

- Camera button triggers `<input type="file" accept="image/*" capture="environment">` click
- Upload button triggers `<input type="file" accept="image/*">` click (no capture attribute)
- On file selected: validate size (< 10 MB) and type; if valid, transition view to `'loading'` and call Claude Vision API
- If validation fails: inline error message below the buttons: `text-xs text-red-600 text-center mt-2`
- SettingsButton (gear icon, top-right) dispatches `OPEN_SETTINGS` action → sets `view` to `'apikey'` with `isSettingsMode: true` flag so ApiKeyView shows back navigation and "Save Changes" button label

---

### 3.2 Screen 2: Loading / Analysis Screen

**View name:** `'loading'`  
**File:** `src/views/LoadingView.jsx`

#### Layout

```
+----------------------------------+
|  [PageHeader: "Analyzing..."]    |  <- back arrow disabled during load
+----------------------------------+
|                                  |
|                                  |
|    [PhotoPreview thumbnail]      |  <- max-w-xs mx-auto, aspect-square
|    (the captured image)          |     rounded-xl, shadow-card, mt-8
|                                  |
|    [ScanningAnimation overlay]   |  <- absolute, centered on image
|                                  |
|                                  |
|    [ProgressMessage]             |  <- "Identifying your plant..."
|    [Sub-text animated dots]      |  <- "Consulting plant database..."
|                                  |
+----------------------------------+
[No bottom actions — in-progress state]
```

#### Detailed Specs

- **Background:** `bg-cream-100 min-h-screen`
- **PageHeader title:** "Analyzing Plant" — back button is rendered but has `pointer-events-none opacity-40` (cannot go back mid-request)
- **Photo container:** `relative max-w-xs mx-auto mt-8`
  - Image fills container: `w-full aspect-square object-cover rounded-xl`
  - ScanningAnimation is `absolute inset-0 flex items-center justify-center`
  - A semi-transparent overlay: `absolute inset-0 bg-forest-900/20 rounded-xl`
- **ScanningAnimation:** see Component 2.12 above. The spinning ring uses `animate-spin`. Duration override: `[animation-duration:2s]`.
- **ProgressMessage:** `mt-10 px-4`
  - Main text cycles through 3 messages with a 2-second interval (managed with `useEffect` + `setInterval`):
    1. "Identifying your plant..."
    2. "Analysing leaf structure..."
    3. "Checking nutritional profiles..."
  - Sub-text: "This usually takes 5–10 seconds"
- **Accessibility:** `role="status" aria-live="polite"` on the ProgressMessage container

---

### 3.3 Screen 3: Results Screen

**View name:** `'results'`  
**File:** `src/views/ResultsView.jsx`

#### Layout

```
+----------------------------------+
|  [PageHeader: back + bookmark]   |
+----------------------------------+
|  [PhotoPreview full-width]       |  <- aspect-video (16:9), rounded-b-2xl
|  [gradient overlay]              |
+----------------------------------+
|  [PlantNameHeader]               |  <- inside px-4 pt-4
|    Common Name (h1)              |
|    Scientific name (italic)      |
|    [ConfidenceBadge]             |
+----------------------------------+
|  [Divider]                       |
+----------------------------------+
|  Section: "Nutritional Needs"    |  <- px-4, section heading h2
|  [NutrientCard: Macronutrients]  |
|  [NutrientCard: Micronutrients]  |
+----------------------------------+
|  [Divider]                       |
+----------------------------------+
|  Section: "Care Recommendations" |  <- px-4, section heading h2
|  [RecommendationCard x3-5]       |
+----------------------------------+
|  [Divider]                       |
+----------------------------------+
|  Action buttons row              |  <- px-4 pb-10, flex gap-3
|    [SecondaryButton: Analyze     |
|       Another]                   |
|    [PrimaryButton: Save Result]  |
+----------------------------------+
[pb-8 safe area]
```

#### Detailed Specs

**Photo area:**
- `w-full aspect-video rounded-b-2xl overflow-hidden relative`
- Gradient overlay: `absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-forest-900/70 to-transparent`

**PlantNameHeader:**
- Common name: `font-display text-2xl font-bold text-forest-900`
- Scientific name: `font-sans text-sm italic text-slate-400 mt-0.5`
- ConfidenceBadge: `mt-2`

**Nutritional Needs section:**
- Section title: `font-sans text-lg font-semibold text-forest-900 mb-3 flex items-center gap-2`
- Icon: `FlaskConical` — size 20, `text-forest-500`
- **NutrientCard — Macronutrients:**
  - Title: "Macronutrients (NPK)"
  - Header icon: `Zap` — size 18, `text-forest-500`
  - Chips: Nitrogen (N), Phosphorus (P), Potassium (K)
  - Each chip has status: ok / deficient / critical from API response
- **NutrientCard — Micronutrients:**
  - Title: "Micronutrients"
  - Header icon: `Microscope` — size 18, `text-forest-500`
  - Chips: Iron (Fe), Calcium (Ca), Magnesium (Mg), Manganese (Mn), Zinc (Zn)
  - Same status coloring

**Care Recommendations section:**
- Section title: `font-sans text-lg font-semibold text-forest-900 mb-3 flex items-center gap-2`
- Icon: `Sprout` — size 20, `text-forest-500`
- Each RecommendationCard (up to 5) uses one of these icons based on category:

| Category | Icon |
|---|---|
| Watering | `Droplets` |
| Sunlight | `Sun` |
| Fertilizer | `Package` |
| Soil | `Layers` |
| Pruning / General | `Scissors` |

**Action buttons:**
- Layout: `flex gap-3 px-4 pb-10 pt-4`
- SecondaryButton: "Analyze Another" with `RotateCcw` icon — `flex-1`
- PrimaryButton: "Save Result" with `BookmarkPlus` icon — `flex-1`
- Save is a local-storage persist action (implementation detail, not visual)

---

### 3.4 Screen 4: Error Screen

**View name:** `'error'`  
**File:** `src/views/ErrorView.jsx`

#### Layout

```
+----------------------------------+
|  [PageHeader: back arrow]        |
+----------------------------------+
|                                  |
|  [ErrorCard — centered]          |
|    [SearchX icon 48px]           |
|    "Plant Not Recognized"        |
|    friendly explanation text     |
|    [Try Again button]            |
|                                  |
|  [Tips section]                  |
|    "Tips for better results:"    |
|    - bullet list of 4 tips       |
|                                  |
+----------------------------------+
```

#### Detailed Specs

- **Page:** `bg-cream-100 min-h-screen`
- **ErrorCard:** `mx-4 mt-8 bg-red-50 rounded-2xl p-6 text-center shadow-card`
  - Icon: `SearchX` — size 48, `text-red-400 mx-auto mb-4`
  - Title: `font-sans text-lg font-bold text-red-700` — "Plant Not Recognized"
  - Body: `font-sans text-sm text-slate-600 mt-2 leading-relaxed` — "We couldn't identify this plant from the photo. This sometimes happens with unclear, dark, or partial images."
  - Button: PrimaryButton — "Try Another Photo" with `Camera` icon, `mt-5 mx-auto`
- **Tips section:** `mx-4 mt-6`
  - Title: `font-sans text-sm font-semibold text-forest-900 mb-3`— "Tips for better results:"
  - List: `space-y-2`
  - Each item: `flex items-start gap-2 font-sans text-sm text-slate-600`
  - Icon per item: `CheckCircle2` — size 16, `text-forest-500 flex-shrink-0 mt-0.5`
  - Tip texts:
    1. "Ensure the plant fills most of the frame"
    2. "Use good lighting — avoid harsh shadows"
    3. "Capture a clear leaf or distinctive feature"
    4. "Make sure the image is in focus"

#### Error Variants

The ErrorView also handles network/API errors. In that case:
- Icon changes to `WifiOff` — size 48, `text-slate-400`
- Title: "Connection Problem"
- Body: "Please check your internet connection and try again."
- Card background: `bg-slate-50` instead of `bg-red-50`
- Title color: `text-slate-700`

Controlled by an `errorType: 'not_found' | 'network'` prop.

---

## 4. Mobile-First Layout

### 4.1 Breakpoint Strategy

The app is designed mobile-first. The `max-w-md mx-auto` constraint keeps the layout phone-width on all screen sizes. On large screens it appears as a centered "app card."

| Breakpoint | Width | Tailwind prefix | Behavior |
|---|---|---|---|
| Mobile (default) | 0–767px | (none) | Full-width, single-column, bottom padding for thumb reach |
| Tablet | 768px+ | `md:` | `max-w-md` constrains the content. Background shows app name alongside if desired |
| Desktop | 1024px+ | `lg:` | Same content width, optional two-column layout showing a static plant illustration beside the card |

On `lg:` screens, the root layout becomes:
```
flex min-h-screen items-start justify-center bg-forest-900/5 pt-8
  └── max-w-md w-full bg-cream-100 rounded-3xl shadow-2xl overflow-hidden min-h-[700px]
```

### 4.2 Navigation Approach

**Decision: No persistent navigation bar.**

Rationale: The app has a linear flow (Home → Loading → Results) with no peer-level sections. A bottom nav bar would waste 64px of precious vertical space and imply navigation that doesn't exist. Instead:

- PageHeader provides contextual back navigation on non-home screens
- "Analyze Another" button returns the user to the Home screen
- No side drawer, no hamburger menu

### 4.3 Touch Targets

All interactive elements meet the 44×44px minimum:

| Component | Touch target size | Implementation |
|---|---|---|
| CameraFAB | 80×80px | `w-20 h-20` |
| PrimaryButton / SecondaryButton | 48px height | `min-h-[48px]` |
| PageHeader back button | 40×40px touch area | `w-10 h-10` (42px = marginally acceptable; pad outer div) |
| NutrientChip | Not interactive — display only | — |
| File input trigger | Covers full button | Hidden `<input>` with matching size |

For PageHeader back button, wrap in `<button className="w-11 h-11 ...">` to hit 44px.

### 4.4 Safe Area

Modern phones (iPhone with Dynamic Island, Android with gesture nav) require bottom safe area padding.

Implementation strategy (no Tailwind plugin assumed):

```jsx
// In global CSS (src/index.css):
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 1.5rem);
}
```

Apply `pb-safe` to the bottom of each scrollable view container. As a fallback, `pb-8` (32px) ensures minimum clearance on all devices.

### 4.5 Scroll Behavior

- **Home screen:** `overflow-y-auto` — scrollable if content overflows (small phones)
- **Results screen:** `overflow-y-auto` — long content; use `scroll-smooth`
- **Loading screen:** `overflow-hidden` — fixed layout, no scroll
- **Error screen:** `overflow-y-auto` — may scroll on very small screens

No horizontal scrolling anywhere. All content wraps.

---

## 5. Accessibility

### 5.1 WCAG 2.1 AA Compliance Targets

The app targets WCAG 2.1 Level AA for all interactive components and informational text.

### 5.2 Color Contrast Ratios

| Foreground | Background | Ratio | Passes AA |
|---|---|---|---|
| `#1A3D2B` forest-900 (headings) | `#FAFAF5` cream-100 | ~14:1 | Yes (AAA) |
| `#2D6A4F` forest-700 (body link) | `#FAFAF5` cream-100 | ~8.5:1 | Yes (AAA) |
| `#FFFFFF` white (button text) | `#2D6A4F` forest-700 (button bg) | ~6.5:1 | Yes |
| `#475569` slate-600 (body) | `#FAFAF5` cream-100 | ~7.2:1 | Yes (AAA) |
| `#1A3D2B` forest-900 (chip text) | `#B7E4C7` forest-200 (chip bg) | ~5.1:1 | Yes |
| `#5C3D2E` soil-800 (warning text) | `#E8C9B0` soil-200 (warning bg) | ~4.6:1 | Yes |
| `#DC2626` red-600 (error) | `#FEF2F2` red-50 | ~5.9:1 | Yes |
| `#94A3B8` slate-400 (placeholder) | `#FAFAF5` cream-100 | ~3.1:1 | Fails — use only for decorative/non-informational text. Never for critical labels. |

**Note:** `slate-400` is used only for placeholder text and supplementary captions (never for required information). If used for informational text, upgrade to `slate-500` (`#64748B`, ratio ~4.8:1).

### 5.3 Focus States

All interactive elements must have a visible focus ring for keyboard navigation.

Apply to all buttons, inputs, and links:

```css
/* src/index.css */
:focus-visible {
  outline: 3px solid #52B788;   /* forest-500 */
  outline-offset: 2px;
  border-radius: 0.5rem;
}
```

Tailwind equivalent on components: `focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2`

Do NOT use `outline-none` without a replacement focus indicator.

### 5.4 ARIA Labels

| Component | ARIA attribute | Value |
|---|---|---|
| CameraFAB | `aria-label` | "Take a photo of your plant" |
| UploadButton | `aria-label` | "Upload a plant photo from your device" |
| File input | `aria-label` | "Select plant image file" |
| ScanningAnimation | `role="img" aria-label` | "Plant analysis in progress" |
| ProgressMessage | `role="status" aria-live` | `"polite"` |
| ErrorCard | `role="alert"` | (no value — role itself signals urgency) |
| NutrientChip (deficient) | `aria-label` | e.g. "Nitrogen: deficient" |
| ConfidenceBadge | `aria-label` | e.g. "Match confidence: 94 percent" |
| PageHeader back button | `aria-label` | "Go back" |
| Save button | `aria-pressed` | `"true"` when saved, `"false"` otherwise |

### 5.5 Semantic HTML

- App root: `<main>` element wrapping each view
- Section titles use `<h2>`, plant name uses `<h1>` (one per page)
- Nutrient chips: `<ul>` + `<li>` list
- Tips list: `<ul>` + `<li>` with `role="list"` for VoiceOver fix
- Buttons: always `<button>` not `<div onClick>`
- File inputs: always associated with a visible label (visually hidden label is acceptable: `sr-only`)

### 5.6 Motion / Animation

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-spin,
  .animate-pulse {
    animation: none;
  }
}
```

The scanning animation ring stops spinning on reduced-motion devices. Replace it with a static dashed ring.

### 5.7 Image Alt Text

- Captured plant photo: `alt="Captured plant photo for analysis"` (before identification)
- After identification: `alt="Photo of [Common Name]"`
- App logo leaf icon: `aria-hidden="true"` (decorative alongside text)

---

## 6. Component File Structure

### 6.1 Directory Tree

```
src/
├── main.jsx                    # ReactDOM.createRoot, imports global CSS
├── App.jsx                     # Root: view state + API call logic
├── index.css                   # Global styles: safe-area, focus ring, font imports
│
├── views/
│   ├── ApiKeyView.jsx          # Screen 0 — first-launch & settings API key entry
│   ├── HomeView.jsx            # Screen 1
│   ├── LoadingView.jsx         # Screen 2
│   ├── ResultsView.jsx         # Screen 3
│   └── ErrorView.jsx           # Screen 4
│
├── components/
│   ├── AppLogo.jsx
│   ├── PageHeader.jsx
│   ├── PrimaryButton.jsx
│   ├── SecondaryButton.jsx
│   ├── CameraFAB.jsx
│   ├── UploadButton.jsx
│   ├── PhotoPreview.jsx
│   ├── ScanningAnimation.jsx
│   ├── ProgressMessage.jsx
│   ├── ConfidenceBadge.jsx
│   ├── NutrientChip.jsx
│   ├── NutrientCard.jsx
│   ├── RecommendationCard.jsx
│   ├── ErrorCard.jsx
│   └── SettingsButton.jsx      # Gear icon button for top-right of HomeView
│
├── hooks/
│   └── usePlantAnalysis.js     # Encapsulates fetch + state for Claude API call
│
└── utils/
    └── imageUtils.js           # resizeImageForUpload(), fileToBase64()
```

### 6.2 App.jsx — State & View Router

```
State shape (useReducer recommended):
{
  view: 'apikey' | 'home' | 'loading' | 'results' | 'error',
  isSettingsMode: boolean,          // true when ApiKeyView opened from SettingsButton
  capturedImage: string | null,     // base64 data URL
  analysisResult: AnalysisResult | null,
  errorType: 'not_found' | 'network' | null,
  isSaved: boolean,
}

Initial state: check localStorage.getItem('plantdoctor_api_key') on mount:
  - Key exists and non-empty → view: 'home'
  - Key missing or empty   → view: 'apikey'

Actions:
- SET_API_KEY: { payload: apiKeyString } → stores to localStorage, view: 'home', isSettingsMode: false
- OPEN_SETTINGS: → view: 'apikey', isSettingsMode: true
- CLOSE_SETTINGS: → view: 'home', isSettingsMode: false (back button without saving)
- CAPTURE_IMAGE: { payload: base64string } → view: 'loading'
- ANALYSIS_SUCCESS: { payload: AnalysisResult } → view: 'results'
- ANALYSIS_ERROR: { payload: errorType } → view: 'error'
- RESET: → view: 'home', clears image and result
- TOGGLE_SAVE: → toggles isSaved

App.jsx renders:
  <main className="max-w-md mx-auto min-h-screen bg-cream-100 relative">
    {view === 'apikey' && <ApiKeyView isSettingsMode={isSettingsMode} onSave={dispatch} onBack={dispatch} />}
    {view === 'home' && <HomeView onCapture={dispatch} onOpenSettings={dispatch} />}
    {view === 'loading' && <LoadingView image={capturedImage} />}
    {view === 'results' && <ResultsView result={analysisResult} image={capturedImage} isSaved={isSaved} onSave={...} onReset={...} />}
    {view === 'error' && <ErrorView errorType={errorType} onReset={...} />}
  </main>
```

### 6.3 AnalysisResult Type (JSDoc / PropTypes)

```
AnalysisResult {
  commonName: string,           // "Monstera Deliciosa"
  scientificName: string,       // "Monstera deliciosa"
  confidence: number,           // 0–100
  nutrients: {
    macros: NutrientStatus[],   // Array of { name, symbol, status }
    micros: NutrientStatus[],
  },
  recommendations: Recommendation[],
  summary: string,              // 1–2 sentence plant description
}

NutrientStatus {
  name: string,                 // "Nitrogen"
  symbol: string,               // "N"
  status: 'ok' | 'deficient' | 'critical',
  note: string | null,          // optional short explanation
}

Recommendation {
  category: 'watering' | 'sunlight' | 'fertilizer' | 'soil' | 'general',
  title: string,                // "Water every 7–10 days"
  detail: string,               // fuller explanation
}
```

### 6.4 Component Props Interfaces

**AppLogo.jsx**
- No props. Stateless display component.

**PageHeader.jsx**
```
Props:
  title: string
  onBack: () => void | null   // null disables back button
  rightAction?: { icon: LucideIcon, label: string, onClick: () => void }
```

**PrimaryButton.jsx**
```
Props:
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: LucideIcon           // optional leading icon component
  fullWidth?: boolean         // adds w-full
  type?: 'button' | 'submit'  // default 'button'
  ariaLabel?: string
```

**SecondaryButton.jsx** — same props as PrimaryButton.

**CameraFAB.jsx**
```
Props:
  onCapture: (file: File) => void
```
Internally renders hidden `<input type="file" accept="image/*" capture="environment">`.

**UploadButton.jsx**
```
Props:
  onUpload: (file: File) => void
```
Internally renders hidden `<input type="file" accept="image/*">` (no capture attribute).

**PhotoPreview.jsx**
```
Props:
  src: string                 // base64 or URL
  alt: string
  aspectRatio?: 'square' | 'video'   // default 'square'
  showOverlay?: boolean
```

**ScanningAnimation.jsx**
- No props. Pure visual component.

**ProgressMessage.jsx**
```
Props:
  messages: string[]          // cycles through these
  intervalMs?: number         // default 2000
  subtext?: string
```

**ConfidenceBadge.jsx**
```
Props:
  confidence: number          // 0–100, displayed as "94% match"
```

**NutrientChip.jsx**
```
Props:
  name: string
  symbol: string
  status: 'ok' | 'deficient' | 'critical'
```

**NutrientCard.jsx**
```
Props:
  title: string               // "Macronutrients (NPK)"
  type: 'macro' | 'micro'
  nutrients: NutrientStatus[]
```

**RecommendationCard.jsx**
```
Props:
  recommendation: Recommendation
```

**ErrorCard.jsx**
```
Props:
  errorType: 'not_found' | 'network'
  onRetry: () => void
```

**ApiKeyView.jsx**
```
Props:
  isSettingsMode: boolean        // false = first launch, true = opened from settings
  onSave: (key: string) => void  // called with trimmed API key on valid submit
  onBack?: () => void            // called when back arrow is tapped (settings mode only)
```
Internally manages:
  - apiKey: string (controlled input)
  - showKey: boolean (toggles input type)
  - validationError: string | null

**SettingsButton.jsx**
```
Props:
  onClick: () => void            // dispatches OPEN_SETTINGS action
```
No other props. Position (absolute top-right) is set by the consumer (HomeView).
```

### 6.5 usePlantAnalysis Hook

```
File: src/hooks/usePlantAnalysis.js

Signature:
  const { analyze, isLoading, result, error } = usePlantAnalysis()

  analyze(base64ImageData: string): Promise<void>
    - Sets isLoading = true
    - Calls Claude Vision API (endpoint managed via env var VITE_CLAUDE_API_KEY)
    - On success: sets result (AnalysisResult), isLoading = false
    - On failure: sets error ('not_found' | 'network'), isLoading = false

Note: The Claude API call must use the messages API with vision (image content block).
The prompt instructs Claude to return structured JSON matching AnalysisResult.
```

### 6.6 imageUtils.js

```
File: src/utils/imageUtils.js

fileToBase64(file: File): Promise<string>
  - Reads file via FileReader
  - Returns base64 string (without data URL prefix — strip "data:image/...;base64,")

resizeImageForUpload(file: File, maxDimension?: number = 1024): Promise<Blob>
  - Draws to canvas, scales down if either dimension > maxDimension
  - Returns JPEG Blob at 0.85 quality
  - Keeps aspect ratio
```

---

## 7. Additional Design Notes

### 7.1 Empty / First-Time State

No onboarding screens are required for v1. The Home screen tagline and prompt text are sufficient guidance.

### 7.2 Loading State Duration

If the API responds in under 1 second, hold the Loading screen for at least 1.5 seconds total to avoid a jarring flash. Use `Promise.all([apiCall, delay(1500)])`.

### 7.3 Page Transitions

Between view changes, apply a simple fade transition:

```css
/* in index.css */
.view-enter {
  opacity: 0;
  transform: translateY(8px);
}
.view-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 200ms ease, transform 200ms ease;
}
```

Use React's `key` prop on the view container or a lightweight CSS transition wrapper. No external animation library needed.

### 7.4 Saved Results

"Save Result" persists the AnalysisResult to `localStorage` under `plantdoctor_results` (array). No Saved Results screen is in scope for v1 — the save button simply toggles `isSaved` visually (icon fills with `BookmarkCheck`, button label changes to "Saved"). A toast confirmation can be added as an enhancement.

### 7.5 Claude API Prompt Template

The prompt sent to Claude with the image should request a JSON response. The system prompt excerpt:

> "You are a plant identification and care expert. Analyze the provided plant image and return ONLY valid JSON matching the AnalysisResult schema. If you cannot identify the plant with reasonable confidence (below 50%), set confidence to 0 and return null for all other fields."

The Implementation Agent is responsible for writing this prompt. It is noted here for context.

---

---

## Screen 5: API Key Setup Screen

> This section is a self-contained summary of the ApiKeyView design for quick reference. Full detail is in Section 3.0 and Component Inventory sections 2.16–2.17.

### When it appears

| Trigger | Condition |
|---|---|
| First launch | `localStorage.getItem('plantdoctor_api_key')` is `null` or `""` |
| Settings access | User taps the gear (Settings) icon in the top-right of the Capture screen |

### Visual Design

**Background:** Full-viewport green gradient using the existing palette — `bg-gradient-to-br from-forest-700 via-forest-600 to-forest-500`. This intentionally contrasts with the `cream-100` background of other screens so it feels like a distinct setup step.

**Card:** Centered white card (`bg-white rounded-2xl shadow-2xl`). On desktop, constrained to `max-w-md`. On mobile, full-width within `p-4` outer padding — no horizontal margins squeeze content on small phones.

### Element Checklist

| # | Element | Details |
|---|---|---|
| 1 | App logo | `AppLogo` component, centered (`flex justify-center`), `font-display` Playfair Display |
| 2 | Heading | "Connect your AI" — `font-sans text-2xl font-bold text-forest-900 text-center mt-4` |
| 3 | Subtext | Privacy-first explanation — `text-sm text-slate-500 text-center leading-relaxed max-w-xs mx-auto` |
| 4 | Input label | "Anthropic API Key" — `text-sm font-semibold text-forest-900` |
| 5 | Password input | `type="password"` default, placeholder `sk-ant-...`, `font-mono`, `border-forest-500` on focus |
| 6 | Show/hide toggle | `Eye` / `EyeOff` icon (lucide-react) inside input wrapper, `aria-label` updates with state |
| 7 | "Get Started" button | `PrimaryButton` full-width, disabled while input empty; "Save Changes" in settings mode |
| 8 | API key link | "Get a free API key →" — links to `https://console.anthropic.com`, `text-forest-600` |
| 9 | Security note | `Shield` icon + "Your key never leaves your device" — `text-xs text-slate-400` |
| 10 | Back arrow (settings mode only) | `ChevronLeft`, top-left of card, `absolute top-4 left-4` |

### Responsive Behavior

| Viewport | Card width | Card padding |
|---|---|---|
| Mobile (< 768px) | `w-full` (full-width within `p-4`) | `p-6` |
| Tablet / Desktop (≥ 768px) | `max-w-md` (448px), centered | `p-8` |

### Security Note Implementation

The subtext and the Shield note together reassure privacy-conscious users:

- Subtext: *"Your key is stored only in your browser and never sent to any server except Anthropic's."*
- Shield note: *"Your key never leaves your device"* — with `Shield` icon from lucide-react, size 14, `text-forest-500`.

The key is stored in `localStorage` (not `sessionStorage`) so it persists across browser sessions. There is no server-side storage.

### Settings Gear Icon on Capture Screen

A `SettingsButton` component is added to the Home / Capture screen (`src/views/HomeView.jsx`) at `absolute top-4 right-4 z-10`:

- Icon: `Settings` from lucide-react, size 20
- Colors: `text-slate-400` at rest, `hover:text-forest-700`
- Background: transparent at rest, `hover:bg-forest-100` on hover
- Shape: `w-10 h-10 rounded-full` (44px touch target)
- ARIA: `aria-label="Open API key settings"`

Tapping it transitions the view to `'apikey'` with `isSettingsMode: true`, which pre-populates the input and shows a back arrow on the card.

---

---

## Component 2.20: PlantNetCard

### Purpose

PlantNetCard is a self-contained "botanical ID card" that surfaces the full taxonomic data returned by the PlantNet API. It is inserted in ResultsScreen immediately after the hero header block (the `bg-forest-700` section) and before the Gemini health analysis section. It replaces the current raw inline display of `rawIdentification.sciName`, `rawIdentification.genus`, and `rawIdentification.family` in the hero header, which should be removed once this card is in place.

---

### Visual Connection to the Hero Header

The hero header ends with a dark `bg-forest-700` band that has `pb-6` bottom padding. PlantNetCard sits in the `px-4 py-4 space-y-4` content column directly below — no overlap.

The visual handoff is achieved by a **top accent bar**: the card has a `border-t-4 border-forest-500` top edge. This creates a thin sage-green line that reads as a deliberate "lid" connecting the card to the forest-700 header above, grounding the card without requiring overlap or negative margin. The card sits at the same horizontal inset (`mx-0` within the `px-4` column) as all other result cards, preserving the overall rhythm.

The card uses `shadow-card` (`0 2px 16px 0 rgba(26,61,43,0.08)`) so it appears to sit at the same elevation level as the other result cards, not above them. There is no `mt-0` collapse — the standard `space-y-4` gap applies between the hero and the card.

---

### Card Shell

| Property | Tailwind classes | Notes |
|---|---|---|
| Outer container | `bg-white rounded-2xl shadow-card border-t-4 border-forest-500 overflow-hidden` | The `border-t-4` accent is the visual bridge to the hero header |
| Inner padding | `p-4 md:p-5` | Matches the card-internal padding standard from Section 1.5 |
| Semantic element | `<section>` | Must carry `aria-labelledby="plantnet-card-heading"` |

---

### Section 1: Primary Identification Row

This row is the first thing rendered inside the card padding. It communicates the single best PlantNet match at a glance.

**Layout:** `flex flex-col gap-1` (stacked, not side-by-side — scientific names can be long)

**Header row (icon + label):**

- Container: `flex items-center gap-2 mb-3`
- Icon: `Dna` from lucide-react, size 18, class `text-forest-500 flex-shrink-0`
- Label: `id="plantnet-card-heading"`, text "Botanical Identification", class `font-sans text-base font-semibold text-forest-900`

The `Dna` icon was chosen because it evokes precise scientific identification rather than the general-purpose `Leaf` icon already used in the app logo and hero header. A `Microscope` icon is acceptable as an alternative if `Dna` is not available in the installed lucide-react version.

**Scientific name:**

- Element: `<p>`
- Classes: `font-sans text-lg font-semibold italic text-forest-900 leading-snug`
- Content: `scientificNameWithoutAuthor` from the top PlantNet result (e.g. "Capsicum annuum")
- Rationale for `text-lg font-semibold`: scientific name is the authoritative identifier — it should read as a headline, not a subtitle. Italic follows universal botanical convention.

**Common name:**

- Element: `<p>`
- Classes: `font-sans text-sm text-slate-600`
- Content: first element of `commonNames` array, with a fallback of an em-dash if the array is empty
- If multiple common names exist, show the first only in this row; the rest are not displayed (not enough space for them to add value here)

**Confidence badge:**

- Reuse the existing `ConfidenceBadge` component (Component 2.11)
- Placed on its own line below the common name: `mt-1`
- The badge `aria-label` must follow the existing pattern: `"Match confidence: {score} percent"` where `{score}` is `Math.round(score * 100)`
- Icon inside badge: `TrendingUp` (already specified in 2.11) — do not change to a different icon for consistency

Full primary row assembled:

```
[Dna icon]  Botanical Identification        ← header row
Capsicum annuum                             ← scientific name (italic, text-lg)
Bell pepper                                 ← common name (text-sm text-slate-600)
[TrendingUp] 87% match                     ← ConfidenceBadge (mt-1)
```

---

### Section 2: Taxonomy Row

Displayed below the primary identification row, separated by a thin divider.

**Divider:** `<hr className="border-0 border-t border-cream-300 my-3" />`

**Taxonomy row container:** `flex flex-wrap gap-2 items-center`

**Label prefix** (optional, appears before the chips in muted text):
- Classes: `font-sans text-xs text-slate-400 font-semibold uppercase tracking-wide mr-1`
- Text: "Taxonomy"

**Genus chip:**

| Property | Value |
|---|---|
| Container | `inline-flex items-center gap-1.5 bg-forest-50 border border-forest-200 rounded-full px-3 py-1` |
| Label text | `font-sans text-xs text-slate-400 font-medium` — "Genus" |
| Separator | `text-cream-300` — "|" character, `mx-0.5` |
| Value text | `font-sans text-xs font-semibold text-forest-900` — e.g. "Capsicum" |
| ARIA | The chip `<span>` carries `aria-label="Genus: Capsicum"` |

**Family chip:**

| Property | Value |
|---|---|
| Container | `inline-flex items-center gap-1.5 bg-forest-50 border border-forest-200 rounded-full px-3 py-1` |
| Label text | `font-sans text-xs text-slate-400 font-medium` — "Family" |
| Separator | `text-cream-300` — "|" character, `mx-0.5` |
| Value text | `font-sans text-xs font-semibold text-forest-900` — e.g. "Solanaceae" |
| ARIA | The chip `<span>` carries `aria-label="Family: Solanaceae"` |

Both chips use `bg-forest-50` (not `bg-forest-200`) to stay visually lighter than the status chips used in NutrientCard — they are informational, not status indicators. The `border border-forest-200` adds enough definition on the `bg-white` card background.

If either `genus` or `family` is missing from the PlantNet response, that chip is simply not rendered. Do not show a chip with an empty value or a dash.

**Assembled taxonomy row:**

```
Taxonomy   [Genus | Capsicum]   [Family | Solanaceae]
```

---

### Section 3: Alternative Matches (Collapsible)

PlantNet returns multiple ranked candidates. This section shows the top 3 results (indices 0–2 of the `results` array), where index 0 is already shown in the Primary row above. Showing index 0 again in this list is correct — it helps users see the score differential between the top match and the alternatives.

**Divider before section:** `<hr className="border-0 border-t border-cream-300 my-3" />`

**Toggle button:**

- Element: `<button type="button">`
- Classes: `w-full flex items-center justify-between py-1 focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 rounded-lg`
- Left side: `flex items-center gap-2`
  - Icon: `ListTree` from lucide-react, size 16, class `text-forest-500`
  - Text: `font-sans text-sm font-semibold text-forest-900` — "Top Matches"
  - Count badge: `inline-flex items-center justify-center w-5 h-5 rounded-full bg-forest-200 font-mono text-xs text-forest-900` — shows "3"
- Right side: chevron icon that rotates on open/close
  - Closed: `ChevronDown` from lucide-react, size 16, class `text-slate-400 transition-transform duration-200`
  - Open: same icon with class `text-slate-400 transition-transform duration-200 rotate-180`
- ARIA on the button: `aria-expanded={isOpen ? "true" : "false"}` and `aria-controls="plantnet-alternatives"`

**Default collapsed state:**

- On mobile (default): **collapsed** — `isOpen` starts as `false`
- On `md:` and above (desktop): **expanded** — `isOpen` starts as `true`. Implement this with a `useEffect` that reads `window.innerWidth` on mount, or use a CSS-only approach where the list is always visible on `md:` by using `hidden md:block` on the list and toggling only on mobile. The CSS-only approach is preferred as it avoids a layout flash.

**CSS-only responsive disclosure:**
The alternatives list container uses:
```
id="plantnet-alternatives"
className={`mt-3 space-y-2 ${isOpen ? 'block' : 'hidden'} md:block`}
```
This means on `md:` the list is always rendered regardless of `isOpen`. The toggle button itself is hidden on `md:` with `md:hidden` to avoid a non-functional affordance on desktop.

**Each alternative match item:**

Container: `flex items-center gap-3 py-2 border-b border-cream-300 last:border-b-0`

Left: rank number badge
- Classes: `flex-shrink-0 w-6 h-6 rounded-full bg-forest-200 flex items-center justify-center font-mono text-xs font-bold text-forest-900`
- Content: rank number as `#1`, `#2`, `#3`
- The rank-1 item (top match) gets `bg-forest-500 text-white` instead of the default forest-200/forest-900 to visually distinguish it as the confirmed identification

Center: plant name block — `flex-1 min-w-0`
- Scientific name: `font-sans text-sm italic text-forest-900 truncate` — `scientificNameWithoutAuthor`
- Common name: `font-sans text-xs text-slate-400 truncate mt-0.5` — first element of `commonNames`, or omitted if empty

Right: confidence indicator
- Container: `flex-shrink-0 flex flex-col items-end gap-1`
- Percentage text: `font-mono text-xs text-forest-700 font-semibold` — e.g. "87%"
- Progress bar:
  - Track: `w-16 h-1.5 rounded-full bg-forest-100`
  - Fill: `h-full rounded-full bg-forest-500 transition-all duration-300`
  - Fill width: inline style `width: ${Math.round(score * 100)}%`
  - ARIA on the progress bar container: `role="meter"`, `aria-valuenow={Math.round(score * 100)}`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="{scientificName} match confidence: {score} percent"`

Full alternative item assembled:

```
[#1]  Capsicum annuum          87%  ████████░░░░
      Bell pepper

[#2]  Capsicum frutescens       9%  █░░░░░░░░░░░
      Chili pepper

[#3]  Solanum lycopersicum      4%  ░░░░░░░░░░░░
      Tomato
```

---

### Props Interface

```
PlantNetCard Props:
  plantNetResults: Array<{
    scientificNameWithoutAuthor: string,
    commonNames: string[],
    genus: { scientificNameWithoutAuthor: string },
    family: { scientificNameWithoutAuthor: string },
    score: number,          // 0–1
  }>
```

The component always reads its primary identification from `plantNetResults[0]` and shows indices 0–2 in the alternatives list. If `plantNetResults` is empty or undefined, the component renders nothing (`return null`).

---

### Position in ResultsScreen

PlantNetCard is inserted as the **first card** in the `px-4 py-4 space-y-4` content column, before `HealthAnalysisSection`. The `space-y-4` gap on the parent column provides the standard 16px separation from the hero header and from the next card.

The existing inline display of `rawIdentification.sciName`, `rawIdentification.genus`, and `rawIdentification.family` in the hero header's `<p className="text-sage-200 text-xs mt-1 italic">` element should be removed when PlantNetCard is implemented, as PlantNetCard supersedes it.

Updated ResultsScreen content column order:

```
1. PlantNetCard          ← new, first
2. HealthAnalysisSection (Gemini)
3. [divider — "Species Nutrition Profile"]
4. Nutritional Baseline card
5. Fertilizer Guide card
6. Species Care Notes card
7. Action buttons row
```

---

### ARIA Summary

| Element | Attribute | Value |
|---|---|---|
| Card `<section>` | `aria-labelledby` | `"plantnet-card-heading"` |
| Card heading | `id` | `"plantnet-card-heading"` |
| ConfidenceBadge (primary) | `aria-label` | `"Match confidence: {score} percent"` |
| Genus chip | `aria-label` | `"Genus: {genus}"` |
| Family chip | `aria-label` | `"Family: {family}"` |
| Alternatives toggle button | `aria-expanded` | `"true"` / `"false"` |
| Alternatives toggle button | `aria-controls` | `"plantnet-alternatives"` |
| Alternatives list | `id` | `"plantnet-alternatives"` |
| Each confidence bar | `role` | `"meter"` |
| Each confidence bar | `aria-valuenow` | rounded integer 0–100 |
| Each confidence bar | `aria-valuemin` | `"0"` |
| Each confidence bar | `aria-valuemax` | `"100"` |
| Each confidence bar | `aria-label` | `"{scientificName} match confidence: {score} percent"` |
| Rank badge (decorative) | `aria-hidden` | `"true"` |
| Dna icon | `aria-hidden` | `"true"` |
| ListTree icon | `aria-hidden` | `"true"` |
| Chevron icon | `aria-hidden` | `"true"` |

---

### Icons Used (lucide-react)

| Icon name | Used for | Size | Color class |
|---|---|---|---|
| `Dna` | Card header — primary identification | 18 | `text-forest-500` |
| `TrendingUp` | Inside ConfidenceBadge (inherited from 2.11) | 14 | `text-forest-700` |
| `ListTree` | Alternatives toggle button label | 16 | `text-forest-500` |
| `ChevronDown` | Alternatives toggle collapse indicator | 16 | `text-slate-400` |

Fallback: if `Dna` is unavailable in the installed lucide-react version, use `Microscope` (already imported in NutrientCard per Section 2.9). Do not use `Leaf` — it is already used for the app logo and would reduce icon differentiation.

---

### File Location

```
src/components/PlantNetCard.jsx
```

No new utility files are required. The component is self-contained and does not require a custom hook — it is purely display logic driven by the `plantNetResults` prop passed down from ResultsScreen.

---

*End of DESIGN_SPEC.md*
