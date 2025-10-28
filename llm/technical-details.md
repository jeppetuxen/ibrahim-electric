# Technical Details

## Website Technology Stack

### Platform
- **Original Platform**: Squarespace
- **Current State**: Static HTML (mirrored with HTTrack Website Copier on April 5, 2022)
- **Template**: Squarespace Template ID `52e96934e4b0ea14d0f64568`
- **Template Version**: 7
- **Template Name**: Home Horizon (based on body class `collection-home-horizon`)

### HTML Structure
- **Doctype**: HTML5 (`<!doctype html>`)
- **Language**: English (en-US)
- **Charset**: UTF-8
- **Viewport**: Responsive (`width=device-width, initial-scale=1`)

### CSS Framework/Classes
The site uses extensive CSS class naming conventions:
- `.sqs-*` - Squarespace-specific classes
- `.index-section` - Section containers
- `.content-fill` - Full-width content
- `.tmpl-loading` - Template loading states

### JavaScript Dependencies

#### Core Libraries
- **Squarespace Core**: Custom framework for Squarespace sites
- **MomentJS**: Date/time handling
- **CLDR Resource Pack**: Internationalization support
- **Polyfills**: Browser compatibility (@sqs/polyfiller)

#### Image Loading
- Custom ImageLoader bootstrap system
- Lazy loading with `data-src` attributes
- Responsive image handling with `data-image-dimensions` and `data-image-focal-point`

### Design Features

#### Gallery Settings
```json
{
  "gallery-design": "Grid",
  "gallery-aspect-ratio": "3:2 Standard",
  "gallery-auto-crop": "true",
  "gallery-autoplay": "false",
  "gallery-controls": "Arrows",
  "gallery-transitions": "Fade",
  "gallery-show-arrows": "true",
  "gallery-navigation": "Bullets"
}
```

#### Grid Settings
```json
{
  "grid-aspect-ratio": "1:1 (Square)",
  "gridSize": "350px",
  "gridSpacing": "20px"
}
```

#### Slideshow Settings
```json
{
  "slideshow-aspect-ratio": "16:9 (Widescreen)",
  "slideshow-autoplay": "true",
  "slideshow-transition": "Fade"
}
```

### Typography

#### Fonts
- **Abel** (weight: 400) - Likely used for headings
- **Cabin** (weights: 400, 500, 700, regular and italic) - Body text
- **Source Code Pro** (weights: 300, 400, 500, 700) - Monospace/special elements

#### Header Settings
- `headerPadding`: "30px"
- `logoWidth`: "140px"
- `siteTitleContainerWidth`: "255px"

### Navigation

#### Types
1. **Desktop Navigation** (`#mainNavigation`)
   - Shows on scroll
   - Horizontal layout

2. **Mobile Navigation** (`#mobileNavigation`)
   - Overlay menu
   - Toggle checkbox mechanism
   - Hamburger menu icon (three bars)

#### Behavior
- `homepage-index-nav`: "Show On Scroll"
- Transparent header with scroll detection
- Smooth scrolling to anchor sections

### Responsive Design

#### Breakpoints
Uses Squarespace's responsive system with:
- Desktop styles (default)
- Mobile styles (`.mobile-style-available`)
- Touch device detection (`.touch-styles`)

#### Mobile Features
- Touch detection script removes `.touch-styles` class for non-touch devices
- Mobile navigation toggle
- Responsive images with `data-load="false"` for lazy loading

### Color Settings

#### Gallery Colors
- Arrow Background: `rgba(34,34,34,1)` - Dark gray
- Arrow Color: `rgba(255,255,255,1)` - White
- Circle Color: `rgba(255,255,255,1)` - White
- Info Background: `rgba(0, 0, 0, .7)` - Semi-transparent black

### Audio Player

#### Configuration
- Style: "minimal"
- Color theme: "dark"
- Download option: disabled
- Format: MP3
- Embedded player with custom styling

### Social Integration

#### Facebook
- App ID: 314192535267336
- API Version: v6.0
- Page ID: 660179652
- Profile URL: http://www.facebook.com/131676340218233
- Icon URL: http://graph.facebook.com/660179652/picture?type=square

#### Open Graph Tags
- og:site_name
- og:title
- og:url
- og:type
- Twitter Card metadata

### Forms & Interaction

#### Available Features (may not all be active)
- Comments system (Disqus integration possible)
- Simple liking functionality
- Event RSVP
- Contact forms
- Newsletter signup

### Performance Features

#### Image Optimization
- Responsive images with multiple sizes
- Lazy loading
- Focal point positioning
- Auto-cropping

#### Script Loading
- Async/defer loading where appropriate
- Polyfills only for legacy browsers
- Modular feature loading

### Location Data

#### Business Information
- Map Zoom: 12.0
- Coordinates: 55.67235059999999, 12.550392500000044
- Address: Saxogade 4, Copenhagen 1662 V, Denmark
- Time Zone: Europe/Copenhagen (CEST/CET)
- Timezone Offset: +2 hours (7200000ms)

### Browser Compatibility

#### Supported Features
- Modern browsers with native ES6 support
- Legacy browser support via polyfills
- Cross-origin resources with CORS
- SVG icons for social media

### Security & Privacy

#### Settings
- Cookie banner: Disabled
- Restrictive cookie policy: Disabled
- Banner position/theme/variant: Not set
- HTTPS upgrade: HTTP URLs automatically upgraded to HTTPS

### SEO Features

#### Meta Tags
- Canonical URLs
- Open Graph protocol
- Twitter Cards
- Schema.org structured data (JSON-LD)
- Organization markup
- LocalBusiness markup
- WebSite markup

#### Robots
- `<meta name="ROBOTS" content="NOINDEX">` - Site is set to not be indexed

### Content Management

#### Collection Types
The site uses Squarespace's collection system:
- Type 1: Index/Homepage
- Type 2: Page
- Type 10: Contact page
- Demo collections exist but are likely not visible

### Beta Features Enabled
The site has several Squarespace beta features enabled:
- commerce_afterpay_pdp
- commerce_product_specific_reviews
- campaigns_content_editing_survey
- nested_categories_migration_enabled
- background_art_onboarding
- scheduling_block_schema_editor
- And many more commerce and campaign features

## File Statistics
- Total files: 111
- HTML pages: ~20
- MP3 audio files: ~11 unique tracks (22 copies including originals)
- CSS files: 2 main + multiple component styles
- JavaScript files: 30+ (including all modules)
- Images: 3 main local + 22+ CDN images
