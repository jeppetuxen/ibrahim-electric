/**
 * Google Analytics 4 utility functions
 * Provides easy-to-use functions for tracking page views and events
 */

/**
 * Track a page view
 * @param {string} path - The page path (e.g., '/singles/fast-fire')
 * @param {string} title - The page title
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Track streaming platform click
 * @param {string} platform - Platform name (e.g., 'Spotify', 'Apple Music')
 * @param {string} singleTitle - The single title
 * @param {string} url - The platform URL
 */
export const trackStreamingClick = (platform, singleTitle, url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'streaming_platform_click', {
      platform: platform,
      single: singleTitle,
      url: url,
      event_category: 'engagement',
      event_label: `${platform} - ${singleTitle}`,
    });
  }
};

/**
 * Track vinyl CTA click
 * @param {string} singleTitle - The single title (if applicable)
 * @param {string} location - Where the CTA was clicked from (e.g., 'home', 'single-page')
 */
export const trackVinylClick = (singleTitle, location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'vinyl_cta_click', {
      single: singleTitle,
      location: location,
      event_category: 'engagement',
      event_label: `Vinyl CTA - ${location}${singleTitle ? ` - ${singleTitle}` : ''}`,
    });
  }
};

/**
 * Track single page visit
 * @param {string} singleTitle - The single title
 * @param {boolean} isReleased - Whether the single is released
 */
export const trackSinglePageVisit = (singleTitle, isReleased) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'single_page_visit', {
      single: singleTitle,
      is_released: isReleased,
      event_category: 'engagement',
      event_label: `Single Page - ${singleTitle} - ${isReleased ? 'Released' : 'Pre-release'}`,
    });
  }
};

/**
 * Track audio player interaction
 * @param {string} action - The action performed (e.g., 'play', 'pause', 'stop')
 * @param {string} trackTitle - The track title
 */
export const trackAudioPlayer = (action, trackTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'audio_player_interaction', {
      action: action,
      track: trackTitle,
      event_category: 'engagement',
      event_label: `Audio Player - ${action} - ${trackTitle}`,
    });
  }
};

/**
 * Track navigation click
 * @param {string} destination - The navigation destination (e.g., 'home', 'tour-dates', 'contact')
 */
export const trackNavigation = (destination) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navigation_click', {
      destination: destination,
      event_category: 'navigation',
      event_label: `Navigation - ${destination}`,
    });
  }
};

/**
 * Track external link click
 * @param {string} url - The external URL
 * @param {string} label - A label for the link (e.g., 'Facebook', 'Instagram')
 */
export const trackExternalLink = (url, label) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'external_link_click', {
      url: url,
      link_label: label,
      event_category: 'engagement',
      event_label: `External Link - ${label}`,
    });
  }
};

/**
 * Track hero carousel slide change
 * @param {number} slideIndex - The slide index (0-based)
 * @param {string} slideName - Name/description of the slide
 * @param {string} method - How the slide was changed ('auto', 'indicator_click')
 */
export const trackHeroSlideChange = (slideIndex, slideName, method) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'hero_slide_change', {
      slide_index: slideIndex,
      slide_name: slideName,
      method: method,
      event_category: 'engagement',
      event_label: `Hero Slide - ${slideName} (${method})`,
    });
  }
};

/**
 * Track hero CTA click
 * @param {string} ctaName - Name of the CTA (e.g., 'Get Tickets Now', 'See Tour Dates')
 * @param {string} destination - The URL or destination
 * @param {string} slideName - Which slide the CTA is on
 */
export const trackHeroCtaClick = (ctaName, destination, slideName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'hero_cta_click', {
      cta_name: ctaName,
      destination: destination,
      slide_name: slideName,
      event_category: 'engagement',
      event_label: `Hero CTA - ${ctaName} - ${slideName}`,
    });
  }
};

/**
 * Track ticket purchase click
 * @param {string} event - Event name (e.g., 'Copenhagen Jazz Festival 2026')
 * @param {string} venue - Venue name
 * @param {string} url - Ticket URL
 */
export const trackTicketClick = (event, venue, url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ticket_click', {
      event_name: event,
      venue: venue,
      url: url,
      event_category: 'conversion',
      event_label: `Ticket - ${venue} - ${event}`,
    });
  }
};
