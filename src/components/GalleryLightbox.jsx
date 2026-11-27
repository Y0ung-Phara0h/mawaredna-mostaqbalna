import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function GalleryLightbox({ items, activeIndex, onClose, onNavigate }) {
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const touchStartRef = useRef(null);

  const total = items.length;
  const current = items[activeIndex];

  // Lock page scroll, manage initial focus, and handle keyboard navigation + focus trap
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const focusTimer = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      // In RTL: ArrowLeft advances forward, ArrowRight goes back
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate((activeIndex + 1) % total);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate((activeIndex - 1 + total) % total);
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, total, onClose, onNavigate]);

  // Preload adjacent full-resolution images while lightbox is open
  useEffect(() => {
    if (total <= 1) return;
    const nextItem = items[(activeIndex + 1) % total];
    const prevItem = items[(activeIndex - 1 + total) % total];
    [nextItem, prevItem].forEach((item) => {
      if (item?.src) {
        const img = new Image();
        img.src = item.src;
      }
    });
  }, [activeIndex, items, total]);

  if (!current || typeof document === 'undefined') return null;

  const handleTouchStart = (e) => {
    const touch = e.changedTouches?.[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches?.[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    // In RTL swipe: dragging left->right or right->left navigates smoothly
    if (dx > 0) {
      onNavigate((activeIndex + 1) % total);
    } else {
      onNavigate((activeIndex - 1 + total) % total);
    }
  };

  return createPortal(
    <div
      className="lb-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lb-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lb-stage"
        ref={dialogRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lb-top">
          <span className="lb-counter num" aria-live="polite">
            {activeIndex + 1} / {total}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            className="lb-btn lb-close"
            onClick={onClose}
            aria-label="إغلاق العرض"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="lb-media-wrap">
          {total > 1 && (
            <button
              type="button"
              className="lb-btn lb-nav lb-prev"
              onClick={() => onNavigate((activeIndex - 1 + total) % total)}
              aria-label="الصورة السابقة"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <figure className="lb-figure">
            <img
              key={current.id}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              decoding="async"
            />
          </figure>

          {total > 1 && (
            <button
              type="button"
              className="lb-btn lb-nav lb-next"
              onClick={() => onNavigate((activeIndex + 1) % total)}
              aria-label="الصورة التالية"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="lb-caption">
          <h3 id="lb-title">{current.title}</h3>
          {current.caption && <p>{current.caption}</p>}
        </div>
      </div>
    </div>,
    document.body
  );
}
