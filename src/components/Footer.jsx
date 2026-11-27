import React from 'react';
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  WHATSAPP_DISPLAY,
  buildDirectWhatsAppUrl,
} from '../services/leadService';

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <a href="#top" className="foot-brand-link" aria-label="العودة إلى أعلى الصفحة">
              <img
                className="lg logo-light"
                src="/brand/icon-logo.svg"
                alt="شعار مواردنا مستقبلنا"
                width="42"
                height="42"
                loading="lazy"
                decoding="async"
              />
              <img
                className="lg logo-dark"
                src="/brand/icon-logo-white.svg"
                alt="شعار مواردنا مستقبلنا"
                width="42"
                height="42"
                loading="lazy"
                decoding="async"
              />
              <div>
                <b className="foot-title">مواردنا مستقبلنا</b>
                <small className="foot-tagline">من مخلفاتنا نصنع مستقبلًا</small>
              </div>
            </a>
            <p className="foot-desc">
              نعمل في جمع وتدوير ومعالجة المخلفات الزراعية ومخلفات قصب السكر، وعلى رأسها الكومبوست
              (الكمبوست) النقي <span className="num">100%</span> والأسمدة العضوية في مصر.
            </p>
            <div className="foot-social">
              <a
                href={buildDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل معنا عبر واتساب"
                className="foot-social-btn"
              >
                واتساب
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="صفحتنا على فيسبوك"
                className="foot-social-btn"
              >
                فيسبوك
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="راسلنا عبر البريد الإلكتروني"
                className="foot-social-btn"
              >
                البريد
              </a>
            </div>
          </div>

          <nav className="foot-col" aria-label="روابط سريعة">
            <h3 className="foot-heading">روابط سريعة</h3>
            <ul className="foot-list">
              <li>
                <a href="#about">من نحن</a>
              </li>
              <li>
                <a href="#services">خدماتنا</a>
              </li>
              <li>
                <a href="#compost">الكومبوست</a>
              </li>
              <li>
                <a href="#faq">الأسئلة الشائعة</a>
              </li>
            </ul>
          </nav>

          <nav className="foot-col" aria-label="الأدوات والأقسام">
            <h3 className="foot-heading">الأدوات والأقسام</h3>
            <ul className="foot-list">
              <li>
                <a href="#process">رحلة المخلفات</a>
              </li>
              <li>
                <a href="#calc">حاسبة المزرعة</a>
              </li>
              <li>
                <a href="#gallery">معرض الصور</a>
              </li>
              <li>
                <a href="#contact">تواصل معنا</a>
              </li>
            </ul>
          </nav>

          <div className="foot-contact">
            <h3 className="foot-heading">التواصل والتوريد</h3>
            <ul className="foot-list">
              <li>
                <a
                  href={buildDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="num"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="foot-email">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <p className="foot-coverage">
              توريد مرن للمزارع والأراضي المستصلحة في مختلف محافظات مصر.
            </p>
            <a href="#contact" className="foot-cta">
              اطلب عرض سعر
            </a>
          </div>
        </div>

        <div className="copy">
          <span>
            © <span className="num">2026</span> مواردنا مستقبلنا — جميع الحقوق محفوظة
          </span>
          <a href="#top" className="foot-top">
            العودة للأعلى ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
