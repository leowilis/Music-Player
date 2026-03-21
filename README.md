# 🎵 Music Player

A modern music player built with **Next.js**, **Motion (Framer Motion)**, and **Tailwind CSS** — featuring smooth animations, multiple player states, equalizer visualization, and an interactive UI.

🔗 **Live Demo**: https://music-player-lw.vercel.app/

---

## ✨ Features

- **3 Player States** — Playing, Paused, and Loading with smooth transitions
- **Animated Album Art** — Continuous rotation while playing, scale transitions per state
- **Equalizer Bars** — 5 animated bars with staggered wave effect
- **Progress Bar** — Seekable, color-coded by player state
- **Volume Control** — Hover-to-highlight slider
- **Shuffle & Repeat** — Full playlist navigation with shuffle history
- **Rapid Click Protection** — Race condition safe play/pause toggle

---

## 🛠 Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| Motion (Framer Motion) | 11.11.17 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| Lucide React | 0.469.0 |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/leowilis/Music-Player.git
cd Music-Player
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
  app/
    page.tsx          # Main page
    globals.css       # Design system tokens & global styles
    layout.tsx        # Root layout
  components/
    MusicPlayer.tsx   # Main orchestration component
    AlbumArt.tsx      # Album art with rotation animation
    TrackInfo.tsx     # Track title & artist info
    Equalizer.tsx     # Animated equalizer bars
    Controls.tsx      # Playback control buttons
    ProgressBar.tsx   # Seekable progress bar
    VolumeSlider.tsx  # Volume control slider
    types.ts          # Shared TypeScript types
```

---

## 🎬 Animation Details

| Element | Animation |
|---|---|
| Album Art | 360° rotation (20s/cycle) while playing, scale transitions |
| Equalizer | Height 20%→100%, stagger delay 100ms per bar, linear easing |
| Container | Box shadow color changes (purple glow when playing) |
| Progress Bar | scaleX GPU-accelerated fill |
| Play Button | Spring animation, hover scale 1.05, tap scale 0.95 |
| Volume Slider | Color transition on hover (200ms) |

---

## 📦 Deployment

Deployed on **Vercel** — auto-deploys on every push to `main`.

```bash
npm run build
```
