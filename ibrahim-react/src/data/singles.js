// Platform templates with icon images
export const platformTemplates = {
  spotify: { name: 'Spotify', icon: '/platform-icons/spotify.png' },
  appleMusic: { name: 'Apple Music', icon: '/platform-icons/applemusic.png' },
  youtube: { name: 'YouTube', icon: '/platform-icons/youtube.png' },
  tidal: { name: 'Tidal', icon: '/platform-icons/tidal.png' },
  deezer: { name: 'Deezer', icon: '/platform-icons/deezer.png' },
  amazon: { name: 'Amazon Music', icon: '/platform-icons/amazon.png' },
};

// Helper function to create platform link
const createPlatform = (template, url) => ({ ...platformTemplates[template], url });

// Singles data
export const singlesData = {
  'shuffle-corn': {
    title: 'Shuffle Corn',
    releaseDate: new Date('2025-11-28'),
    artwork: '/images/fast-fire-cover.png',
    platforms: [
      createPlatform('spotify', 'https://open.spotify.com/track/4I2YNMa508x4mI4V64NGB4'),
      createPlatform('appleMusic', 'https://music.apple.com/dk/album/shuffle-corn-single/1855232046'),
      createPlatform('deezer', 'https://link.deezer.com/s/31JejBi1IBtZue2vdoTq3'),
      createPlatform('tidal', 'https://tidal.com/track/475271369/u'),
      createPlatform('amazon', 'https://www.amazon.com/music/player/albums/B0G2Z5QFQY'),
      createPlatform('youtube', 'https://youtu.be/IKbZG1LvRdI'),
    ]
  },
  'fast-fire': {
    title: 'Fast Fire',
    releaseDate: new Date('2025-11-28'),
    artwork: '/images/fast-fire-cover.png',
    platforms: [
      createPlatform('spotify', 'https://open.spotify.com/track/1omislCGiJ58V4f4lu4xbA'),
      createPlatform('appleMusic', 'https://music.apple.com/dk/album/fast-fire-single/1855143142'),
      createPlatform('deezer', 'https://link.deezer.com/s/31JekTOtcDWujd7WXClKH'),
      createPlatform('tidal', 'https://tidal.com/track/475270890/u'),
      createPlatform('amazon', 'https://www.amazon.com/music/player/albums/B0G2Z4H3W7'),
      createPlatform('youtube', 'https://youtu.be/NA6JnUGk1mw'),
    ]
  },
  'cheyenne': {
    title: 'Cheyenne',
    releaseDate: new Date('2025-12-04'),
    artwork: '/images/fast-fire-cover.png',
    platforms: []
  },
  'flambino': {
    title: 'Flambino',
    releaseDate: new Date('2025-12-10'),
    artwork: '/images/fast-fire-cover.png',
    platforms: []
  }
};

// Get all singles as an array (sorted by release date)
export const getSinglesArray = () => {
  return Object.entries(singlesData).map(([id, data]) => ({
    id,
    ...data
  })).sort((a, b) => b.releaseDate - a.releaseDate);
};

// Check if a single is released
export const isSingleReleased = (single) => {
  const now = new Date();
  return single.releaseDate <= now;
};
