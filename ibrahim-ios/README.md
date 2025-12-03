# Ibrahim Electric iOS App

A native iOS app for Ibrahim Electric featuring music playback, tour dates, and contact information.

## Features

- **Home**: Quotes and new release information
- **Music**: Track list with animated equalizer indicator
- **Live**: Upcoming and past tour dates
- **Contact**: Booking, press, and management contact information
- **Audio Player**: Sticky vinyl player with playback controls

## Requirements

- iOS 15.0+
- Xcode 13.0+
- Swift 5.5+

## Project Structure

```
IbrahimElectric/
├── IbrahimElectricApp.swift    # Main app entry point
├── ContentView.swift            # Tab navigation coordinator
├── Models/
│   ├── Track.swift             # Track data model
│   └── TourDate.swift          # Tour date model
├── Views/
│   ├── HomeView.swift          # Home screen
│   ├── MusicView.swift         # Music/track list
│   ├── TourDatesView.swift     # Tour dates listing
│   ├── ContactView.swift       # Contact information
│   └── VinylPlayerView.swift   # Sticky vinyl player
├── Audio/
│   └── AudioPlayerManager.swift # Audio playback manager
├── Utilities/
│   └── ColorExtension.swift    # Color hex utility
└── Resources/
    ├── Images/                 # Album covers and images
    └── Audio/                  # MP3 audio files
```

## Setup

### 1. Create Xcode Project

1. Open Xcode
2. Create a new iOS App project
3. Set the product name to "IbrahimElectric"
4. Choose SwiftUI for Interface and Swift for Language
5. Set deployment target to iOS 15.0

### 2. Add Project Files

1. Drag all Swift files from this directory into your Xcode project
2. Drag the `Resources` folder into your Xcode project
3. **Important**: When adding the Resources folder, make sure to:
   - Check "Copy items if needed"
   - Select "Create folder references" (not "Create groups")
   - Add to target: IbrahimElectric

All assets are already included:
- **Resources/Images/**: 9 album covers, header image, and Fast Fire cover
- **Resources/Audio/**: All 11 MP3 tracks (~75MB total)

### 3. Build and Run

1. Select a simulator or device (iPhone 12 or later recommended)
2. Press ⌘+R to build and run

**Note**: The app will work in the simulator, but audio playback works best on a real device.

## Architecture

### Audio Playback

The app uses `AVFoundation` with `AVPlayer` for audio playback. The `AudioPlayerManager` class:

- Manages the audio player state using `@Published` properties
- Handles track progression and playlist management
- Provides playback controls (play/pause, next, previous, seek)
- Automatically advances to the next track when a song finishes

### UI Components

Built entirely with SwiftUI:

- **TabView**: Main navigation between sections
- **VinylPlayerView**: Animated vinyl record player with expandable controls
- **EqualizerView**: Animated equalizer bars that show on playing tracks
- **QuoteCard**: Reusable quote component for the home screen

### State Management

Uses SwiftUI's built-in state management:

- `@StateObject` for the audio player manager
- `@EnvironmentObject` for sharing audio player state across views
- `@Published` for reactive updates

## Customization

### Colors

The app uses the signature Ibrahim Electric orange (#FF8C00). To change the accent color, update all references to `Color(hex: "FF8C00")`.

### Tracks

Edit `Models/Track.swift` to add or modify tracks in the `sampleTracks` array.

### Tour Dates

Edit `Models/TourDate.swift` to update upcoming shows and past shows.

## License

© Ibrahim Electric. All rights reserved.
