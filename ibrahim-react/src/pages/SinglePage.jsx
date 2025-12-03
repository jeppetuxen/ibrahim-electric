import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { trackSinglePageVisit, trackVinylClick, trackStreamingClick } from '../utils/analytics';
import { singlesData } from '../data/singles';
import { vinylShop } from '../data/links';
import { getLanguageCode } from '../utils/language';

const SinglePage = () => {
  const { singleId } = useParams();
  const [vinylUrl, setVinylUrl] = useState(vinylShop.getUrl());

  const single = singlesData[singleId];

  // If single doesn't exist, redirect to home or show 404
  if (!single) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const now = new Date();
  const isReleased = single.releaseDate <= now;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track single page visit
    trackSinglePageVisit(single.title, isReleased);

    // Set localized vinyl URL
    setVinylUrl(vinylShop.getUrl(getLanguageCode()));

    // Set Open Graph meta tags for social media sharing
    const metaTags = [
      { property: 'og:title', content: `${single.title} - Ibrahim Electric` },
      { property: 'og:description', content: `Listen to ${single.title} by Ibrahim Electric. ${isReleased ? 'Stream now on all platforms.' : `Coming ${formatDate(single.releaseDate)}`}` },
      { property: 'og:image', content: `${window.location.origin}${single.artwork}` },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'music.song' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${single.title} - Ibrahim Electric` },
      { name: 'twitter:description', content: `Listen to ${single.title} by Ibrahim Electric` },
      { name: 'twitter:image', content: `${window.location.origin}${single.artwork}` },
    ];

    // Remove existing meta tags
    const existingTags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
    existingTags.forEach(tag => tag.remove());

    // Add new meta tags
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) meta.setAttribute('property', tag.property);
      if (tag.name) meta.setAttribute('name', tag.name);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    // Update page title
    document.title = `${single.title} - Ibrahim Electric`;

    // Cleanup function
    return () => {
      const tagsToRemove = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
      tagsToRemove.forEach(tag => tag.remove());
      document.title = 'Ibrahim Electric';
    };
  }, [single.title, single.artwork, single.releaseDate, isReleased]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Blurred Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${single.artwork})`,
          filter: 'blur(40px)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="fixed inset-0 bg-black bg-opacity-70" />

      {/* Content Container */}
      <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          {/* Album Cover */}
          <div className="mb-6">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img
                src={single.artwork}
                alt={single.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-heading text-center mb-8 text-white">
            {single.title}
          </h1>

          {/* Streaming Platform Links */}
          {isReleased && single.platforms.length > 0 ? (
            <div className="space-y-3">
              {/* Buy Vinyl CTA */}
              <a
                href={vinylUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackVinylClick(single.title, 'single-page')}
                className="group flex items-center justify-between bg-gradient-to-r from-accent-orange to-accent-amber p-3 rounded-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded flex items-center justify-center bg-white bg-opacity-20">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                      <circle cx="12" cy="12" r="4" fill="currentColor"/>
                      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Get the Real Thing</div>
                    <div className="text-white text-xs opacity-90">Limited Edition Vinyl</div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 text-white text-xs font-bold px-4 py-2 rounded">
                  BUY
                </div>
              </a>

              {/* Streaming Platforms */}
              {single.platforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackStreamingClick(platform.name, single.title, platform.url)}
                  className="group flex items-center justify-between bg-gray-900 bg-opacity-80 p-3 rounded-lg border border-gray-800 transition-all duration-300 hover:bg-opacity-100 hover:border-accent-orange"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-white">
                      <img src={platform.icon} alt={platform.name} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-white font-medium text-sm">
                      {platform.name}
                    </div>
                  </div>
                  <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded group-hover:bg-accent-orange group-hover:text-white transition-colors">
                    PLAY
                  </div>
                </a>
              ))}
            </div>
          ) : !isReleased ? (
            <div className="text-center bg-gray-900 bg-opacity-80 p-6 rounded-lg">
              <p className="text-gray-400 text-sm">
                Streaming links available on release date
              </p>
            </div>
          ) : null}

          {/* Footer */}
          <div className="mt-12 text-center space-y-4">
            <div className="text-gray-400 text-xs">
              <p className="mb-2">Digital is convenient, but vinyl is forever.</p>
              <a
                href={vinylUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackVinylClick(single.title, 'single-page-footer')}
                className="text-accent-orange hover:text-white transition-colors underline"
              >
                Get your vinyl copy here
              </a>
            </div>
            <div className="text-gray-500 text-xs pt-4 border-t border-gray-800">
              © {new Date().getFullYear()} Ibrahim Electric. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
