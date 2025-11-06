import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import Carousel from '../components/Carousel';

const Home = () => {
  const { tracks, playTrack, currentTrackIndex, isPlaying } = useAudio();

  const introImages = [
    '/images/front/cropped2025.jpg',
    '/images/front/Ibreahim+Electric+505.jpg',
    '/images/front/press-4.jpg',
  ];

  const bandImages = [
    '/images/press/press-1.jpg',
    '/images/press/press-2.jpg',
    '/images/press/press-3.jpg',
    '/images/press/press-4.jpg',
    '/images/press/press-5.jpg',
    '/images/press/press-6.jpg',
    '/images/press/press-7.jpg',
  ];

  return (
    <div className="page-transition-enter">
      {/* Intro Section */}
      <section id="intro" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Carousel images={introImages} interval={12000} className="intro-carousel" slideClassName="intro-carousel-slide" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-heading font-light leading-relaxed max-w-5xl mx-auto">
            <p className="mb-6 animate-fade-in-up opacity-0 hover:text-accent-orange transition-colors duration-300">
              "BETTER THAN VIAGRA" <span className="text-accent-orange">- Information, DK</span>
            </p>
            <p className="mb-6 animate-fade-in-up opacity-0 delay-100 hover:text-accent-orange transition-colors duration-300">
              "BIG, INTERSTELLAR FUN" <span className="text-accent-orange">- Downbeat Magazine, USA</span>
            </p>
            <p className="mb-6 animate-fade-in-up opacity-0 delay-200 hover:text-accent-orange transition-colors duration-300">
              "FASTER INTO YOUR BLOOD THAN A GANGES PARASITE" <span className="text-accent-orange">– NYC Jazz Record, USA</span>
            </p>
            <p className="animate-fade-in-up opacity-0 delay-300 hover:text-accent-orange transition-colors duration-300">
              "CAN YOU SAY 'INVENTIVE'? I KNOW THESE GUYS CAN" <span className="text-accent-orange">- Jazz Times, Canada</span>
            </p>
          </blockquote>
        </div>
      </section>

      {/* NEW RELEASE Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-5xl md:text-7xl font-heading mb-12 tracking-wide text-accent-orange">
                NEW RELEASE
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Album Cover */}
              <div className="animate-fade-in-up delay-100">
                <div className="relative group">
                  <img
                    src="/images/fast-fire-cover.png"
                    alt="Fast Fire Album Cover"
                    className="w-full rounded-lg shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 rounded-lg"></div>
                </div>
              </div>

              {/* Release Info */}
              <div className="space-y-8 animate-fade-in-up delay-200">
                <div>
                  <h3 className="text-4xl md:text-5xl font-heading text-white mb-4">FAST FIRE</h3>
                  <p className="text-xl text-gray-300 mb-6">
                    Available Soon
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Ibrahim Electric returns with their most explosive album yet. FAST FIRE delivers
                    the trio's signature blend of afrobeat, jazz, and raw energy in a sonic experience
                    that will leave you breathless.
                  </p>
                </div>

                {/* Pre-listen Button */}
                <div>
                  <a
                    href="https://sleeve.fm/artists/ibrahimelectric"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-accent-orange to-accent-amber text-white px-10 py-4 rounded-full text-lg font-bold btn-modern transition-all duration-300 hover:scale-110 hover:shadow-2xl text-center"
                  >
                    Pre-listen Now
                  </a>
                </div>

                {/* Streaming Link */}
                <div className="pt-6 border-t border-gray-800">
                  <p className="text-sm text-gray-400">
                    Available on{' '}
                    <a
                      href="https://sleeve.fm/artists/ibrahimelectric"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-orange hover:underline font-medium"
                    >
                      Sleeve.fm
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band Section */}
      <section id="band" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 shadow-2xl">
              <Carousel images={bandImages} interval={8000} className="hero-carousel" slideClassName="band-carousel-slide" />
            </div>

            <h2 className="text-4xl md:text-6xl font-heading text-center mb-12 tracking-wide text-accent-orange">
              We are Ibrahim Electric
            </h2>

            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
              <p className="hover:text-white transition-colors duration-300">
                During the last couple of years IBRAHIM ELECTRIC has been one of the most popular European jazz groups...
                These 3 personal instrumentalists have - besides the popularity with this group - made a name for themselves
                as some of the most striking on their respective instruments in Scandinavia.
              </p>

              <p className="hover:text-white transition-colors duration-300">
                The Danish trio IBRAHIM ELECTRIC never disappoints. Their quirky – provocative – extroverted - original music
                sticks its fingers into just about every musical cookie jar... and sends cascades of pearls from the speakers.
              </p>

              <p className="hover:text-white transition-colors duration-300">
                IBRAHIM ELECTRIC's style is not for the pedantic. There are elements of old fashioned soul/jazz – AFRObeat -
                60's acid-power-beat - and of course the trio's trademark: the fast, almost-punk passages in which the three
                musicians merge into one playful organism.
              </p>

              <p className="hover:text-white transition-colors duration-300">
                Each of the band-members possess an extremely high level of musical ENERGY, and they have a mutual love for
                the pure energy in the music... This has made this unit extraordinary!
              </p>

              <p className="hover:text-white transition-colors duration-300">
                Whether Niclas is playing a guitar solo in the spirit of Ali Farka Toure...Jeppe is playing a solo that leads
                your mind to the Hammond-icons of the 1960's...or Stefan is playing a drum-solo with avantgarde elements, the
                one thing that overshines it all, is their love for playing and performing, and the sheer intensity of their expression!
              </p>

              <p className="hover:text-white transition-colors duration-300">
                This trio is a fantastic live experience! An experience which has been delivered in following countries so far:
                USA – Canada – Morocco – Brazil – Denmark – England – Ireland – Scotland – Poland – Sweden – Norway – Finland –
                France – Germany – Lithuania – Latvia – Estonia – Netherlands – China – Korea – Thailand!
              </p>

              <div className="text-center py-8 text-xl font-medium">
                <p className="mb-2 hover:scale-105 inline-block transition-transform">
                  <strong className="font-bold">Niclas Knudsen</strong> / Guitar
                </p><br/>
                <p className="mb-2 hover:scale-105 inline-block transition-transform">
                  <strong className="font-bold">Jeppe Tuxen</strong> / Hammond B3
                </p><br/>
                <p className="hover:scale-105 inline-block transition-transform">
                  <strong className="font-bold">Stefan Pasborg</strong> / Drums
                </p>
              </div>
            </div>

            {/* Press Quotes */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <blockquote className="quote-card bg-gray-800 p-8 rounded-lg border-l-4 border-accent-orange accent-glow">
                <p className="quote-text mb-4">
                  "Ibrahim Electric 'kicks ass'! These 3 young musicians display some seriously large reserves of energy...
                  This is better than Viagra!"
                </p>
                <footer className="text-gray-400 font-medium">— Information, DK</footer>
              </blockquote>

              <blockquote className="quote-card bg-gray-800 p-8 rounded-lg border-l-4 border-accent-orange accent-glow">
                <p className="quote-text mb-4">
                  "Do you remember the feeling of listening to a band for the first time and being completely blown away
                  by the sheer majesty of the performance? For those of you who have experienced this, be prepared for it
                  to happen again. For those of you who don't know what I'm talking about, you will understand. Prepare yourself
                  for Ibrahim Electric!"
                </p>
                <footer className="text-gray-400 font-medium">— Hammondbeat.com, USA</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img src="/images/1500x1500_300dpi.jpg" alt="Album Cover" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-black bg-opacity-90 p-8 md:p-12 rounded-xl shadow-2xl backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-heading text-center mb-12 tracking-wide text-accent-orange">
              Music
            </h2>

            {/* Track List */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h4 className="text-xl font-heading mb-4 text-gray-300 tracking-wide">Select a Track:</h4>
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <div
                    key={index}
                    onClick={() => playTrack(index)}
                    className={`track-card bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all border-l-4 ${
                      currentTrackIndex === index ? 'border-accent-orange' : 'border-transparent hover:border-accent-orange'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Album Cover Thumbnail */}
                        <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-gray-700 border border-gray-600">
                          {track.coverArt ? (
                            <img
                              src={track.coverArt}
                              alt={`${track.album} cover`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className="w-full h-full flex items-center justify-center text-gray-500"
                            style={{ display: track.coverArt ? 'none' : 'flex' }}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                            </svg>
                          </div>
                        </div>
                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-heading tracking-wide truncate">{track.title}</div>
                          {track.album && (
                            <div className="text-xs text-gray-400 truncate">
                              {track.album} {track.year && `(${track.year})`}
                            </div>
                          )}
                        </div>
                      </div>
                      {currentTrackIndex === index && isPlaying && (
                        <div className="equalizer flex-shrink-0">
                          <div className="equalizer-bar"></div>
                          <div className="equalizer-bar"></div>
                          <div className="equalizer-bar"></div>
                          <div className="equalizer-bar"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
