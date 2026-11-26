import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AREA_CONVERSIONS,
  CALCULATOR_STEPS,
  CROP_LABELS,
  CROP_TYPE_IDS,
  SOIL_LABELS,
  SOIL_TYPE_IDS,
  evaluateCompostEstimate,
  formatEstimateRange,
  getPerFeddanRateRange,
  getRuntimeCalculatorConfig,
} from '../utils/calculator';
import { BrandAssetIcon } from './BrandAssetIcon';
import { Icon } from './IconSprite';

const STEP_ICONS = ['iconFieldRidges', 'iconSugarcaneStalk', 'iconCompostBag'];

export function FarmCalculator({ onApplyEstimate }) {
  const config = useMemo(() => getRuntimeCalculatorConfig(), []);

  const [areaFeddan, setAreaFeddan] = useState('');
  const [cropType, setCropType] = useState('field_crops');
  const [soilType, setSoilType] = useState('loamy');
  const [estimate, setEstimate] = useState(null);
  const [areaError, setAreaError] = useState('');
  const [hintHovered, setHintHovered] = useState(false);
  const [hintPinned, setHintPinned] = useState(false);
  const hintOpen = hintHovered || hintPinned;
  const hintRef = useRef(null);

  const perFeddanRate = useMemo(
    () => getPerFeddanRateRange(cropType, soilType, config),
    [cropType, soilType, config]
  );

  // Keep estimate live-updated whenever crop or soil changes after a valid area has been calculated
  useEffect(() => {
    if (!estimate) return;
    const evaluation = evaluateCompostEstimate({ areaFeddan, cropType, soilType }, config);
    if (evaluation.status === 'ready') {
      setEstimate(evaluation.estimate);
    }
  }, [cropType, soilType, config]);

  // Close conversion hint popover on outside click or Escape
  useEffect(() => {
    if (!hintPinned && !hintHovered) return;
    const onPointerDown = (e) => {
      if (hintRef.current && !hintRef.current.contains(e.target)) {
        setHintPinned(false);
        setHintHovered(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setHintPinned(false);
        setHintHovered(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hintPinned, hintHovered]);

  const handleCalculate = (e) => {
    e.preventDefault();
    setAreaError('');

    const evaluation = evaluateCompostEstimate({ areaFeddan, cropType, soilType }, config);
    if (evaluation.status === 'invalid') {
      setEstimate(null);
      setAreaError(evaluation.errors.areaFeddan || 'يرجى إدخال مساحة صالحة بالفدان أكبر من الصفر.');
      return;
    }

    setEstimate(evaluation.estimate);
  };

  const handleSendToContact = () => {
    if (!onApplyEstimate) return;

    // Auto-evaluate if user entered a valid Feddan area without clicking Calculate yet
    let activeEstimate = estimate;
    if (!activeEstimate && areaFeddan.trim()) {
      const check = evaluateCompostEstimate({ areaFeddan, cropType, soilType }, config);
      if (check.status === 'ready') {
        activeEstimate = check.estimate;
        setEstimate(check.estimate);
        setAreaError('');
      }
    }

    const rateTonsText = formatEstimateRange(
      activeEstimate?.rateMinTonsPerFeddan ?? perFeddanRate.rateMinTonsPerFeddan,
      activeEstimate?.rateMaxTonsPerFeddan ?? perFeddanRate.rateMaxTonsPerFeddan
    );
    const rateM3Text = formatEstimateRange(
      activeEstimate?.rateMinCubicMetersPerFeddan ?? perFeddanRate.rateMinCubicMetersPerFeddan,
      activeEstimate?.rateMaxCubicMetersPerFeddan ?? perFeddanRate.rateMaxCubicMetersPerFeddan
    );

    const lines = [
      'تقدير حاسبة احتياج المزرعة:',
      areaFeddan.trim() ? `- المساحة: ${areaFeddan.trim()} فدان` : null,
      `- نوع المحصول: ${CROP_LABELS[cropType]}`,
      `- نوع التربة: ${SOIL_LABELS[soilType]}`,
      `- معدل الإضافة التقديري للفدان: ${rateTonsText} طن/فدان (≈ ${rateM3Text} م³/فدان)`,
    ];

    if (activeEstimate) {
      const totalTons = formatEstimateRange(
        activeEstimate.estimatedMinTons,
        activeEstimate.estimatedMaxTons
      );
      const totalM3 = formatEstimateRange(
        activeEstimate.estimatedMinCubicMeters,
        activeEstimate.estimatedMaxCubicMeters
      );
      lines.push(`- الاحتياج التقديري الإجمالي: ${totalTons} طن (≈ ${totalM3} م³)`);
    }

    onApplyEstimate(lines.filter(Boolean).join('\n'));
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  const tonsRangeDisplay = estimate
    ? formatEstimateRange(estimate.estimatedMinTons, estimate.estimatedMaxTons)
    : '0';
  const cubicRangeDisplay = estimate
    ? formatEstimateRange(estimate.estimatedMinCubicMeters, estimate.estimatedMaxCubicMeters)
    : '0';

  const perFeddanTonsText = formatEstimateRange(
    perFeddanRate.rateMinTonsPerFeddan,
    perFeddanRate.rateMaxTonsPerFeddan
  );
  const perFeddanM3Text = formatEstimateRange(
    perFeddanRate.rateMinCubicMetersPerFeddan,
    perFeddanRate.rateMaxCubicMetersPerFeddan
  );

  return (
    <section id="calc" className="calc" aria-label="حاسبة احتياجات المزرعة من الكمبوست">
      <div className="wrap">
        <div className="calc-head rv">
          <p className="calc-eyebrow">مقدّر الاحتياج ثنائي الوحدات (بالفدان)</p>
          <h2>حاسبة احتياج المزرعة</h2>
          <p>
            أدخل مساحة الأرض بالفدان واختر نوع المحصول ونوع التربة لمعرفة النطاق التقديري (الحد
            الأدنى – الأقصى) بالطن والمتر المكعب، ثم انقل النتائج مباشرة لطلب عرض السعر.
          </p>
        </div>

        <ol className="calc-steps rv" style={{ '--d': '.08s' }}>
          {CALCULATOR_STEPS.map((step, idx) => (
            <li key={step.num} className="calc-step">
              <div className="calc-step-top">
                <span className="calc-step-num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="calc-step-icon-box">
                  <BrandAssetIcon
                    iconKey={STEP_ICONS[idx]}
                    onDark
                    className="calc-step-icon"
                  />
                </span>
              </div>
              <div className="calc-step-body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="calc-card rv" style={{ '--d': '.15s' }}>
          <div className="calc-grid">
            {/* Inputs Column */}
            <div className="calc-inputs">
              <div className="calc-inputs-head">
                <h3>احسب احتياج مزرعتك من الكمبوست</h3>
                <p>احصل على تقدير مبدئي لنطاق احتياج مزرعتك بالطن والمتر المكعب</p>
              </div>

              <form id="calcForm" onSubmit={handleCalculate} noValidate>
                <div className="calc-fields">
                  {/* 1. Farm Area (Feddan) + Interactive Conversion Hint */}
                  <div className="calc-field calc-field-area">
                    <div className="calc-label-row">
                      <label htmlFor="area">مساحة المزرعة (فدان) *</label>

                      <div
                        ref={hintRef}
                        className="calc-hint"
                        onMouseEnter={() => setHintHovered(true)}
                        onMouseLeave={() => setHintHovered(false)}
                      >
                        <button
                          type="button"
                          className="calc-hint-btn"
                          onClick={() => setHintPinned((prev) => !prev)}
                          aria-expanded={hintOpen}
                          aria-label="عرض تحويلات وحدات المساحة الشائعة في مصر"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </button>

                        {hintOpen && (
                          <div role="tooltip" className="calc-hint-popover">
                            <p className="calc-hint-title">تحويلات وحدات المساحة في مصر</p>
                            <ul className="calc-hint-list">
                              {AREA_CONVERSIONS.map((item) => (
                                <li key={item.unit}>
                                  <span className="calc-hint-unit">{item.unit}</span>
                                  <span dir="ltr" className="calc-hint-val">
                                    {item.value}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <input
                      id="area"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder="مثال: 25"
                      value={areaFeddan}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAreaFeddan(val);
                        if (areaError) setAreaError('');
                        if (estimate) {
                          const evalNext = evaluateCompostEstimate(
                            { areaFeddan: val, cropType, soilType },
                            config
                          );
                          setEstimate(evalNext.status === 'ready' ? evalNext.estimate : null);
                        }
                      }}
                      aria-invalid={Boolean(areaError)}
                      aria-describedby={areaError ? 'calc-area-err' : undefined}
                    />
                    {areaError && (
                      <p id="calc-area-err" role="alert" className="calc-err">
                        {areaError}
                      </p>
                    )}
                  </div>

                  {/* 2. Crop Type */}
                  <div className="calc-field">
                    <label htmlFor="crop">نوع المحصول</label>
                    <select
                      id="crop"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                    >
                      {CROP_TYPE_IDS.map((id) => (
                        <option key={id} value={id}>
                          {CROP_LABELS[id]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Soil Type */}
                  <div className="calc-field">
                    <label htmlFor="soil">نوع التربة</label>
                    <select
                      id="soil"
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                    >
                      {SOIL_TYPE_IDS.map((id) => (
                        <option key={id} value={id}>
                          {SOIL_LABELS[id]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Per-Feddan Reference Bar */}
                <div className="calc-ref-bar">
                  <span className="calc-ref-label">معدل الإضافة التقديري للفدان:</span>
                  <div className="calc-ref-badges">
                    <span className="calc-badge calc-badge-tons">
                      <span dir="ltr">{perFeddanTonsText}</span>
                      <span>طن / فدان</span>
                    </span>
                    <span className="calc-badge calc-badge-m3">
                      <span>≈</span>
                      <span dir="ltr">{perFeddanM3Text}</span>
                      <span>م³ / فدان</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="calc-actions">
                  <button type="submit" className="btn btn-green calc-submit-btn">
                    <Icon name="calc" />
                    <span>احسب الاحتياج</span>
                  </button>
                  <button
                    type="button"
                    className="btn calc-quote-btn"
                    onClick={handleSendToContact}
                  >
                    <span>المتابعة لطلب عرض السعر</span>
                    <Icon name="arr" />
                  </button>
                </div>
              </form>
            </div>

            {/* Dual-Unit Output Panel */}
            <div className="calc-output" id="res" aria-live="polite">
              <div className="calc-out-icon-wrap">
                <BrandAssetIcon iconKey="iconSoilLeaves" className="calc-out-brand-icon" />
              </div>

              <p className="calc-out-label">
                {estimate
                  ? 'الاحتياج التقديري الإجمالي'
                  : 'النطاق التقديري (الحد الأدنى – الأقصى)'}
              </p>

              <div className="calc-out-values">
                <p className="calc-out-tons">
                  <span dir="ltr">{tonsRangeDisplay}</span>
                  <span className="calc-out-unit">طن</span>
                </p>
                <p className="calc-out-m3">
                  <span dir="ltr">{cubicRangeDisplay}</span>
                  <span className="calc-out-unit-sub">م³</span>
                </p>
              </div>

              <p className="calc-out-caption">
                نطاق الكتلة بالطن المتري وما يعادلها بالحجم (م³)
              </p>
              <p className="calc-out-density">
                محسوبة وفق الكثافة المخبرية المعتمدة للمنتج: 500 – 550 كجم/م³
              </p>
            </div>
          </div>

          <p className="calc-disclaimer">
            المخرجات هي تقديرات مبدئية استرشادية بنطاق (الحد الأدنى – الأقصى) بناءً على الكثافة
            المخبرية للمنتج (500–550 كجم/م³) ومتوسطات الإضافة الزراعية، ولا تُعد توصية زراعية نهائية
            أو عرض سعر ملزماً.
          </p>
        </div>
      </div>
    </section>
  );
}
