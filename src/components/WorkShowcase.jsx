import React from 'react';

const HIGHLIGHTS = [
  'إنتاج الكومبوست النقي من مخلفات قصب السكر',
  'خطوط تقليب وتخمير ومعالجة في الموقع',
  'تحميل ونقل مباشر إلى المزارع',
];

export function WorkShowcase() {
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
          <video
            controls
            playsInline
            preload="metadata"
            width="1080"
            height="1920"
            aria-label="فيديو من أعمال شركة مواردنا مستقبلنا"
          >
            <source src="/videos/our-work.mp4" type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>
      </div>
    </section>
  );
}
