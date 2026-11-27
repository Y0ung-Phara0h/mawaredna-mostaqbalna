import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS, SCENE_FIELD_STALKS } from '../data/siteData';
import { formatNum } from '../utils/format';

const SUN_RAYS = Array.from({ length: 12 }, (_, i) => i * 30);

const SCENE_STAGE_LABELS = [
  { num: '1', label: 'المخلفات والجمع' },
  { num: '2', label: 'النقل والتجميع' },
  { num: '3', label: 'المعالجة والتخمير' },
  { num: '4', label: 'التقليب والتجهيز' },
  { num: '5', label: 'الكمبوست والزراعة' },
];

export function ProcessSection() {
  const sceneRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const stepsEl = stepsRef.current;

    let sceneObs;
    if (sceneEl) {
      sceneObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle('run', entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );
      sceneObs.observe(sceneEl);
    }

    let stepsObs;
    if (stepsEl) {
      stepsObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('go');
              stepsObs.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      stepsObs.observe(stepsEl);
    }

    return () => {
      if (sceneObs) sceneObs.disconnect();
      if (stepsObs) stepsObs.disconnect();
    };
  }, []);

  return (
    <section id="process">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>من المخلفات إلى منتج</h2>
          <p>
            هكذا نعمل: من الحقل إلى الموقع ثم إلى الأرض مرة أخرى، في{' '}
            <span className="num">10</span> مراحل منظمة.
          </p>
        </div>

        <div className="scene rv" id="scene" ref={sceneRef}>
          <div className="scene-steps" aria-label="ملخص مراحل تحويل المخلفات">
            {SCENE_STAGE_LABELS.map((stage) => (
              <div className="scene-step" key={stage.num}>
                <span className="num">{stage.num}</span>
                <span>{stage.label}</span>
              </div>
            ))}
          </div>

          <svg
            viewBox="0 20 1200 320"
            role="img"
            aria-label="مشهد متحرك: شاحنة تنقل مخلفات قصب السكر من الحقل إلى موقع المعالجة والتخمير، وحفار يقلبها، ثم تتجهز وتعود ككمبوست يغذي الأرض من جديد"
          >
            <g transform="translate(120 96)">
              <circle className="glow" r="30" fill="#e6cf95" />
              <g className="rays" id="rays" stroke="#e6cf95" strokeWidth="3" strokeLinecap="round">
                {SUN_RAYS.map((deg) => (
                  <line key={deg} x1="0" y1="-42" x2="0" y2="-56" transform={`rotate(${deg})`} />
                ))}
              </g>
            </g>

            <path
              className="hill"
              d="M0 240C150 190 300 215 450 200S800 175 1000 205 1150 190 1200 200V250H0z"
            />
            <rect y="240" width="1200" height="100" fill="#5a432b" />
            <rect y="240" width="1200" height="8" fill="#7a5a3a" />
            <rect y="288" width="1200" height="52" fill="#3b2a1b" />

            <g id="sf">
              {SCENE_FIELD_STALKS.map((stalk) => (
                <g key={stalk.id} transform={`translate(${stalk.x} 250)`}>
                  <g className="sw" style={{ '--s': stalk.s }}>
                    <g className="sg" style={{ '--d': stalk.d }}>
                      <path
                        d={`M0 0V-${stalk.t}`}
                        stroke="#4f8f3a"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M0 -${(stalk.t * 0.55).toFixed(1)}q16-5 24-22M0 -${(stalk.t * 0.8).toFixed(1)}q-15-5-23-19`}
                        fill="none"
                        stroke="#7ab34c"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                </g>
              ))}
            </g>

            <g fill="#6b4a2e">
              <path d="M215 250q50-62 100 0z" />
              <path d="M320 250q50-62 100 0z" />
              <path d="M425 250q50-62 100 0z" />
            </g>
            <g>
              <path className="steam" style={{ '--d': '0s' }} d="M265 196c-9-12 9-18 0-30" />
              <path className="steam" style={{ '--d': '1.3s' }} d="M370 196c-9-12 9-18 0-30" />
              <path className="steam" style={{ '--d': '2.6s' }} d="M475 196c-9-12 9-18 0-30" />
            </g>

            <g fill="none" stroke="#4f8f3a" strokeWidth="3" strokeLinecap="round">
              <g transform="translate(60 250)">
                <g className="spr">
                  <path d="M0 0V-38M0-26q-15-2-19-15M0-32q15-2 19-17" />
                </g>
              </g>
              <g transform="translate(110 250)">
                <g className="spr" style={{ animationDelay: '.2s' }}>
                  <path d="M0 0V-44M0-30q-15-2-19-15M0-38q15-2 19-17" />
                </g>
              </g>
              <g transform="translate(160 250)">
                <g className="spr" style={{ animationDelay: '.4s' }}>
                  <path d="M0 0V-34M0-22q-15-2-19-15M0-28q15-2 19-16" />
                </g>
              </g>
            </g>

            <g>
              <rect x="770" y="232" width="102" height="18" rx="9" fill="#2f2016" />
              <rect x="785" y="200" width="72" height="32" rx="5" fill="#a87945" />
              <rect x="824" y="184" width="30" height="20" rx="3" fill="#e9e3d4" />
              <g transform="translate(790 205)">
                <g className="arm">
                  <path d="M0 0L-90 -40" stroke="#a87945" strokeWidth="10" strokeLinecap="round" />
                  <path
                    d="M-90 -40L-122 19"
                    stroke="#8a6238"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path d="M-134 19l24 4-7 15-20-7z" fill="#2f2016" />
                </g>
              </g>
            </g>

            <g transform="translate(668 292)">
              <path className="dpile" d="M-68 0Q0 -70 70 0z" fill="#6b4a2e" />
            </g>

            <g transform="translate(470 330)">
              <g className="truck">
                <rect x="0" y="-46" width="46" height="38" rx="5" fill="#286631" />
                <rect x="6" y="-40" width="20" height="14" rx="2" fill="#e9e3d4" />
                <g transform="translate(150 -22)">
                  <g className="bed">
                    <rect x="-102" y="-22" width="102" height="26" rx="3" fill="#8a6238" />
                    <path className="load" d="M-98 -22Q-50 -58 -4 -22z" fill="#4a3523" />
                  </g>
                </g>
                <g fill="#2f2016">
                  <circle cx="22" cy="-9" r="9" />
                  <circle cx="118" cy="-9" r="9" />
                  <circle cx="136" cy="-9" r="9" />
                </g>
                <g fill="#e9e3d4">
                  <circle cx="22" cy="-9" r="3" />
                  <circle cx="118" cy="-9" r="3" />
                  <circle cx="136" cy="-9" r="3" />
                </g>
              </g>
            </g>

            <line
              className="dash"
              x1="0"
              y1="336"
              x2="1200"
              y2="336"
              stroke="#e9e3d4"
              strokeWidth="3"
              strokeDasharray="28 24"
              opacity=".5"
            />
          </svg>
        </div>

        <div className="steps" id="steps" ref={stepsRef}>
          {PROCESS_STEPS.map((step, i) => (
            <div className="step" style={{ '--i': i }} key={step}>
              <i className="num">{formatNum(i + 1)}</i>
              <b>{step}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
