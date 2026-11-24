import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calculator as CalcIcon, Info } from 'lucide-react';
import {
  CROP_TYPE_IDS,
  SOIL_TYPE_IDS,
  evaluateCompostEstimate,
  formatEstimateRange,
  getPerFeddanRateRange,
  getRuntimeCalculatorConfig,
  type CalculatorConfig,
  type CalculatorEstimate,
  type CropTypeId,
  type SoilTypeId,
} from '../lib/calculator';
import { AppLink, useApp } from '../context/AppContext';

interface CompostCalculatorWidgetProps {
  mode: 'preview' | 'full';
  configOverride?: CalculatorConfig;
}

export function CompostCalculatorWidget({
  mode,
  configOverride,
}: CompostCalculatorWidgetProps) {
  const { navigate, setCalculatorTransfer, t, isRtl } = useApp();

  const config = useMemo(
    () => configOverride ?? getRuntimeCalculatorConfig(),
    [configOverride]
  );

  const [areaFeddan, setAreaFeddan] = useState('');
  const [cropType, setCropType] = useState<CropTypeId>('field_crops');
  const [soilType, setSoilType] = useState<SoilTypeId>('loamy');
  const [estimate, setEstimate] = useState<CalculatorEstimate | null>(null);
  const [areaError, setAreaError] = useState<string | undefined>(undefined);
  const [hintHovered, setHintHovered] = useState(false);
  const [hintPinned, setHintPinned] = useState(false);
  const hintOpen = hintHovered || hintPinned;
  const hintRef = useRef<HTMLDivElement>(null);

  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;

  // Live per-Feddan rate (tons/Feddan + equivalent m³/Feddan) for selected crop + soil
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
    const onPointerDown = (e: PointerEvent) => {
      if (hintRef.current && !hintRef.current.contains(e.target as Node)) {
        setHintPinned(false);
        setHintHovered(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
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

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setAreaError(undefined);

    const evaluation = evaluateCompostEstimate({ areaFeddan, cropType, soilType }, config);
    if (evaluation.status === 'invalid') {
      setEstimate(null);
      setAreaError(t.calculator.invalidAreaError);
      return;
    }

    setEstimate(evaluation.estimate);
  };

  const handleContinueToQuotation = () => {
    // Auto-evaluate if user entered a valid Feddan area without clicking Calculate yet
    let activeEstimate = estimate;
    if (!activeEstimate && areaFeddan.trim()) {
      const check = evaluateCompostEstimate({ areaFeddan, cropType, soilType }, config);
      if (check.status === 'ready') {
        activeEstimate = check.estimate;
      }
    }

    setCalculatorTransfer({
      areaFeddan: areaFeddan.trim(),
      cropType,
      cropLabel: t.calculator.cropTypes[cropType],
      soilType,
      soilLabel: t.calculator.soilTypes[soilType],
      rateMinTonsPerFeddan: activeEstimate?.rateMinTonsPerFeddan ?? perFeddanRate.rateMinTonsPerFeddan,
      rateMaxTonsPerFeddan: activeEstimate?.rateMaxTonsPerFeddan ?? perFeddanRate.rateMaxTonsPerFeddan,
      rateMinCubicMetersPerFeddan:
        activeEstimate?.rateMinCubicMetersPerFeddan ?? perFeddanRate.rateMinCubicMetersPerFeddan,
      rateMaxCubicMetersPerFeddan:
        activeEstimate?.rateMaxCubicMetersPerFeddan ?? perFeddanRate.rateMaxCubicMetersPerFeddan,
      estimatedMinTons: activeEstimate ? activeEstimate.estimatedMinTons : null,
      estimatedMaxTons: activeEstimate ? activeEstimate.estimatedMaxTons : null,
      estimatedMinCubicMeters: activeEstimate ? activeEstimate.estimatedMinCubicMeters : null,
      estimatedMaxCubicMeters: activeEstimate ? activeEstimate.estimatedMaxCubicMeters : null,
    });

    navigate('/request-quotation');
  };

  const inputBaseClass =
    'w-full h-10 sm:h-11 px-2.5 sm:px-3.5 rounded-[7px] text-[11px] sm:text-sm placeholder:text-[10px] sm:placeholder:text-sm font-medium transition-colors bg-white text-[#1F2720] placeholder:text-[#6B7369] border border-[#D4CEBF] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#286631] dark:bg-[#E9E3D4]/92 dark:text-[#121813] dark:placeholder:text-[#3D463C] dark:border-white/25 dark:focus-visible:outline-[#7AB34C]';

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
    <div className="relative">
      {/* Subtle ambient brand glow behind the glass card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 sm:-inset-x-4 -inset-y-2 sm:-inset-y-3 rounded-[14px] sm:rounded-[18px] opacity-65 dark:opacity-100"
        style={{
          background:
            'radial-gradient(60% 80% at 18% 20%, rgba(122, 179, 76, 0.11) 0%, rgba(40, 102, 49, 0.1) 46%, transparent 78%)',
        }}
      />

      {/* Lightweight Glassy Container harmonized to official brand palette */}
      <div className="relative rounded-[10px] sm:rounded-[12px] p-4 sm:p-6 md:p-7 lg:p-8 backdrop-blur-xl transition-colors bg-white/84 border border-[#3D463C]/14 shadow-[0_14px_36px_rgba(31,39,32,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] dark:bg-[#1A231B]/72 dark:bg-gradient-to-br dark:from-white/[0.08] dark:via-white/[0.03] dark:to-transparent dark:border-white/14 dark:shadow-[0_20px_54px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-center">
          {/* Start Column: Inputs */}
          <div className="lg:col-span-8">
            <div className="mb-3.5 sm:mb-5">
              <h2 className="font-bold-display text-[19px] sm:text-2xl lg:text-[27px] font-bold tracking-tight text-[#286631] dark:text-[#F4F1E8]">
                {t.calculator.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm lg:text-[15px] text-[#3D463C] dark:text-[#C8C3B6]">
                {t.calculator.subtitle}
              </p>
            </div>

            <form onSubmit={handleCalculate} noValidate>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                {/* 1. Farm Area (Feddan) + Interactive Conversion Hint Popover */}
                <div className="col-span-2 sm:col-span-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <label
                      htmlFor={`calc-area-${mode}`}
                      className="block text-[11px] sm:text-xs font-semibold text-[#3D463C] dark:text-[#E9E3D4]"
                    >
                      {t.calculator.areaLabel}
                    </label>

                    {/* Egypt Area Unit Conversions Hint Icon (hover + click-to-pin) */}
                    <div
                      ref={hintRef}
                      className="relative inline-flex"
                      onMouseEnter={() => setHintHovered(true)}
                      onMouseLeave={() => setHintHovered(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setHintPinned((prev) => !prev)}
                        aria-expanded={hintOpen}
                        aria-label={t.calculator.conversionHintAria}
                        className="inline-flex items-center justify-center w-5 h-5 rounded-[5px] text-[#286631] hover:bg-[#E9E3D4] dark:text-[#7AB34C] dark:hover:bg-[#243226] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C]"
                      >
                        <Info className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      {hintOpen && (
                        <div
                          role="tooltip"
                          className="absolute z-40 top-full end-0 mt-1.5 w-60 sm:w-64 rounded-[9px] border p-3 shadow-[0_14px_34px_rgba(18,24,19,0.2)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.6)] bg-[#FAF8F3] border-[#D4CEBF] text-[#1F2720] dark:bg-[#161F17] dark:border-[#3D463C] dark:text-[#F4F1E8]"
                        >
                          <p className="text-[11px] font-bold text-[#286631] dark:text-[#7AB34C] mb-2">
                            {t.calculator.conversionHintTitle}
                          </p>
                          <ul className="space-y-1.5">
                            {t.calculator.conversions.map((item) => (
                              <li
                                key={item.unit}
                                className="flex items-center justify-between gap-2 text-[11px] leading-snug border-b last:border-b-0 border-[#E5DFD0] dark:border-[#283329] pb-1 last:pb-0"
                              >
                                <span className="font-semibold text-[#252E25] dark:text-[#E5DFD0]">
                                  {item.unit}
                                </span>
                                <span
                                  dir="ltr"
                                  className="tabular-nums font-medium text-[#525B51] dark:text-[#B6B1A4]"
                                >
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
                    id={`calc-area-${mode}`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={areaFeddan}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAreaFeddan(val);
                      if (areaError) setAreaError(undefined);
                      if (estimate) {
                        const evalNext = evaluateCompostEstimate(
                          { areaFeddan: val, cropType, soilType },
                          config
                        );
                        setEstimate(evalNext.status === 'ready' ? evalNext.estimate : null);
                      }
                    }}
                    placeholder={t.calculator.areaPlaceholder}
                    aria-invalid={Boolean(areaError)}
                    aria-describedby={areaError ? `calc-area-err-${mode}` : undefined}
                    className={inputBaseClass}
                  />
                  {areaError && (
                    <p
                      id={`calc-area-err-${mode}`}
                      role="alert"
                      className="mt-1 text-[11px] font-medium text-[#A87945] dark:text-[#D9A76A]"
                    >
                      {areaError}
                    </p>
                  )}
                </div>

                {/* 2. Crop Type Tier Selector */}
                <div className="min-w-0">
                  <label
                    htmlFor={`calc-crop-${mode}`}
                    className="block text-[11px] sm:text-xs font-semibold mb-1.5 text-[#3D463C] dark:text-[#E9E3D4]"
                  >
                    {t.calculator.cropTypeLabel}
                  </label>
                  <select
                    id={`calc-crop-${mode}`}
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value as CropTypeId)}
                    className={inputBaseClass}
                  >
                    {CROP_TYPE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {t.calculator.cropTypes[id]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Soil Type Tier Selector */}
                <div className="min-w-0">
                  <label
                    htmlFor={`calc-soil-${mode}`}
                    className="block text-[11px] sm:text-xs font-semibold mb-1.5 text-[#3D463C] dark:text-[#E9E3D4]"
                  >
                    {t.calculator.soilTypeLabel}
                  </label>
                  <select
                    id={`calc-soil-${mode}`}
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as SoilTypeId)}
                    className={inputBaseClass}
                  >
                    {SOIL_TYPE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {t.calculator.soilTypes[id]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Per-Feddan Reference Bar (Tons/Feddan alongside equivalent m³/Feddan) */}
              <div className="mt-3 sm:mt-3.5 rounded-[8px] border px-3 py-2 sm:px-3.5 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 bg-[#F6F3EC]/85 border-[#D8D0BE] dark:bg-[#121913]/70 dark:border-[#344034]">
                <span className="text-[11px] sm:text-xs font-semibold text-[#4E584D] dark:text-[#B6B1A4]">
                  {t.calculator.perFeddanRateLabel}:
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11.5px] sm:text-xs font-bold tabular-nums">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                    <span dir="ltr" className="inline-block">{perFeddanTonsText}</span>
                    <span>{t.calculator.tonsUnit} {t.calculator.perFeddanUnit}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#EFECE3] text-[#3D463C] border border-[#D8D0BE] dark:bg-[#1B251C] dark:text-[#DCD6C8] dark:border-[#344034]">
                    <span>≈</span>
                    <span dir="ltr" className="inline-block">{perFeddanM3Text}</span>
                    <span>{t.calculator.cubicUnit} {t.calculator.perFeddanUnit}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`mt-3.5 sm:mt-4 ${
                  mode === 'full'
                    ? 'flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3'
                    : 'flex flex-wrap items-center gap-2.5 sm:gap-3'
                }`}
              >
                <button
                  type="submit"
                  className="w-full sm:w-auto h-10 sm:h-11 px-5 sm:px-7 rounded-[8px] text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer bg-[#7AB34C] hover:bg-[#8AC25C] text-[#111A12] hover:shadow-[0_6px_20px_rgba(122,179,76,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C]"
                >
                  {t.calculator.calculateBtn}
                </button>

                {mode === 'full' && (
                  <button
                    type="button"
                    onClick={handleContinueToQuotation}
                    className="w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6 rounded-[8px] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap border transition-colors cursor-pointer border-[#3D463C]/25 bg-[#F6F3EC] hover:bg-[#E9E3D4] text-[#286631] dark:border-white/20 dark:bg-white/[0.06] dark:hover:bg-[#243226] dark:hover:border-[#7AB34C]/55 dark:text-[#F4F1E8]"
                  >
                    <span>{t.calculator.continueBtn}</span>
                    <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* End Column: Dual-Unit Min–Max Output Panel */}
          <div className="lg:col-span-4 pt-4 sm:pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-s lg:ps-8 border-[#D7D1C2] dark:border-white/15 flex flex-col items-center text-center">
            <svg
              width="36"
              height="28"
              viewBox="0 0 36 28"
              fill="none"
              aria-hidden="true"
              className="mb-1.5 sm:mb-2 w-8 h-6 sm:w-9 sm:h-7"
            >
              <path
                d="M17.5 25C10.5 24.4 5 18.8 5 11.2C5 9.2 5.4 7.5 6.2 6C12 6.8 17 11.8 17.5 18.6V25Z"
                fill="#286631"
              />
              <path
                d="M18.5 25C19 17.2 24 9.5 31 5.5C31.8 13.8 27 22 18.5 25Z"
                fill="#7AB34C"
              />
            </svg>

            <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-[#3D463C] dark:text-[#C8C3B6]">
              {estimate
                ? t.calculator.estimatedRequirementLabel
                : t.calculator.estimatedRangeLabel}
            </p>

            <div className="mt-2 flex flex-wrap lg:flex-col items-baseline justify-center gap-x-4 gap-y-1.5 lg:gap-1.5 tabular-nums">
              <p className="inline-flex items-baseline gap-1.5 font-bold-display text-[20px] sm:text-2xl lg:text-[26px] font-bold text-[#1F2720] dark:text-[#F4F1E8] leading-tight">
                <span dir="ltr" className="inline-block">{tonsRangeDisplay}</span>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-[#286631] dark:text-[#7AB34C]">
                  {t.calculator.tonsUnit}
                </span>
              </p>
              <p className="inline-flex items-baseline gap-1.5 font-bold-display text-[18px] sm:text-xl lg:text-[23px] font-bold text-[#3D463C] dark:text-[#DCD6C8] leading-tight">
                <span dir="ltr" className="inline-block">{cubicRangeDisplay}</span>
                <span className="text-xs sm:text-sm lg:text-base font-semibold text-[#5C655B] dark:text-[#B6B1A4]">
                  {t.calculator.cubicUnit}
                </span>
              </p>
            </div>

            <p className="mt-1.5 sm:mt-2 text-[10.5px] sm:text-[11px] leading-snug max-w-[270px] text-[#5C655B] dark:text-[#B6B1A4]">
              {t.calculator.dualUnitCaption}
            </p>
            <p className="mt-1 text-[10px] font-medium text-[#286631] dark:text-[#7AB34C]">
              {t.calculator.densityNote}
            </p>

            {mode === 'preview' && (
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <AppLink
                  to="/calculator"
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold underline-offset-4 hover:underline text-[#286631] dark:text-[#7AB34C]"
                >
                  <CalcIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.calculator.openFullLink}</span>
                </AppLink>
                <span aria-hidden="true" className="text-[#C7C1B2] dark:text-white/25">
                  ·
                </span>
                <button
                  type="button"
                  onClick={handleContinueToQuotation}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold underline-offset-4 hover:underline cursor-pointer text-[#3D463C] hover:text-[#286631] dark:text-[#E9E3D4] dark:hover:text-white"
                >
                  <span>{t.calculator.continueBtn}</span>
                  <DirectionArrow className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mandatory Estimate Disclaimer */}
        <p className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[#D7D1C2] dark:border-white/12 text-[11px] sm:text-xs leading-relaxed text-[#5C655B] dark:text-[#B6B1A4]">
          {t.calculator.disclaimer}
        </p>
      </div>
    </div>
  );
}
