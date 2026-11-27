import React, { useMemo, useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/siteData';

/**
 * Selects an adaptive Cloudinary video quality preset based on network conditions
 * so desert / poor-connection visitors receive a lighter stream without manual setup.
 */
function buildAdaptiveCloudinaryUrl(rawUrl) {
  if (!rawUrl || !rawUrl.includes('/video/upload/')) return rawUrl;
  let preset = 'f_auto,q_auto:good,w_720';
  if (typeof navigator !== 'undefined') {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const slowTypes = new Set(['slow-2g', '2g', '3g']);
      if (conn.saveData || slowTypes.has(conn.effectiveType)) {
        preset = 'f_auto,q_auto:eco,w_480';
      }
    }
  }
  return rawUrl.replace('/video/upload/', `/video/upload/${preset}/`);
}

export function Testimonials() {
  const [playingId, setPlayingId] = useState(null);

  return (
    <section id="testimonials" className="testimonials">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>شهادات وآراء عملائنا</h2>
          <p>تجارب حقيقية من أرض الواقع لعملاء ومزارعين استخدموا كمبوست مواردنا مستقبلنا.</p>
        </div>

        <div className="testi-list">
          {TESTIMONIALS_DATA.map((item) => (
            <TestimonialCard
              key={item.id}
              item={item}
              isPlaying={playingId === item.id}
              onPlay={() => setPlayingId(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, isPlaying, onPlay }) {
  const adaptiveUrl = useMemo(() => buildAdaptiveCloudinaryUrl(item.videoUrl), [item.videoUrl]);

  return (
    <article className="testi-card rv">
      <div className="testi-body">
        <h3>{item.author}</h3>
        <p className="testi-quote">{item.summary}</p>

        <div className="testi-actions">
          <a href="#contact" className="btn btn-green">
            ابعتلنا مساحة أرضك
          </a>
        </div>
      </div>

      <div className="testi-media">
        {isPlaying ? (
          <video
            className="testi-video"
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={item.posterSrc}
          >
            <source src={adaptiveUrl} />
            <source src={item.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            className="testi-poster-btn"
            onClick={onPlay}
            aria-label={`تشغيل فيديو شهادة ${item.author}`}
          >
            <img
              src={item.posterSrc}
              alt={`لقطة من فيديو شهادة ${item.author}`}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
            />
            <span className="testi-scrim" aria-hidden="true" />
            <span className="testi-play" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 001.52.85l10.6-6.86a1 1 0 000-1.7L9.52 4.29A1 1 0 008 5.14z" />
              </svg>
            </span>
            {item.duration && (
              <span className="testi-dur num" aria-hidden="true">
                {item.duration}
              </span>
            )}
          </button>
        )}
      </div>
    </article>
  );
}
