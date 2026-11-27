import React, { useEffect, useRef } from 'react';
import { DATASHEET_ROWS } from '../data/siteData';
import { formatNum } from '../utils/format';
import { BrandAssetIcon } from './BrandAssetIcon';

const CANES = [
  { x: 328, h: 150, d: -0.6 },
  { x: 352, h: 185, d: -1.8 },
  { x: 374, h: 140, d: -1.1 },
];

export function CompostProduct() {
  const prodRef = useRef(null);

  useEffect(() => {
    const prodEl = prodRef.current;
    if (!prodEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          prodEl.classList.toggle('run', entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(prodEl);

    return () => obs.disconnect();
  }, []);

  return (
    <section id="compost" className="compost">
      <div className="wrap comp">
        <div className="rv">
          <div className="sec-head" style={{ marginBottom: 20 }}>
            <h2>كومبوست مواردنا مستقبلنا</h2>
            <p>
              كومبوست (كمبوست) نقي <span className="num">100%</span> من مخلفات قصب السكر، يمر
              بالمعالجة والتخمير والتجهيز قبل الاستخدام لرفع خصوبة التربة.
            </p>
          </div>

          <div className="prod" id="prod" ref={prodRef}>
            <svg
              viewBox="0 0 400 320"
              width="400"
              height="320"
              role="img"
              aria-label="رحلة المنتج: قصب السكر يتحول إلى ألياف، تتخمر في كومة، ثم تُعبأ ككومبوست مواردنا مستقبلنا، ويعود للأرض فينبت الزرع"
            >
              <defs>
                <clipPath id="bagc">
                  <path d="M92 158Q86 212 89 262Q125 272 161 262Q164 212 158 158Q125 151 92 158z" />
                </clipPath>
                <linearGradient id="bagg" x1="0" x2="1">
                  <stop offset="0" stopColor="#1c4a27" />
                  <stop offset=".5" stopColor="#2f7a3a" />
                  <stop offset="1" stopColor="#1c4a27" />
                </linearGradient>
              </defs>

              <g transform="translate(52 58)">
                <circle className="glow" r="20" fill="#e6cf95" />
              </g>
              <rect x="276" y="16" width="110" height="26" rx="13" fill="#286631" />
              <text
                x="331"
                y="34"
                fill="#fff"
                fontFamily="Hanimation, Outfit, sans-serif"
                fontSize="12"
                fontWeight="600"
                textAnchor="middle"
              >
                منتجنا 100% نقي
              </text>

              <rect y="270" width="400" height="50" fill="#5a432b" />
              <rect y="270" width="400" height="6" fill="#7a5a3a" />

              <g id="canes">
                {CANES.map(({ x, h, d }) => {
                  const nodes = [];
                  for (let y = 34; y < h; y += 34) {
                    nodes.push(<path key={y} d={`M-5 -${y}h10`} />);
                  }
                  return (
                    <g key={x} transform={`translate(${x} 270)`}>
                      <g className="cane" style={{ animationDelay: `${d}s` }}>
                        <rect x="-4.5" y={-h} width="9" height={h} rx="4" fill="#9cc65f" />
                        <g stroke="#5d8f38" strokeWidth="2.4">
                          {nodes}
                        </g>
                        <g fill="none" stroke="#5ea044" strokeWidth="4" strokeLinecap="round">
                          <path d={`M0 -${h - 6}q-24-2-38 18`} />
                          <path d={`M0 -${h - 2}q16-8 24 10`} />
                          <path d={`M0 -${h}q-4-18-16-30`} />
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>

              <path className="heap" d="M168 270Q228 196 288 270z" />
              <g fill="#2f2016" opacity=".45">
                <circle cx="210" cy="256" r="2" />
                <circle cx="240" cy="250" r="2.4" />
                <circle cx="226" cy="262" r="1.8" />
                <circle cx="256" cy="262" r="2" />
                <circle cx="196" cy="265" r="1.6" />
              </g>

              <path className="steam" style={{ '--d': '0s' }} d="M212 226c-8-11 8-17 0-28" />
              <path className="steam" style={{ '--d': '1.5s' }} d="M230 220c-8-11 8-17 0-28" />
              <path className="steam" style={{ '--d': '3s' }} d="M248 226c-8-11 8-17 0-28" />

              <path d="M14 270Q42 252 70 270z" fill="#3b2a1b" />
              <g className="grow2">
                <path d="M42 266V212" stroke="#4f8f3a" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M42 242C34 236 22 236 16 224 28 222 38 228 42 242z" fill="#5ea044" />
                <path d="M42 228C50 222 62 222 70 208 56 206 46 214 42 228z" fill="#7ab34c" />
                <circle cx="42" cy="210" r="4" fill="#9ccc6f" />
              </g>

              <g fill="none" strokeDasharray="4 6" strokeLinecap="round" opacity=".55">
                <path d="M332 166Q294 114 248 214" stroke="#e3c77a" strokeWidth="2" />
                <path d="M206 218Q168 112 132 146" stroke="#5a432b" strokeWidth="2" />
                <path d="M94 156Q64 134 46 244" stroke="#5a432b" strokeWidth="2" />
              </g>

              <ellipse cx="125" cy="268" rx="44" ry="5" fill="#000" opacity=".18" />
              <g className="bag">
                <path d="M92 158L97 138Q125 132 153 138L158 158z" fill="#173f21" />
                <ellipse cx="125" cy="138" rx="27" ry="5" fill="#3b2a1b" />
                <path
                  d="M92 158Q86 212 89 262Q125 272 161 262Q164 212 158 158Q125 151 92 158z"
                  fill="url(#bagg)"
                />
                <rect x="100" y="176" width="50" height="62" rx="7" fill="#f6f2e8" />
                <path
                  d="M117 202c0-10 8-16 18-16 0 10-8 16-18 16M117 202l7-7"
                  stroke="#286631"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <text
                  x="125"
                  y="222"
                  textAnchor="middle"
                  fontFamily="Hanimation, Outfit, sans-serif"
                  fontSize="11"
                  fontWeight="800"
                  fill="#1c4a27"
                >
                  كومبوست
                </text>
                <text
                  x="125"
                  y="233"
                  textAnchor="middle"
                  fontFamily="Hanimation, Outfit, sans-serif"
                  fontSize="7.5"
                  fill="#5f675b"
                >
                  مواردنا مستقبلنا
                </text>
                <g clipPath="url(#bagc)">
                  <g className="shine">
                    <rect
                      x="188"
                      y="130"
                      width="20"
                      height="150"
                      fill="#fff"
                      opacity=".22"
                      transform="skewX(-20)"
                    />
                  </g>
                </g>
              </g>

              <g fill="#e6cf95">
                <g transform="translate(172 150)">
                  <path
                    className="spk"
                    style={{ '--d': '0s' }}
                    d="M0-7L1.6-1.6 7 0 1.6 1.6 0 7-1.6 1.6-7 0-1.6-1.6z"
                  />
                </g>
                <g transform="translate(78 178)">
                  <path
                    className="spk"
                    style={{ '--d': '.9s' }}
                    d="M0-6L1.4-1.4 6 0 1.4 1.4 0 6-1.4 1.4-6 0-1.4-1.4z"
                  />
                </g>
                <g transform="translate(170 222)">
                  <path
                    className="spk"
                    style={{ '--d': '1.8s' }}
                    d="M0-5L1.2-1.2 5 0 1.2 1.2 0 5-1.2 1.2-5 0-1.2-1.2z"
                  />
                </g>
              </g>

              <text className="st" style={{ '--d': '0s' }} x="350" y="302">
                قصب السكر
              </text>
              <text className="st" style={{ '--d': '2s' }} x="232" y="302">
                تخمير
              </text>
              <text className="st" style={{ '--d': '4s' }} x="125" y="302">
                كومبوست
              </text>
              <text className="st" style={{ '--d': '6s' }} x="42" y="302">
                أرض أخصب
              </text>
              <g
                fill="none"
                stroke="#c9a96b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M288 292l-6 5 6 5" />
                <path d="M185 292l-6 5 6 5" />
                <path d="M90 292l-6 5 6 5" />
              </g>
            </svg>
          </div>

          <ul className="ticks">
            <li>
              <BrandAssetIcon iconKey="iconSoilLeaves" className="tick-brand-icon" />
              <span>يحسّن خواص التربة ويرفع نسبة المادة العضوية</span>
            </li>
            <li>
              <BrandAssetIcon iconKey="iconWaterDrop" className="tick-brand-icon" />
              <span>يزيد قدرة التربة الرملية على الاحتفاظ بالماء</span>
            </li>
            <li>
              <BrandAssetIcon iconKey="iconSproutBlades" className="tick-brand-icon" />
              <span>يدعم نمو الجذور ويحسّن جودة المحاصيل</span>
            </li>
            <li>
              <BrandAssetIcon iconKey="iconCompostBag" className="tick-brand-icon" />
              <span>يُنتج بالتخمير والمعالجة للتخلص من بذور الحشائش</span>
            </li>
          </ul>
          <a href="#contact" className="btn btn-green">
            اطلب الكومبوست
          </a>
        </div>

        <div className="sheet">
          <h3 className="rv">ورقة بيانات المنتج</h3>
          <p className="note rv" style={{ margin: '0 0 10px' }}>
            القيم تقريبية وقد تختلف حسب المواد الخام وظروف المعالجة والتحاليل المعملية.
          </p>
          <div id="sheet">
            {DATASHEET_ROWS.map((row, i) => (
              <div className="sr rv" style={{ '--d': `${i * 0.07}s` }} key={row.en}>
                <span>
                  {row.name}
                  <small>{row.en}</small>
                </span>
                <div className="tr">
                  <div
                    className="fl"
                    style={{
                      '--s': '0%',
                      '--w': `${(row.max / row.scale) * 100}%`,
                    }}
                  />
                </div>
                <b className="sr-val">
                  <span className="num">
                    {row.min ? `${formatNum(row.min, row.dec || 0)}–` : row.max && '≤ '}
                    {formatNum(row.max, row.dec || 0)}
                    {row.unit.trim() === '%' ? '%' : ''}
                  </span>
                  {row.unit.trim() !== '%' && <em>{row.unit.trim()}</em>}
                </b>
              </div>
            ))}
            <div className="sr rv">
              <span>
                الحموضة
                <small>pH</small>
              </span>
              <div className="tr">
                <div
                  className="fl"
                  style={{
                    '--s': '0%',
                    '--w': `${(6.5 / 14) * 100}%`,
                  }}
                />
              </div>
              <b className="sr-val">
                <span className="num">{formatNum(6.5, 1)}</span>
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
