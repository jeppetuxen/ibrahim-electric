/**
 * Centralized external links and URLs
 */

// Vinyl shop configuration
export const vinylShop = {
  baseUrl: 'https://gatewaymusicshop.dk',
  album: 'fast-fire',

  /**
   * Get localized vinyl shop URL
   * @param {string} langCode - Language code ('da' or 'en')
   * @returns {string} Full vinyl shop URL
   */
  getUrl: (langCode = 'en') => {
    return `${vinylShop.baseUrl}/${langCode}/music/${vinylShop.album}`;
  }
};

// Ticket vendors
export const ticketVendors = {
  billetlugen: {
    base: 'https://www.billetlugen.dk',
    ibrahimElectric: 'https://www.billetlugen.dk/noapp/artist/ibrahim-electric/?affiliate=HC9'
  }
};

// External platforms
export const externalPlatforms = {
  sleeveFm: 'https://sleeve.fm/artists/ibrahimelectric'
};
