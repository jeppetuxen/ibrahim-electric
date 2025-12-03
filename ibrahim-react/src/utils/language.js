/**
 * Language detection and localization utilities
 */

/**
 * Detect user's preferred language
 * @returns {string} Language code ('da' for Danish, 'en' for English)
 */
export const detectUserLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.toLowerCase().startsWith('da') ? 'da' : 'en';
};

/**
 * Get localized language code (defaults to English if not Danish)
 * @returns {string} 'da' or 'en'
 */
export const getLanguageCode = () => {
  return detectUserLanguage();
};
