import React, { useEffect, useRef } from 'react';
import { HERO_LEAVES, HERO_STATS } from '../data/siteData';
import { animateCount } from '../utils/format';

// Compact cane placements referencing 3 reusable <g> symbols in SVG <defs>
const FIELD_CANES = [
  { x: 18, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 54, type: 's', flip: true, shade: '#5a943e', op: 0.55 },
  { x: 88, type: 'l', flip: false, shade: '#7ab34c', op: 0.85 },
  { x: 126, type: 's', flip: true, shade: '#649e42', op: 0.65 },
  { x: 164, type: 'l', flip: false, shade: '#7ab34c', op: 0.82 },
  { x: 202, type: 's', flip: true, shade: '#5a943e', op: 0.52 },
  { x: 238, type: 'm', flip: false, shade: '#6fa946', op: 0.76 },
  { x: 276, type: 'm', flip: true, shade: '#7ab34c', op: 0.7 },
  { x: 314, type: 'l', flip: false, shade: '#7ab34c', op: 0.84 },
  { x: 352, type: 's', flip: true, shade: '#5a943e', op: 0.55 },
  { x: 388, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 426, type: 's', flip: true, shade: '#649e42', op: 0.64 },
  { x: 464, type: 'l', flip: false, shade: '#7ab34c', op: 0.85 },
  { x: 502, type: 's', flip: true, shade: '#5a943e', op: 0.54 },
  { x: 538, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 576, type: 'm', flip: true, shade: '#7ab34c', op: 0.72 },
  { x: 614, type: 'l', flip: false, shade: '#7ab34c', op: 0.82 },
  { x: 652, type: 's', flip: true, shade: '#5a943e', op: 0.52 },
  { x: 688, type: 'm', flip: false, shade: '#6fa946', op: 0.76 },
  { x: 726, type: 's', flip: true, shade: '#649e42', op: 0.65 },
  { x: 764, type: 'l', flip: false, shade: '#7ab34c', op: 0.84 },
  { x: 802, type: 's', flip: true, shade: '#5a943e', op: 0.54 },
  { x: 838, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 876, type: 'm', flip: true, shade: '#7ab34c', op: 0.7 },
  { x: 914, type: 'l', flip: false, shade: '#7ab34c', op: 0.84 },
  { x: 952, type: 's', flip: true, shade: '#5a943e', op: 0.55 },
  { x: 988, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 1026, type: 's', flip: true, shade: '#649e42', op: 0.64 },
  { x: 1064, type: 'l', flip: false, shade: '#7ab34c', op: 0.85 },
  { x: 1102, type: 's', flip: true, shade: '#5a943e', op: 0.54 },
  { x: 1138, type: 'm', flip: false, shade: '#6fa946', op: 0.78 },
  { x: 1174, type: 'm', flip: true, shade: '#7ab34c', op: 0.72 },
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
        { threshold: 0.5 }
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
          <div>
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
              بوزن 500–550 كجم/م³ وتحاليل معتمدة من مركز البحوث الزراعية، مع توريد مرن للمزارع
              والأراضي المستصلحة في مختلف الأماكن.
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

          <svg
            className="loop"
            viewBox="0 0 400 400"
            width="400"
            height="400"
            role="img"
            aria-label="دورة الاقتصاد الدائري: الأرض ثم المحصول ثم المخلفات ثم الكومبوست ثم العودة إلى الأرض"
          >
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#9ccc6f"
              strokeWidth="3"
              opacity=".75"
            />
            <g className="core" textAnchor="middle" fontFamily="Hanimation, Outfit, sans-serif" fontWeight="800">
              <circle cx="200" cy="200" r="100" fill="#153d20" />
              <text x="200" y="195" fill="#fff" fontSize="21">
                دورة
              </text>
              <text x="200" y="226" fill="#9ccc6f" fontSize="21">
                لا تنتهي
              </text>
            </g>
            {/* GPU-composited orbiting dots (replaces main-thread SMIL animateMotion) */}
            <g className="orbit-dots" fill="#9ccc6f">
              <circle cx="200" cy="50" r="5" />
              <circle cx="330" cy="275" r="5" />
              <circle cx="70" cy="275" r="5" />
            </g>
            <g
              fontFamily="Hanimation, Outfit, sans-serif"
              fontSize="15"
              fill="#fff"
              textAnchor="middle"
              fontWeight="600"
            >
              <g className="nd">
                <circle cx="200" cy="50" r="32" fill="#286631" />
                <text x="200" y="55">الأرض</text>
              </g>
              <g className="nd">
                <circle cx="350" cy="200" r="32" fill="#4f8f3a" />
                <text x="350" y="205">المحصول</text>
              </g>
              <g className="nd">
                <circle cx="200" cy="350" r="32" fill="#a87945" />
                <text x="200" y="355">كومبوست</text>
              </g>
              <g className="nd">
                <circle cx="50" cy="200" r="32" fill="#8a6238" />
                <text x="50" y="205">مخلفات</text>
              </g>
            </g>
          </svg>
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
              <b ref={(el) => (statNumsRef.current[idx] = el)}>{stat.initial}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
