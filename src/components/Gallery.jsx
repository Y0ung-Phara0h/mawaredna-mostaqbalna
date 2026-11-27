import React, { Suspense, lazy, useCallback, useRef, useState } from 'react';
import { GALLERY_ITEMS } from '../data/siteData';

const GalleryLightbox = lazy(() =>
  import('./GalleryLightbox').then((mod) => ({ default: mod.GalleryLightbox }))
);

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const triggerRefs = useRef([]);

  const handleClose = useCallback(() => {
    const returnIdx = activeIndex;
    setActiveIndex(null);
    if (returnIdx !== null && triggerRefs.current[returnIdx]) {
      requestAnimationFrame(() => {
        triggerRefs.current[returnIdx]?.focus();
      });
    }
  }, [activeIndex]);

  return (
    <section id="gallery">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>من مواقع العمل</h2>
          <p>صور حقيقية لمعدات وخطوط تقليب ومعالجة وتحميل الكومبوست من الموقع.</p>
        </div>

        <div className="gal">
          {GALLERY_ITEMS.map((item, i) => (
            <button
              type="button"
              ref={(el) => (triggerRefs.current[i] = el)}
              className="gal-card rv"
              style={i > 0 ? { '--d': `${(i * 0.08).toFixed(2)}s` } : undefined}
              key={item.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`تكبير صورة: ${item.title}`}
            >
              <img
                src={item.thumbSrc || item.src}
                srcSet={item.thumbSrc ? `${item.thumbSrc} 540w, ${item.src} 640w` : undefined}
                sizes={i === 0 ? '(max-width: 700px) 92vw, 560px' : '(max-width: 700px) 45vw, 280px'}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
              <span className="gal-zoom" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                </svg>
              </span>
              <span className="gal-cap">
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Suspense fallback={null}>
          <GalleryLightbox
            items={GALLERY_ITEMS}
            activeIndex={activeIndex}
            onClose={handleClose}
            onNavigate={setActiveIndex}
          />
        </Suspense>
      )}
    </section>
  );
}
