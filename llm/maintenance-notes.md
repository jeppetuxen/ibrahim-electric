# Maintenance Notes

## Current State

### Mirror Status
- **Created**: April 5, 2022
- **Tool Used**: HTTrack Website Copier/3.x [XR&CO'2014]
- **Source**: www.ibrahimelectric.com (Squarespace hosted)
- **Type**: Static HTML mirror
- **Last Content Update**: November 17, 2021 (contentModifiedOn: 1637162488918)

### Disabled Features

Several navigation links and buttons are commented out in the HTML:

#### Index Page
- "more about the band" button (Band section)
- "more music / discography" button (Music section)
- "VIew Upcoming Shows" button (Live section)

#### Navigation Menu
Many navigation items are commented out:
- Home section anchors (on non-index pages)
- Media page link
- Albums page link
- Contact / Press page link

This suggests the site may have been simplified or is in a transitional state.

## Known Issues

### 1. SEO Blocking
The site has `<meta name="ROBOTS" content="NOINDEX">` which prevents search engine indexing. This should be removed if the site is meant to be discoverable.

### 2. Broken Navigation
Many internal links are commented out, which may confuse users trying to navigate the site.

### 3. External Dependencies
The site still references many external Squarespace CDN resources, though most are mirrored locally. Some may fail if accessed without the local assets.

### 4. YouTube Embeds
The `_/www.youtube.com/embed/` directory exists but actual video content is not stored locally. Videos will only work if:
- The YouTube videos are still available
- User has internet connection

## Recommendations for Updates

### Content Updates

#### High Priority
1. **Update Tour Dates**: Latest dates are from 2022. Add current/upcoming shows.
2. **Re-enable Navigation**: Uncomment navigation links if other pages should be accessible.
3. **Update Press Materials**: Ensure Dropbox links are current and working.
4. **SEO Meta Tags**: Remove NOINDEX if site should be searchable.

#### Medium Priority
1. **Add New Music**: If there are albums released after "Rumours From Outer Space"
2. **Update Band Photos**: Current photos are from 2015-2020
3. **Add Video Content**: Consider embedding recent performance videos
4. **Update Press Quotes**: Add any recent reviews

#### Low Priority
1. **Modernize Design**: Consider updating from Squarespace Template v7
2. **Add Newsletter Signup**: Currently disabled but infrastructure exists
3. **Enable Comments**: If community engagement is desired

### Technical Improvements

#### Immediate
1. **Fix Asset Paths**: Ensure all local assets load correctly
2. **Test All Links**: Verify internal and external links work
3. **Mobile Testing**: Test responsive design on various devices
4. **Remove HTTrack Comments**: Clean up `<!-- Mirrored by HTTrack -->` comments

#### Future
1. **Convert to Modern Framework**: Consider React, Vue, or similar
2. **Implement CMS**: For easier content updates
3. **Optimize Images**: Convert to modern formats (WebP, AVIF)
4. **Reduce Dependencies**: Remove unused Squarespace modules
5. **Add Analytics**: Track visitor behavior if desired
6. **SSL Certificate**: Ensure HTTPS is properly configured

## File Management

### Files to Keep
- All HTML pages
- All images in `assets/images/`
- All MP3 files
- Main CSS file
- Main JS bundle
- Google Fonts CSS

### Files That Could Be Removed
- HTTrack cache (`hts-cache/`)
- HTTrack log (`hts-log.txt`)
- Duplicate MP3s in `/original/` subdirectories (if space is a concern)
- Unused Squarespace module scripts
- `.idea/` directory (IDE configuration)
- `cookies.txt`

### Files to Update Regularly
- `livetour.html` and individual tour date pages
- `index.html` (for band bio updates)
- Press materials linked from `contact.html`
- Music samples if new albums are released

## Backup Recommendations

### What to Backup
1. **Original HTML files** (before any modifications)
2. **All MP3 audio files** (unique content)
3. **All images** (especially original high-res photos)
4. **Contact information** (email addresses, links)

### Backup Schedule
- Before any major changes
- When adding new content
- At least quarterly for peace of mind

## Testing Checklist

Before deploying any updates:

### Functionality
- [ ] All internal links work
- [ ] All external links work (or are appropriately handled if broken)
- [ ] Audio player works on all tracks
- [ ] Image loading works (lazy loading functions properly)
- [ ] Mobile navigation toggle works
- [ ] Contact form submissions work (if enabled)
- [ ] Social media links work

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Testing
- [ ] Mobile phone (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Large screens (1920px+)

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] No broken resources (404s)

## Contact Information Verification

Periodically verify these contacts are still current:

### Band Members
- Niclas Knudsen: mail@niclasknudsen.com
- Stefan Pasborg: stefan@pasborg.dk
- Jeppe Tuxen: jeppetuxen@gmail.com

### Management
- General: mail@ibrahimelectric.com
- Spain: ivanpivotti@gmail.com
- International: kjellkalleklev1@gmail.com

### External Links
- Facebook page: http://www.facebook.com/131676340218233
- Member websites:
  - www.niclasknudsen.com
  - www.pasborg.dk
  - www.jeppetuxen.com
- Press materials on Dropbox (3 links)

## Version History

### Current Version (Mirrored April 5, 2022)
- Squarespace Template v7
- Content last updated: November 17, 2021
- Static HTML mirror

### Future Versions
Consider adding a changelog if making regular updates to track:
- Date of update
- Changes made
- Updated by whom
- Reason for update
