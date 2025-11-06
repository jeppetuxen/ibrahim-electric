# Ibrahim Electric - React Website

Modern React-based website for Ibrahim Electric, a Danish jazz trio featuring Niclas Knudsen, Jeppe Tuxen, and Stefan Pasborg.

## Features

- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **TailwindCSS** for styling with custom design system
- **Audio Player** with global state management
  - Collapsible vinyl-style player in bottom right
  - Custom play/pause, next, previous controls
  - Rotating vinyl animation synced to playback
  - Playlist with 11 tracks
- **Ken Burns Effect** on image carousels
- **Responsive Design** for mobile and desktop
- **Animated Transitions** throughout

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx          # Main navigation bar
│   ├── StickyAudioPlayer.jsx   # Floating vinyl player
│   ├── Carousel.jsx             # Ken Burns carousel
│   └── Footer.jsx               # Site footer
├── pages/
│   ├── Home.jsx                 # Main page (intro, band, music, live)
│   ├── TourDates.jsx            # Tour dates listing
│   └── Contact.jsx              # Contact information
├── context/
│   └── AudioContext.jsx         # Global audio player state
├── App.jsx                      # Main app component with routing
├── main.jsx                     # React entry point
└── index.css                    # Global styles + Tailwind

public/
├── images/                      # Press photos and album art
└── audio/                       # MP3 tracks
```

## Installation

```bash
cd ibrahim-react
npm install
```

## Development

```bash
npm run dev
```

Opens on http://localhost:5173

## Build for Production

```bash
npm run build
```

Output in `dist/` directory

## Technologies

- React 18
- Vite 7
- React Router DOM 7
- TailwindCSS 3
- HTML5 Audio API

## Key Components

### AudioContext
Global state management for audio playback. Provides:
- Track selection and playback
- Play/pause/next/previous controls
- Player visibility and expansion state
- Sync across all components

### StickyAudioPlayer
Floating player in bottom right corner:
- **Collapsed**: 80px rotating vinyl icon
- **Expanded**: 450px pill with track info and controls
- Smooth expand/collapse transitions
- Orange accent colors matching brand

### Carousel
Ken Burns effect on press photos:
- 7 different zoom/pan animations
- Configurable interval timing
- Smooth opacity fades between slides

### Navigation
Fixed header with:
- Transparent initial state
- Semi-transparent on scroll with blur
- Mobile hamburger menu
- Smooth scroll to sections

## Styling

Custom design system with:
- **Colors**: Orange (#FF8C00) accent, black background
- **Fonts**: Abel (headings), Cabin (body), Source Code Pro (code)
- **Animations**: Fade-ins, slides, Ken Burns effects
- **Components**: Cards, buttons, forms with consistent styling

## Audio Tracks

11 tracks included:
1. Attack From Above
2. Big Boss
3. Belzebup
4. Absinthe
5. Endangered Beat
6. Funkorific
7. Der Alte Das Boot
8. Yamshala
9. Fela
10. Borat
11. Partyman

## Pages

- **Home** (`/`) - Full homepage with all sections
- **Tour Dates** (`/tour`) - Concert listings
- **Contact** (`/contact`) - Contact information and social links

## License

© Ibrahim Electric
