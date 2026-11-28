import React, { useRef, useState } from 'react';

const VIDEO_SRC =
  'https://res.cloudinary.com/sr7yodil/video/upload/v1795778626/customer_v-compressed_qu7pyu.mp4';

const HIGHLIGHTS = [
  'إنتاج الكومبوست النقي من مخلفات قصب السكر',
  'خطوط تقليب وتخمير ومعالجة في الموقع',
  'تحميل ونقل مباشر إلى المزارع',
];

export function WorkShowcase() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (v) v.play().catch(() => undefined);
    });
  };

  return (
    <section id="works" className="works">
      <div className="wrap works-grid">
        <div className="rv">
          <div className="sec-head" style={{ marginBottom: 20 }}>
            <h2>أهم أعمالنا</h2>
            <p>شاهد جانبًا من عملنا الفعلي في الموقع: من معالجة المخلفات حتى تجهيز الكومبوست وتوريده.</p>
          </div>
          <ul className="works-list">
            {HIGHLIGHTS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-green">
            اطلب خدمة
          </a>
        </div>

        <div className="works-video rv" style={{ '--d': '.12s' }}>
          {playing ? (
            <video
              ref={videoRef}
              controls
              playsInline
              preload="auto"
              width="1080"
              height="1920"
              aria-label="فيديو من أعمال شركة مواردنا مستقبلنا"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              <track kind="captions" src="/captions/our-work.vtt" srcLang="ar" label="العربية" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          ) : (
            <button type="button" className="works-play" onClick={start} aria-label="تشغيل فيديو أعمال الشركة">
              <img
                className="works-play-logo"
                src="/brand/icon-logo-white.svg"
                alt=""
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
              />
              <span className="works-play-btn" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M8 5.5v13a1 1 0 001.5.86l11-6.5a1 1 0 000-1.72l-11-6.5A1 1 0 008 5.5z" />
                </svg>
              </span>
              <span className="works-play-label">شاهد الفيديو</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
