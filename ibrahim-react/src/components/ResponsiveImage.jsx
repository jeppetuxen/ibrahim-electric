import { useState, useEffect, useRef } from 'react';

/**
 * ResponsiveImage - Progressive image loading component
 *
 * Loads images progressively:
 * 1. Shows placeholder (tiny blur)
 * 2. Loads appropriate size based on screen width
 * 3. Uses lazy loading for off-screen images
 *
 * Usage:
 * <ResponsiveImage
 *   src="/images/large-image.jpg"
 *   alt="Description"
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
 * />
 */
const ResponsiveImage = ({
  src,
  alt = '',
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const imgRef = useRef(null);

  // Generate responsive image URLs
  const generateSrcSet = (imagePath) => {
    // Extract directory, filename, and extension
    const lastSlash = imagePath.lastIndexOf('/');
    const directory = imagePath.substring(0, lastSlash);
    const filename = imagePath.substring(lastSlash + 1);
    const lastDot = filename.lastIndexOf('.');
    const name = filename.substring(0, lastDot);
    const ext = filename.substring(lastDot);

    // Check if responsive versions exist
    const responsiveDir = `${directory}/responsive`;

    // Use responsive versions if available, fallback to original
    const hasResponsive = [
      'press-1', 'press-2', 'press-3', 'press-4', 'press-5', 'press-6',
      'Ibreahim+Electric+505', 'fast-fire-cover', 'rumours-from-outer-space'
    ].some(img => name.includes(img));

    if (hasResponsive) {
      // Modern browsers: WebP with JPEG fallback
      return {
        src: `${responsiveDir}/${name}-medium.jpg`,
        srcSet: `
          ${responsiveDir}/${name}-small.webp 400w,
          ${responsiveDir}/${name}-medium.webp 800w,
          ${responsiveDir}/${name}-large.webp 1200w,
          ${responsiveDir}/${name}-xlarge.webp 1600w
        `.trim(),
        srcSetFallback: `
          ${responsiveDir}/${name}-small.jpg 400w,
          ${responsiveDir}/${name}-medium.jpg 800w,
          ${responsiveDir}/${name}-large.jpg 1200w,
          ${responsiveDir}/${name}-xlarge.jpg 1600w
        `.trim(),
      };
    }

    // No responsive versions, use original
    return {
      src: imagePath,
      srcSet: imagePath,
      srcSetFallback: imagePath,
    };
  };

  const { src: imageSrc, srcSet, srcSetFallback } = generateSrcSet(src);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={`responsive-image-container ${className}`} style={{ position: 'relative' }}>
      {/* Placeholder - shown until image loads */}
      {!isLoaded && (
        <div
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 140, 0, 0.3)',
            borderTop: '3px solid #ff8c00',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}

      {/* Actual image with responsive loading and WebP support */}
      <picture>
        {/* WebP version (better compression) */}
        {srcSet !== imageSrc && (
          <source
            type="image/webp"
            srcSet={srcSet}
            sizes={sizes}
          />
        )}

        {/* JPEG fallback */}
        {srcSetFallback && srcSetFallback !== imageSrc && (
          <source
            type="image/jpeg"
            srcSet={srcSetFallback}
            sizes={sizes}
          />
        )}

        {/* Final fallback */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          {...props}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
