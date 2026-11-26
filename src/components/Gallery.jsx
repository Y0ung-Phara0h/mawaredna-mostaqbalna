import React from 'react';
import { GALLERY_ITEMS } from '../data/siteData';

export function Gallery() {
  return (
    <section id="gallery">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>من مواقع العمل</h2>
          <p>معدات وخطوط معالجة وتحميل الكومبوست من الموقع.</p>
        </div>

        <div className="gal">
          {GALLERY_ITEMS.map((label, i) => (
            <div
              className="ph rv"
              style={i > 0 ? { '--d': `${(i * 0.08).toFixed(2)}s` } : undefined}
              key={label}
            >
              {label}
            </div>
          ))}
        </div>
        <p className="note">استبدل هذه المربعات بصور وفيديوهات الشركة الحقيقية.</p>
      </div>
    </section>
  );
}
