import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Set true for above-the-fold LCP hero images (eager loading + high fetchPriority). */
  priority?: boolean;
  /** Optional class applied to the outer relative container holding the shimmer skeleton & image. */
  wrapperClassName?: string;
}

/**
 * Performance-optimized image component with:
 * - Native lazy loading & async decoding for below-the-fold assets
 * - Lightweight botanical shimmer skeleton until decoded
 * - Instant zero-flash reveal for already-cached browser images
 */
export function LazyImage({
  priority = false,
  wrapperClassName = 'w-full h-full',
  className = '',
  src,
  alt = '',
  onLoad,
  onError,
  ...rest
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  const positionClass = /\b(absolute|fixed|sticky)\b/.test(wrapperClassName) ? '' : 'relative';

  return (
    <div className={`${positionClass} overflow-hidden ${wrapperClassName}`.trim()}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="skeleton-botanical absolute inset-0 pointer-events-none"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
}
