import React from 'react';

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img
                className="lg"
                style={{ height: 42, width: 'auto' }}
                src="/brand/icon-logo-white.svg"
                alt="شعار مواردنا مستقبلنا"
                width="42"
                height="42"
                loading="lazy"
              />
              <b className="kufi" style={{ fontSize: 18 }}>
                مواردنا مستقبلنا
              </b>
            </div>
            <p style={{ maxWidth: 380, marginTop: 6 }}>
              نعمل في جمع وتدوير ومعالجة المخلفات الزراعية ومخلفات قصب السكر، وعلى رأسها الكومبوست
              (الكمبوست) النباتي والأسمدة العضوية في مصر.
            </p>
          </div>

          <div>
            <a href="#about">من نحن</a>
            <a href="#services">خدماتنا</a>
            <a href="#compost">الكومبوست</a>
            <a href="#faq">الأسئلة الشائعة</a>
          </div>

          <div>
            <a href="#process">من المخلفات إلى منتج</a>
            <a href="#calc">حاسبة المزرعة</a>
            <a href="#gallery">معرض الصور</a>
            <a href="#contact">تواصل معنا</a>
          </div>
        </div>

        <div className="copy">© 2026 مواردنا مستقبلنا — جميع الحقوق محفوظة</div>
      </div>
    </footer>
  );
}
