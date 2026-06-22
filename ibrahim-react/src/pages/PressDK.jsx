import { useEffect } from 'react';

const PressDK = () => {
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

  const pressKits = [
    {
      title: 'Fast Fire Press Kit',
      description: 'New album press information (2025)',
      file: '/press/dk/Ibrahim electric - Fast fire.pdf',
      filename: 'Ibrahim-Electric-Fast-Fire-Press-Kit.pdf'
    },
    {
      title: 'Press Kit 2025',
      description: 'Complete press information and bio',
      file: '/press/dk/IBRAHIM ELECTRIC press 2025.pdf',
      filename: 'Ibrahim-Electric-Press-Kit-2025.pdf'
    },
    {
      title: 'Technical Rider',
      description: 'Stage setup and technical requirements',
      file: '/press/dk/Ibrahim Electric Rider + Kanalplan.pdf',
      filename: 'Ibrahim-Electric-Rider.pdf'
    },
    {
      title: 'DK Press Kit',
      description: 'Danish press materials',
      file: '/press/dk/IBRAHIM_ELECTRIC_DK_presse.pdf',
      filename: 'Ibrahim-Electric-DK-Presse.pdf'
    }
  ];

  const pressPhotos = [
    {
      src: '/press/dk/_AHL8868.jpg',
      alt: 'Ibrahim Electric Press Photo 1',
      filename: 'ibrahim-electric-press-1.jpg'
    },
    {
      src: '/press/dk/_AHL8682bw.jpg',
      alt: 'Ibrahim Electric Press Photo 2 (B&W)',
      filename: 'ibrahim-electric-press-2-bw.jpg'
    },
    {
      src: '/press/dk/_AHL8914bw.jpg',
      alt: 'Ibrahim Electric Press Photo 3 (B&W)',
      filename: 'ibrahim-electric-press-3-bw.jpg'
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black page-transition-enter">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-heading text-center mb-8 tracking-wide text-accent-orange">
          PRESS - DANISH
        </h1>

        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Press materials for Danish bookers, venues, and media. Download high-resolution photos, press documents, and technical information.
        </p>

        {/* Press Documents Downloads */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-accent-orange">Press Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pressKits.map((kit, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-accent-orange transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-orange rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading text-white mb-1">{kit.title}</h3>
                      <p className="text-gray-400 text-sm">{kit.description}</p>
                    </div>
                  </div>
                  <a
                    href={kit.file}
                    download={kit.filename}
                    className="bg-gradient-to-r from-accent-orange to-accent-amber text-white px-6 py-2 rounded-full font-bold text-sm btn-modern transition-all duration-300 hover:scale-105 text-center"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Photos */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-accent-orange">Press Photos</h2>
          <p className="text-gray-400 mb-8">Click on any photo to download the high-resolution version.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressPhotos.map((photo, index) => (
            <a
              key={index}
              href={photo.src}
              download={photo.filename}
              className="group relative block overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover:border-accent-orange transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <svg className="w-12 h-12 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-white font-medium">Download</span>
                </div>
              </div>
            </a>
          ))}
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

export default PressDK;
