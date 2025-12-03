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
