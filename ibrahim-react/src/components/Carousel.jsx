import { useState, useEffect } from 'react';

const Carousel = ({ images, interval = 8000, className = 'hero-carousel', slideClassName = 'carousel-slide' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={className}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${slideClassName} ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
