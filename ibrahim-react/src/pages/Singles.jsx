import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { singlesData } from '../data/singles';
import { vinylShop } from '../data/links';
import { getLanguageCode } from '../utils/language';

const Singles = () => {
  const [vinylUrl, setVinylUrl] = useState(vinylShop.getUrl());

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set localized vinyl URL
    setVinylUrl(vinylShop.getUrl(getLanguageCode()));
  }, []);

  const now = new Date();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black page-transition-enter">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-heading text-center mb-2 tracking-wide text-accent-orange">
          NEW ALBUM - FAST FIRE
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading text-center mb-12 text-white">
          Singles
        </h2>

        {/* Vinyl Preorder CTA - Compact */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-accent-orange via-accent-amber to-yellow-500 p-1 rounded-xl shadow-2xl max-w-2xl mx-auto">
            <div className="bg-black p-6 md:p-8 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <svg className="w-16 h-16 text-accent-orange" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                  </svg>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-heading text-white mb-2">
                    Get the Real Thing
                  </h3>
                  <p className="text-gray-300 mb-1">
                    Vinyl Available for Preorder
                  </p>
                  <p className="text-gray-400 text-sm">
                    Release Date: December 6, 2025
                  </p>
                </div>
                <div>
                  <a
                    href={vinylUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-accent-orange to-accent-amber text-white text-lg font-bold px-8 py-4 rounded-full btn-modern transition-all duration-300 hover:scale-110 hover:shadow-2xl whitespace-nowrap"
                  >
                    PREORDER VINYL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Singles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {Object.entries(singlesData).map(([key, single]) => {
            const singleReleased = single.releaseDate <= now;
            const CardWrapper = singleReleased ? Link : 'div';
            const cardProps = singleReleased ? { to: `/singles/${key}` } : {};

            return (
              <CardWrapper
                key={key}
                {...cardProps}
                className={`relative overflow-hidden rounded-xl transition-all duration-300 block ${
                  !singleReleased
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:scale-105 hover:shadow-2xl'
                }`}
              >
                <div className="aspect-square relative">
                  <img
                    src={single.artwork}
                    alt={single.title}
                    className={`w-full h-full object-cover ${!singleReleased ? 'opacity-40' : ''}`}
                  />
                  {!singleReleased && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-heading text-white mb-2">COMING SOON</div>
                        <div className="text-gray-300">{formatDate(single.releaseDate)}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`p-6 ${singleReleased ? 'bg-gray-900' : 'bg-gray-950'} border-t-4 border-gray-800`}>
                  <h3 className={`text-2xl font-heading mb-2 ${singleReleased ? 'text-white' : 'text-gray-600'}`}>
                    {single.title}
                  </h3>
                  <p className={`text-sm ${singleReleased ? 'text-gray-400' : 'text-gray-600'}`}>
                    {singleReleased ? 'Available Now' : `Releases ${formatDate(single.releaseDate)}`}
                  </p>
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Info Text */}
        <div className="mb-8 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Click on a single to view streaming links
          </p>
        </div>

        {/* Bottom Vinyl Reminder */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Digital is great, but vinyl is forever.
          </p>
          <a
            href={vinylUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent-orange hover:text-white transition-colors duration-300 text-lg font-medium underline"
          >
            Order your vinyl copy →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Singles;
