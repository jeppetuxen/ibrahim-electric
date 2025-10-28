# Directory Structure

## Root Level Files
- `index.html` - Main homepage (single-page design with multiple sections)
- `index2.html` - Alternative index page
- `backblue.gif` - Background graphic
- `fade.gif` - Fade graphic
- `cookies.txt` - Cookie tracking file
- `hts-log.txt` - HTTrack log file
- `todo_ibrahim.org` - Project todo list

## Main Website Directory: `www.ibrahimelectric.com/`

### HTML Pages
```
www.ibrahimelectric.com/
├── index.html          # Main homepage with sections (intro, band, music, live)
├── livetour.html       # Live tour dates listing page
├── contact.html        # Contact and press information page
└── musicall.html       # Music/discography page
```

### Live Tour Structure
The livetour section is organized hierarchically by date:
```
livetour/
├── 2020/
│   ├── 2/1/          # February events
│   ├── 3/26/         # March events
│   ├── 3/27/
│   ├── 4/15/         # April events
│   ├── 4/17/
│   ├── 4/18/
│   ├── 4/30/
│   ├── 5/1/          # May events
│   ├── 5/2/
│   ├── 6/19/         # June events
│   ├── 7/5/          # July events
│   └── 7/6/
└── 2022/
    ├── 2/4/          # February 2022 events
    ├── 2/5/
    └── 3/11/         # March 2022 events
```

Each event directory contains an HTML page with event details.

### Assets Directory Structure
```
assets/
├── images/                           # Local images
│   ├── _OFF9682bw.jpg               # Band photo (845KB)
│   ├── 1500x1500_300dpi.jpg         # Album artwork (1.3MB)
│   └── Ibreahim+Electric+505.jpg    # Live photo (1.9MB)
│
├── images.squarespace-cdn.com/       # CDN images
│   └── content/v1/552951e9e4b03a9e558456a8/
│       └── [timestamped directories with images]
│
├── static1.squarespace.com/          # Static assets
│   └── static/
│       ├── 552951e9e4b03a9e558456a8/t/  # Timestamped content
│       │   └── [MP3 files and media]
│       └── sitecss/
│           └── [CSS files]
│
├── assets.squarespace.com/           # Squarespace core assets
│   ├── @sqs/polyfiller/             # JavaScript polyfills
│   └── universal/                    # Universal scripts and styles
│       ├── scripts-compressed/
│       └── styles-compressed/
│
├── fonts.googleapis.com/             # Google Fonts
│   └── css2f060.css
│
└── _/www.youtube.com/                # YouTube embeds
    └── embed/
```

## HTTrack Cache
```
hts-cache/
└── [cached mirror files]
```

## IDE Configuration
```
.idea/                                # IntelliJ IDEA configuration
└── inspectionProfiles/
```

## Supporting Directories
- `one/` - Unknown purpose (backup?)
- `one-bck/` - Backup directory
