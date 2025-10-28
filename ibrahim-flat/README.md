# Ibrahim Electric - Flat HTML Website

A modern, clean, flat HTML version of the Ibrahim Electric website using Tailwind CSS.

## Features

- **No JavaScript libraries** - Only minimal vanilla JS for mobile menu toggle
- **Tailwind CSS** - Modern utility-first CSS framework (via CDN)
- **Flat structure** - Simple, easy-to-navigate file organization
- **Native HTML5 audio** - No complex audio player libraries
- **Responsive design** - Works on all devices
- **Fast loading** - Minimal dependencies

## File Structure

```
ibrahim-flat/
├── index.html          # Main homepage (single-page with sections)
├── livetour.html       # Tour dates and live performances
├── contact.html        # Contact information and press materials
├── images/             # All images (3 files, ~4MB total)
│   ├── _OFF9682bw.jpg
│   ├── 1500x1500_300dpi.jpg
│   └── Ibreahim+Electric+505.jpg
├── audio/              # All MP3 tracks (11 files, ~77MB total)
│   ├── 01+ATTACK+FROM+ABOVE.mp3
│   ├── 01+ENDANGERED+BEAT.mp3
│   ├── 01+Funkorific+1.mp3
│   ├── 02+BELZEBUP.mp3
│   ├── 02+BIG+BOSS.mp3
│   ├── 02+DER+ALTE+DAS+BOOT.mp3
│   ├── 02+YAMSHALA.mp3
│   ├── 07+ABSINTHE.mp3
│   ├── 07+FELA.mp3
│   ├── 10+BORAT.mp3
│   └── 10+Partyman.mp3
└── README.md           # This file
```

## Pages

### index.html
Main homepage featuring:
- Intro section with press quotes
- Band biography and member information
- Music section with audio samples
- Live section with call-to-action
- Responsive navigation
- Footer with contact info and social links

### livetour.html
Tour dates page featuring:
- 2022 tour dates (3 events)
- 2020 tour dates (12 events)
- Clean, organized layout by year
- Each event shows date, venue, and location

### contact.html
Contact and press page featuring:
- Downloadable press materials (English/Danish PDFs, photos)
- Booking and management contact information
- Individual band member contact details
- Links to band member websites

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Via CDN (https://cdn.tailwindcss.com)
- **Minimal JavaScript** - Only for mobile menu toggle (~10 lines)
- **Native HTML5 Audio** - For music playback

## Deployment

This is a static website that can be deployed to any web server or hosting service:

### Option 1: Simple HTTP Server (for testing)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

### Option 2: Deploy to Static Hosting
Upload all files to any of these services:
- **Netlify** - Drag and drop the folder
- **Vercel** - Connect via Git or upload
- **GitHub Pages** - Push to a repository
- **Cloudflare Pages** - Direct upload or Git integration
- **Any traditional web hosting** - Via FTP/SFTP

## Browser Support

Works in all modern browsers:
- Chrome/Edge (Chromium) - Latest
- Firefox - Latest
- Safari - Latest (macOS/iOS)
- Mobile browsers - All modern versions

## Customization

### Colors
The site uses a black and white color scheme. To customize:
- Edit Tailwind classes in HTML files
- Main background: `bg-black`
- Text: `text-white`, `text-gray-300`, `text-gray-400`
- Accents: `bg-gray-900`, `bg-gray-800`

### Content
All content is directly in the HTML files - no database or CMS needed:
- Edit text directly in HTML
- Replace images in the `/images` folder
- Add/replace audio in the `/audio` folder

## Performance

- Total size: ~81MB (mostly audio files)
- Page load: < 100KB (HTML + Tailwind CSS)
- Audio files load on demand
- Images optimized and lazy-loaded by browser

## Notes

- The mobile menu requires JavaScript to toggle visibility
- Audio player uses native browser controls (no custom player)
- External links (press materials) point to Dropbox
- Facebook integration uses only a link (no SDK)
- All pages are independent - no shared templates or build process

## Original Website

This is a modern, flat HTML conversion of the original Ibrahim Electric Squarespace website.
The original site was mirrored on April 5, 2022 from www.ibrahimelectric.com.

## License

Content © Ibrahim Electric. Website code is for use by Ibrahim Electric.

---

**Ibrahim Electric**
Danish Jazz Trio
- Niclas Knudsen / Guitar
- Jeppe Tuxen / Hammond B3
- Stefan Pasborg / Drums

Contact: mail@ibrahimelectric.com
