import React, { useState, useEffect } from 'react';

/**
 * Parses and returns an optimized Cloudinary URL
 */
const getCloudinaryUrl = (url, { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = {}) => {
  if (!url) return '';
  
  // Cloudinary standard upload pattern: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>
  const match = url.match(/^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/);
  if (!match) return url;

  const [, baseUrl, restPath] = match;
  
  // Build transformations
  const transforms = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  return `${baseUrl}${transforms.join(',')}/${restPath}`;
};

/**
 * Parses and returns an optimized Unsplash URL
 */
const getUnsplashUrl = (url, { width, height, fit = 'crop', quality = 80 } = {}) => {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.includes('unsplash.com')) return url;

    // Set optimization params
    parsedUrl.searchParams.set('auto', 'format');
    parsedUrl.searchParams.set('q', quality.toString());
    if (width) parsedUrl.searchParams.set('w', width.toString());
    if (height) parsedUrl.searchParams.set('h', height.toString());
    if (width || height) parsedUrl.searchParams.set('fit', fit);

    return parsedUrl.toString();
  } catch (e) {
    return url;
  }
};

/**
 * Main optimized URL generator
 */
export const getOptimizedUrl = (url, options = {}) => {
  if (!url) return '';
  if (url.includes('res.cloudinary.com')) {
    return getCloudinaryUrl(url, options);
  }
  if (url.includes('images.unsplash.com')) {
    return getUnsplashUrl(url, options);
  }
  return url;
};

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  crop = 'fill',
  fallbackSrc = '/pickup-drop-service.png',
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset loaded/error state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  if (!src) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={`${className} object-cover`}
        loading={loading}
        {...props}
      />
    );
  }

  // Generate optimized URLs
  const optimizedSrc = error ? fallbackSrc : getOptimizedUrl(src, { width, height, crop });
  
  // Generate a tiny low-quality placeholder for the blur-up effect (approx 30px width)
  const lqipSrc = error ? null : getOptimizedUrl(src, { 
    width: 30, 
    height: height ? Math.round(height * (30 / width)) : undefined, 
    crop, 
    quality: 20 
  });

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {/* Low-Quality Blurred Placeholder */}
      {lqipSrc && !isLoaded && !error && (
        <img
          src={lqipSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-opacity duration-300 pointer-events-none"
          style={{ transform: 'scale(1.1)' }}
          aria-hidden="true"
        />
      )}
      
      {/* High-Quality Main Image */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
        }`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
