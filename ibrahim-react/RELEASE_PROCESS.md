# Music Release Process

## How Timed Releases Work

Singles are configured with release dates in `src/context/AudioContext.jsx`. The app uses the user's local browser clock to determine if a track is available.

### Release Times

Currently, releases happen at **midnight (00:00:00)** in the user's timezone on the specified date.

To set a specific release time (e.g., 12:00 noon UTC), use:
```javascript
releaseDate: new Date('2025-12-04T12:00:00Z')
```

## Protecting Unreleased Music

**IMPORTANT**: Music files in the `public/` folder are publicly accessible to anyone who knows the URL. To prevent early downloads:

### Before Release Date

1. Keep unreleased MP3 files in the `unreleased-music/` folder (not in `public/`)
2. The tracks will still appear in the UI with release dates, but won't be downloadable
3. Users will see "Available Dec 4, 2025" but cannot play or download

### On Release Day

When a single is ready to release:

```bash
# Move the file to public folder
mv unreleased-music/cheyenne.mp3 public/music/fast-fire/

# Deploy the updated site
make deploy
```

The track will automatically become playable once the release date/time passes.

## Current Singles Status

### Released (in public/music/fast-fire/)
- fast-fire.mp3 - Released Nov 28, 2025
- shuffle-corn.mp3 - Released Nov 28, 2025

### Unreleased (in unreleased-music/)
- cheyenne.mp3 - Releases Dec 4, 2025
- flambino.mp3 - Releases Dec 10, 2025

## Release Checklist

When releasing a new single:

- [ ] Move MP3 from `unreleased-music/` to `public/music/fast-fire/`
- [ ] Verify the release date in `src/context/AudioContext.jsx`
- [ ] Update streaming links using `/update-streaming-links` command
- [ ] Build and deploy: `make deploy`
- [ ] Test on live site after deployment
