import React, { Suspense, lazy, useCallback, useRef, useState } from 'react';
import { GALLERY_ITEMS } from '../data/siteData';

const GalleryLightbox = lazy(() =>
  import('./GalleryLightbox').then((mod) => ({ default: mod.GalleryLightbox }))
);

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null); // lightbox
  const [hovered, setHovered] = useState(0); // expanded panel
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

        <div className="acc rv">
          {GALLERY_ITEMS.map((item, i) => {
            const isOpen = hovered === i;
            return (
              <button
                type="button"
                ref={(el) => (triggerRefs.current[i] = el)}
                className={`acc-item${isOpen ? ' open' : ''}`}
                key={item.id}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onClick={() => (isOpen ? setActiveIndex(i) : setHovered(i))}
                aria-label={`تكبير صورة: ${item.title}`}
                aria-expanded={isOpen}
              >
                <img
                  src={item.thumbSrc || item.src}
                  srcSet={item.thumbSrc ? `${item.thumbSrc} 540w, ${item.src} 640w` : undefined}
                  sizes="(max-width: 700px) 92vw, 560px"
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="acc-shade" aria-hidden="true" />
                <span className="acc-num num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="acc-vtitle" aria-hidden="true">
                  {item.title}
                </span>
                <span className="acc-info">
                  <strong>{item.title}</strong>
                  <small>{item.caption}</small>
                </span>
              </button>
            );
          })}
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
