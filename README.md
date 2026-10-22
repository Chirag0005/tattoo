# ATELIER NOIR — Luxury Tattoo Studio & Digital Flagship

> **"Your Story. Etched in Ink."**  
> An immersive, editorial digital presence crafted for an independent bespoke tattoo atelier based in Toronto, Ontario, Canada (West Queen West Arts District).

---

## 🏛️ Project Overview

**Atelier Noir** combines high-end fashion editorial aesthetics, contemporary tattoo culture, dark chiaroscuro cinematography, and conversion-focused interaction design. Designed to look and feel like an award-winning creative agency showcase.

### ✨ Key Features

- **Cinematic Chiaroscuro Aesthetics:** Deep charcoal black (`#0B0B0B`), warm ivory typography (`#F4F0E8`), and subtle accents of muted blood red (`#9E2929`).
- **Authentic High-Resolution Tattoo Photography:** 100% verified photography featuring black & grey realism, fine-line botanical single-needle work, Japanese Irezumi, and heavy blackwork on real human skin.
- **Interactive Mouse Parallax Hero:** Subtle perspective depth tracking mouse movement across the chiaroscuro sleeve backdrop with live studio operating status indicator.
- **Ambient Studio Soundscape:** Real-time Web Audio API meditative dark synthesizer with interactive audio waveform visualization.
- **Signature Portfolio Gallery:** Filterable asymmetrical masonry layout with live count tags and full-screen lightbox modal with 2X zoom inspection lens and keyboard navigation (`Esc`, `←`, `→`).
- **Interactive Before & After Stencil Reveal Slider:** Touch/mouse-draggable handle with animated **Auto Sweep Demo** revealing the transition from carbon stencil transfer to healed chiaroscuro ink.
- **Project Scale & Timeline Calculator:** Interactive slider calculating estimated session hours, sitting formats, and recommended resident artist based on placement, dimensions, and detail density.
- **Resident Artist Showcases:** Dedicated artist profiles with specialties, philosophy quotes, experience badges, and pre-selected booking actions.
- **7-Step Interactive Online Booking Wizard:**
  1. Artist Selection
  2. Tattoo Style Picker
  3. Concept Description & Anatomical Placement
  4. Reference Image File Uploader (JPG/PNG/WebP)
  5. Consultation Date Picker (no past dates)
  6. North American Contact Details & Canadian PIPEDA Privacy Consent
  7. Review & Direct Transmission (with unique tracking code e.g. `AN-2026-XXXX`, celebratory confetti, and `localStorage` persistence)
- **Local Canadian SEO & Compliance:** JSON-LD structured schema (`TattooParlor`), Canadian phone formatting, PIPEDA privacy policy, and booking etiquette terms.

---

## 🛠️ Technology Stack

- **Framework:** React 19, TypeScript
- **Bundler & Dev Server:** Vite
- **Styling:** Tailwind CSS, PostCSS
- **Typography:** Oswald, Bebas Neue, Manrope, Cormorant Garamond
- **Icons:** Lucide React
- **Micro-Interactions:** Canvas Confetti, Web Audio API

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Chirag0005/tattoo.git

# Navigate into the project directory
cd tattoo

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Architecture

```
tattoo/
├── public/
│   ├── images/              # High-resolution authentic tattoo photography
│   └── favicon / metadata   # Studio branding assets
├── src/
│   ├── components/
│   │   ├── AmbientGlow.tsx        # Cursor spotlight glow
│   │   ├── ArtistSection.tsx      # Resident artist profiles
│   │   ├── AudioToggle.tsx        # Ambient Web Audio synthesizer
│   │   ├── BeforeAfterSlider.tsx  # Interactive stencil-to-ink slider
│   │   ├── BookingProcess.tsx     # 3-step consultation timeline
│   │   ├── BookingWizard.tsx      # Full 7-step booking modal
│   │   ├── ContactSection.tsx     # Studio hours, map & contact form
│   │   ├── Footer.tsx             # Editorial directory & credits
│   │   ├── GalleryLightbox.tsx    # Lightbox with 2X zoom lens
│   │   ├── Hero.tsx               # Parallax hero with live clock
│   │   ├── LegalModals.tsx        # PIPEDA privacy policy & terms
│   │   ├── Navbar.tsx             # Sticky header with audio toggle
│   │   ├── SessionCalculator.tsx  # Project scale & session estimator
│   │   ├── StickyMobileBookBar.tsx# Mobile bottom sticky CTA
│   │   ├── StudioExperience.tsx   # Workstation & hygiene showcase
│   │   ├── StudioIntro.tsx        # Philosophy & brand story
│   │   ├── TattooGallery.tsx      # Filterable portfolio grid
│   │   └── Testimonials.tsx       # Collector reviews carousel
│   ├── data/
│   │   └── studioData.ts          # Centralized studio & artist data
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Tailwind styles & custom animations
├── index.html                     # SEO & JSON-LD structured data
├── tailwind.config.js             # Design tokens & typography
└── package.json
```

---

## 📄 License & Credits

Designed & engineered for **Atelier Noir Tattoo Studio**, West Queen West, Toronto, ON, Canada.
All rights reserved © 2026.
