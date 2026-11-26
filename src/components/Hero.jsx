import React, { useEffect, useRef } from 'react';
import { HERO_LEAVES, HERO_STATS } from '../data/siteData';
import { animateCount } from '../utils/format';

// Compact cane placements referencing 3 reusable <g> symbols in SVG <defs>
const FIELD_CANES = [
  { x: 18, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 64, type: 's', flip: true, shade: '#5a943e', op: 0.55 },
  { x: 112, type: 'l', flip: false, shade: '#7ab34c', op: 0.85 },
  { x: 164, type: 's', flip: true, shade: '#649e42', op: 0.65 },
  { x: 214, type: 'l', flip: false, shade: '#7ab34c', op: 0.82 },
  { x: 264, type: 's', flip: true, shade: '#5a943e', op: 0.52 },
  { x: 314, type: 'm', flip: false, shade: '#6fa946', op: 0.76 },
  { x: 366, type: 'm', flip: true, shade: '#7ab34c', op: 0.7 },
  { x: 418, type: 'l', flip: false, shade: '#7ab34c', op: 0.84 },
  { x: 468, type: 's', flip: true, shade: '#5a943e', op: 0.55 },
  { x: 520, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 572, type: 's', flip: true, shade: '#649e42', op: 0.64 },
  { x: 624, type: 'l', flip: false, shade: '#7ab34c', op: 0.85 },
  { x: 676, type: 's', flip: true, shade: '#5a943e', op: 0.54 },
  { x: 728, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 780, type: 'm', flip: true, shade: '#7ab34c', op: 0.72 },
  { x: 832, type: 'l', flip: false, shade: '#7ab34c', op: 0.82 },
  { x: 884, type: 's', flip: true, shade: '#5a943e', op: 0.52 },
  { x: 936, type: 'm', flip: false, shade: '#6fa946', op: 0.76 },
  { x: 988, type: 's', flip: true, shade: '#649e42', op: 0.65 },
  { x: 1040, type: 'l', flip: false, shade: '#7ab34c', op: 0.84 },
  { x: 1092, type: 's', flip: true, shade: '#5a943e', op: 0.54 },
  { x: 1144, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 1184, type: 'm', flip: true, shade: '#7ab34c', op: 0.72 },
];

export function Hero({ heroRef }) {
  const statsRef = useRef(null);
  const statNumsRef = useRef([]);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        heroEl.classList.toggle('off', !entry.isIntersecting);
      });
    });
    heroObs.observe(heroEl);

    const statsEl = statsRef.current;
    let statsObs;
    if (statsEl) {
      statsObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              HERO_STATS.forEach((stat, idx) => {
                const el = statNumsRef.current[idx];
                animateCount(el, stat.values, stat.decimals, stat.suffix);
              });
              statsObs.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      statsObs.observe(statsEl);
    }

    return () => {
      heroObs.disconnect();
      if (statsObs) statsObs.disconnect();
    };
  }, [heroRef]);

  return (
    <>
      <div className="hero" ref={heroRef}>
        <div className="lv" aria-hidden="true">
          {HERO_LEAVES.map((leaf) => (
            <svg
              key={leaf.id}
              viewBox="-2 -20 40 28"
              style={{ left: leaf.left, '--t': leaf.t, '--dl': leaf.dl }}
            >
              <path d="M0 0C10-14 28-14 36-4 32 10 16 18 0 0z" fill="#7ab34c" />
            </svg>
          ))}
        </div>

        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="w">مواردنا النهاردة..</span>
              <br />
              <span className="g">
                <span className="w">مستقبل أرضك بكرة.</span>
              </span>
            </h1>
            <p className="hero-sub">
              نجمع ونعالج وندوّر مخلفات قصب السكر لنقدم كمبوست عالي النقاء.
            </p>
            <p className="lead">
              بوزن <span className="num">500–550</span> كجم/م³ وتحاليل معتمدة من مركز البحوث
              الزراعية، مع توريد مرن للمزارع والأراضي المستصلحة في مختلف الأماكن.
            </p>
            <div className="cta">
              <a className="btn btn-straw" href="#contact">
                اطلب الكومبوست
              </a>
              <a className="btn btn-line" href="#calc">
                احسب احتياج مزرعتك
              </a>
            </div>
          </div>

          <div className="hero-cycle-wrap">
            <figure className="hero-cycle">
              <img
                src="/hero-cycle.webp"
                srcSet="/hero-cycle-sm.webp 580w, /hero-cycle.webp 760w"
                sizes="(max-width: 700px) 320px, (max-width: 820px) 360px, 440px"
                alt="دورة الاقتصاد الدائري الزراعي: قصب السكر يتحول إلى كومبوست يعود لتغذية الأرض وإنبات المحاصيل"
                width="760"
                height="608"
                decoding="sync"
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>

        <svg
          id="field"
          className="field-pattern"
          viewBox="0 0 1200 112"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <path id="c-seg" d="M0 -19Q0 -22 6.5 -24.2L6.5 -3.1Q6.5 0 0 1.8Z" />
            <g id="c-s">
              <use href="#c-seg" />
              <use href="#c-seg" y="-25.5" />
            </g>
            <g id="c-m">
              <use href="#c-seg" />
              <use href="#c-seg" y="-25.5" />
              <use href="#c-seg" y="-51" />
            </g>
            <g id="c-l">
              <use href="#c-seg" />
              <use href="#c-seg" y="-25.5" />
              <use href="#c-seg" y="-51" />
              <use href="#c-seg" y="-76.5" />
            </g>
          </defs>
          <g className="field-sway">
            {FIELD_CANES.map((cane) => (
              <use
                key={cane.x}
                href={`#c-${cane.type}`}
                transform={`translate(${cane.x} 112)${cane.flip ? ' scale(-1 1)' : ''}`}
                fill={cane.shade}
                opacity={cane.op}
              />
            ))}
          </g>
        </svg>
        <div className="strata" aria-hidden="true" />
      </div>

      <div className="stats" ref={statsRef}>
        <div className="wrap">
          {HERO_STATS.map((stat, idx) => (
            <div className="stat" key={stat.id}>
              <b className="num" ref={(el) => (statNumsRef.current[idx] = el)}>
                {stat.initial}
              </b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
