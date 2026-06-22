import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Add noindex meta tag
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black page-transition-enter">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-heading text-center mb-8 tracking-wide text-accent-orange">
          PRESS
        </h1>

        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Press materials for bookers, venues, and media. Choose your region to access press documents, high-resolution photos, and technical information.
        </p>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* International Press */}
          <Link
            to="/press/en"
            className="group bg-gray-900 p-8 rounded-xl border-2 border-gray-800 hover:border-accent-orange transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-heading text-white mb-3 group-hover:text-accent-orange transition-colors duration-300">
                INTERNATIONAL
              </h2>
              <p className="text-gray-400 mb-6">
                Press materials in English for international bookers, venues, and media
              </p>
              <div className="inline-flex items-center text-accent-orange font-bold">
                View Materials
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Danish Press */}
          <Link
            to="/press/dk"
            className="group bg-gray-900 p-8 rounded-xl border-2 border-gray-800 hover:border-accent-orange transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-heading text-white mb-3 group-hover:text-accent-orange transition-colors duration-300">
                DANISH
              </h2>
              <p className="text-gray-400 mb-6">
                Press materials in Danish for local bookers, venues, and media
              </p>
              <div className="inline-flex items-center text-accent-orange font-bold">
                View Materials
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Contact for Press */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">For press inquiries, please contact:</p>
          <a
            href="mailto:mail@ibrahimelectric.com"
            className="text-accent-orange hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            mail@ibrahimelectric.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Press;
