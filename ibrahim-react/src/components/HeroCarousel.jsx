import { useState, useEffect, useRef } from 'react';
import ResponsiveImage from './ResponsiveImage';
import { trackHeroSlideChange } from '../utils/analytics';

const HeroCarousel = ({ slides, interval = 12000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const slideNames = ['Republique CPH Jazz', 'Press Quotes', 'Band Intro'];

  // Auto-advance slides
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % slides.length;
        trackHeroSlideChange(nextIndex, slideNames[nextIndex] || `Slide ${nextIndex + 1}`, 'auto');
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [slides.length, interval]);

  const goToSlide = (index) => {
    clearInterval(timerRef.current);
    setCurrentIndex(index);
    trackHeroSlideChange(index, slideNames[index] || `Slide ${index + 1}`, 'indicator_click');
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % slides.length;
        trackHeroSlideChange(nextIndex, slideNames[nextIndex] || `Slide ${nextIndex + 1}`, 'auto');
        return nextIndex;
      });
    }, interval);
  };

  return (
    <section id="intro" className="relative h-screen overflow-hidden">
      {/* Each slide with its own background and content */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
        >
          {/* Background image */}
          <div className="hero-slide-bg">
            <ResponsiveImage
              src={slide.image}
              alt={slide.alt || `Slide ${index + 1}`}
              sizes="100vw"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
          </div>

          {/* Content */}
          <div className="hero-slide-content">
            <div className="container mx-auto px-6 text-center">
              {slide.content}
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'bg-accent-orange scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroCarousel;
