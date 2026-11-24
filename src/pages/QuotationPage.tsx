import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Package,
  Sliders,
  Truck,
  X,
} from 'lucide-react';
import { getQuotationEndpoint } from '../config/siteConfig';
import {
  QUOTATION_REQUEST_TYPES,
  createInitialQuotationForm,
  submitQuotationRequest,
  validateQuotationForm,
  type QuotationFieldErrors,
  type QuotationFormData,
  type QuotationRequestType,
} from '../lib/quotation';
import { formatEstimateRange } from '../lib/calculator';
import { stripEgyptPrefixForInput, withEgyptCountryCode } from '../lib/contact';
import { AppLink, useApp } from '../context/AppContext';

const REQUEST_TYPE_ICONS: Record<QuotationRequestType, typeof Package> = {
  Standard: Package,
  Bulk: Truck,
  Customized: Sliders,
};

export function QuotationPage() {
  const { t, calculatorTransfer, setCalculatorTransfer } = useApp();

  const [formData, setFormData] = useState<QuotationFormData>(() =>
    createInitialQuotationForm(calculatorTransfer, {
      tonsUnit: t.calculator.tonsUnit,
      cubicUnit: t.calculator.cubicUnit,
    })
  );
  const [errors, setErrors] = useState<QuotationFieldErrors>({});
  const [status, setStatus] = useState<
    | { kind: 'idle' }
    | { kind: 'submitting' }
    | { kind: 'success'; referenceId?: string }
    | { kind: 'error'; reason: 'unconfigured' | 'network' | 'rejected' }
  >({ kind: 'idle' });

  useEffect(() => {
    if (!calculatorTransfer) return;
    if (
      calculatorTransfer.estimatedMinTons !== null &&
      calculatorTransfer.estimatedMaxTons !== null
    ) {
      const tonsRange = formatEstimateRange(
        calculatorTransfer.estimatedMinTons,
        calculatorTransfer.estimatedMaxTons
      );
      const cubicRange = formatEstimateRange(
        calculatorTransfer.estimatedMinCubicMeters,
        calculatorTransfer.estimatedMaxCubicMeters
      );
      const qtySummary = `${tonsRange} ${t.calculator.tonsUnit} (${cubicRange} ${t.calculator.cubicUnit})`;
      const cropSoilSummary =
        calculatorTransfer.cropLabel && calculatorTransfer.soilLabel
          ? `${calculatorTransfer.cropLabel} — ${calculatorTransfer.soilLabel}`
          : '';
      setFormData((prev) => ({
        ...prev,
        standardQuantity: prev.standardQuantity || qtySummary,
        bulkVolume: prev.bulkVolume || qtySummary,
        targetCropOrSoil: prev.targetCropOrSoil || cropSoilSummary,
      }));
    }
  }, [calculatorTransfer, t.calculator.cubicUnit, t.calculator.tonsUnit]);

  const updateField = <K extends keyof QuotationFormData>(
    key: K,
    value: QuotationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawErrors = validateQuotationForm(formData);
    const localizedErrors: QuotationFieldErrors = {};
    for (const key of Object.keys(rawErrors) as Array<keyof QuotationFieldErrors>) {
      if (rawErrors[key] && key in t.quotation.validationErrors) {
        localizedErrors[key] =
          t.quotation.validationErrors[key as keyof typeof t.quotation.validationErrors];
      }
    }
    setErrors(localizedErrors);

    const firstErrorKey = Object.keys(localizedErrors)[0];
    if (firstErrorKey) {
      const el = document.getElementById(`quote-${firstErrorKey}`);
      el?.focus();
      return;
    }

    setStatus({ kind: 'submitting' });
    const endpoint = getQuotationEndpoint();
    const result = await submitQuotationRequest(
      {
        submittedAt: new Date().toISOString(),
        form: formData,
        calculatorSummary: calculatorTransfer,
      },
      endpoint
    );

    if (result.ok) {
      setStatus({ kind: 'success', referenceId: result.referenceId });
    } else {
      setStatus({ kind: 'error', reason: result.reason });
    }
  };

  const labelClass = 'block text-[11px] sm:text-sm font-semibold mb-1.5 text-[#252E25] dark:text-[#E5DFD0]';

  const inputClass = (hasError?: boolean) =>
    `w-full min-h-[40px] sm:min-h-[44px] px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-[7px] text-xs sm:text-sm placeholder:text-[10px] sm:placeholder:text-xs md:placeholder:text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 ${
      hasError
        ? 'bg-white text-[#1F2720] placeholder:text-[#6C746B] border border-[#B43C3C] focus-visible:outline-[#B43C3C] dark:bg-[#141B15] dark:text-[#F4F1E8] dark:placeholder:text-[#8E968C] dark:border-[#D6A063] dark:focus-visible:outline-[#D6A063]'
        : 'bg-white text-[#1F2720] placeholder:text-[#6C746B] border border-[#CFC6B2] focus-visible:outline-[#286631] dark:bg-[#141B15] dark:text-[#F4F1E8] dark:placeholder:text-[#8E968C] dark:border-[#3D463C] dark:focus-visible:outline-[#7AB34C]'
    }`;

  const errorTextClass = 'mt-1.5 text-[11px] sm:text-xs font-medium text-[#A52A2A] dark:text-[#E2B078]';

  const errorMessage =
    status.kind === 'error'
      ? status.reason === 'unconfigured'
        ? t.quotation.errorUnconfigured
        : status.reason === 'network'
          ? t.quotation.errorNetwork
          : t.quotation.errorRejected
      : '';

  return (
    <div className="min-h-[70vh] py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <p className="text-[11px] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-2 text-[#286631] dark:text-[#7AB34C]">
            {t.quotation.eyebrow}
          </p>
          <h1 className="font-bold-display text-[24px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-bold leading-[1.14] tracking-tight text-[#1F2720] dark:text-[#F4F1E8]">
            {t.quotation.title}
          </h1>
          <p className="mt-2.5 sm:mt-3 text-[13.5px] sm:text-[15px] lg:text-base leading-[1.68] text-[#3D463C] dark:text-[#D4CEBE]">
            {t.quotation.subtitle}
          </p>
        </div>

        {/* Prefilled Calculator Summary Banner */}
        {calculatorTransfer &&
          (calculatorTransfer.areaFeddan || calculatorTransfer.estimatedMinTons !== null) && (
            <div className="mb-6 rounded-[10px] border p-4 sm:p-5 flex items-start justify-between gap-4 bg-[#E9E3D4] border-[#C9BFA9] dark:bg-[#1C241D] dark:border-[#7AB34C]/50">
              <div>
                <p className="text-xs font-bold tracking-wide text-[#286631] dark:text-[#7AB34C]">
                  {t.quotation.transferredBadge}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs sm:text-sm tabular-nums text-[#1F2720] dark:text-[#F4F1E8]">
                  {calculatorTransfer.areaFeddan && (
                    <span>
                      <strong>{t.quotation.areaPrefix}</strong> {calculatorTransfer.areaFeddan}{' '}
                      {t.calculator.feddanUnit}
                    </span>
                  )}
                  {calculatorTransfer.cropLabel && (
                    <span>
                      <strong>{t.calculator.cropTypeLabel}:</strong> {calculatorTransfer.cropLabel}
                    </span>
                  )}
                  {calculatorTransfer.soilLabel && (
                    <span>
                      <strong>{t.calculator.soilTypeLabel}:</strong> {calculatorTransfer.soilLabel}
                    </span>
                  )}
                  {calculatorTransfer.estimatedMinTons !== null &&
                    calculatorTransfer.estimatedMaxTons !== null && (
                      <>
                        <span>
                          <strong>{t.quotation.massPrefix}</strong>{' '}
                          <span dir="ltr" className="inline-block">
                            {formatEstimateRange(
                              calculatorTransfer.estimatedMinTons,
                              calculatorTransfer.estimatedMaxTons
                            )}
                          </span>{' '}
                          {t.calculator.tonsUnit}
                        </span>
                        <span>
                          <strong>{t.quotation.volumePrefix}</strong>{' '}
                          <span dir="ltr" className="inline-block">
                            {formatEstimateRange(
                              calculatorTransfer.estimatedMinCubicMeters,
                              calculatorTransfer.estimatedMaxCubicMeters
                            )}
                          </span>{' '}
                          {t.calculator.cubicUnit}
                        </span>
                      </>
                    )}
                </div>
                <p className="mt-1.5 text-xs text-[#3D463C] dark:text-[#C5BFB0]">
                  {t.quotation.transferredCaveat}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCalculatorTransfer(null)}
                aria-label={t.quotation.clearSummaryAria}
                className="p-1.5 rounded-[6px] transition-colors cursor-pointer text-[#3D463C] hover:text-[#1F2720] hover:bg-white dark:text-[#C5BFB0] dark:hover:text-white dark:hover:bg-[#263328]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

        {/* Confirmed Success Banner */}
        {status.kind === 'success' && (
          <div
            role="status"
            className="mb-6 rounded-[10px] border p-5 flex items-start gap-3.5 bg-[#E9F2E4] border-[#286631] text-[#1F2720] dark:bg-[#19281A] dark:border-[#7AB34C] dark:text-[#F4F1E8]"
          >
            <CheckCircle2
              className="w-5 h-5 mt-0.5 shrink-0 text-[#286631] dark:text-[#7AB34C]"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-base font-bold">{t.quotation.successTitle}</h2>
              <p className="mt-1 text-sm leading-relaxed">{t.quotation.successMessage}</p>
              {status.referenceId && (
                <p className="mt-1.5 text-xs font-semibold tabular-nums">
                  {t.quotation.referencePrefix} {status.referenceId}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Recoverable Error Banner (preserves all user data) */}
        {status.kind === 'error' && (
          <div
            role="alert"
            className="mb-6 rounded-[10px] border p-5 flex items-start gap-3.5 bg-[#FAF2E8] border-[#A87945] text-[#4A2E12] dark:bg-[#241C13] dark:border-[#A87945] dark:text-[#F4F1E8]"
          >
            <AlertCircle
              className="w-5 h-5 mt-0.5 shrink-0 text-[#A87945] dark:text-[#D6A063]"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-base font-bold">{t.quotation.errorTitle}</h2>
              <p className="mt-1 text-sm leading-relaxed">{errorMessage}</p>
              <div className="mt-2.5">
                <AppLink
                  to="/contact"
                  className="text-xs font-bold underline underline-offset-4 text-[#286631] dark:text-[#7AB34C]"
                >
                  {t.quotation.viewContactChannels}
                </AppLink>
              </div>
            </div>
          </div>
        )}

        {/* Unified Form Panel */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[10px] sm:rounded-[12px] border p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-[#FAF8F3] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034]"
        >
          {/* 1. Request Type Selector (Standard | Bulk | Customized) */}
          <fieldset>
            <legend className="font-bold-display text-sm sm:text-base font-bold mb-2.5 sm:mb-3 text-[#1F2720] dark:text-[#F4F1E8]">
              {t.quotation.step1Legend}
            </legend>
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
              {QUOTATION_REQUEST_TYPES.map((type) => {
                const meta = t.quotation.requestTypes[type];
                const Icon = REQUEST_TYPE_ICONS[type];
                const selected = formData.requestType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('requestType', type)}
                    aria-pressed={selected}
                    className={`min-w-0 text-start rounded-[8px] sm:rounded-[10px] border p-2 sm:p-4 flex flex-col justify-start transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C] ${
                      selected
                        ? 'bg-[#E9E3D4] border-[#286631] dark:bg-[#223023] dark:border-[#7AB34C]'
                        : 'bg-[#F6F3EC] border-[#D8D0BE] hover:bg-[#E9E3D4]/70 dark:bg-[#141B15] dark:border-[#344034] dark:hover:bg-[#1E2920] dark:hover:border-[#7AB34C]/55'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <Icon
                        className={`w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0 ${
                          selected
                            ? 'text-[#286631] dark:text-[#7AB34C]'
                            : 'text-[#5A6459] dark:text-[#9AA398]'
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-[9.5px] sm:text-xs font-bold truncate ${
                          selected
                            ? 'text-[#286631] dark:text-[#7AB34C]'
                            : 'text-[#5A6459] dark:text-[#9AA398]'
                        }`}
                      >
                        {selected ? t.quotation.selectedLabel : t.quotation.selectLabel}
                      </span>
                    </div>
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm font-bold leading-snug break-words text-[#1F2720] dark:text-[#F4F1E8]">
                      {meta.title}
                    </p>
                    <p className="mt-0.5 sm:mt-1 text-[9.5px] sm:text-xs leading-snug sm:leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                      {meta.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 2. Conditional Fields based on Request Type */}
          <fieldset className="pt-5 sm:pt-6 border-t border-[#D8D0BE] dark:border-[#2E382E] space-y-3.5 sm:space-y-4">
            <legend className="font-bold-display text-sm sm:text-base font-bold mb-1 text-[#1F2720] dark:text-[#F4F1E8]">
              2. {t.quotation.requestTypes[formData.requestType].title} —{' '}
              {t.quotation.step2LegendSuffix}
            </legend>

            {formData.requestType === 'Standard' && (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="min-w-0">
                  <label htmlFor="quote-packagingPreference" className={labelClass}>
                    {t.quotation.packagingLabel}
                  </label>
                  <select
                    id="quote-packagingPreference"
                    value={formData.packagingPreference}
                    onChange={(e) =>
                      updateField('packagingPreference', e.target.value)
                    }
                    className={inputClass()}
                  >
                    {t.quotation.packagingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0">
                  <label htmlFor="quote-standardQuantity" className={labelClass}>
                    {t.quotation.standardQtyLabel}
                  </label>
                  <input
                    id="quote-standardQuantity"
                    type="text"
                    value={formData.standardQuantity}
                    onChange={(e) =>
                      updateField('standardQuantity', e.target.value)
                    }
                    placeholder={t.quotation.standardQtyPlaceholder}
                    className={inputClass()}
                  />
                </div>
              </div>
            )}

            {formData.requestType === 'Bulk' && (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="min-w-0">
                  <label htmlFor="quote-bulkVolume" className={labelClass}>
                    {t.quotation.bulkVolumeLabel}
                  </label>
                  <input
                    id="quote-bulkVolume"
                    type="text"
                    required
                    value={formData.bulkVolume}
                    onChange={(e) => updateField('bulkVolume', e.target.value)}
                    placeholder={t.quotation.bulkVolumePlaceholder}
                    aria-invalid={Boolean(errors.bulkVolume)}
                    aria-describedby={
                      errors.bulkVolume ? 'quote-bulkVolume-error' : undefined
                    }
                    className={inputClass(Boolean(errors.bulkVolume))}
                  />
                  {errors.bulkVolume && (
                    <p
                      id="quote-bulkVolume-error"
                      role="alert"
                      className={errorTextClass}
                    >
                      {errors.bulkVolume}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="quote-deliveryFrequency" className={labelClass}>
                    {t.quotation.deliveryFreqLabel}
                  </label>
                  <select
                    id="quote-deliveryFrequency"
                    value={formData.deliveryFrequency}
                    onChange={(e) =>
                      updateField('deliveryFrequency', e.target.value)
                    }
                    className={inputClass()}
                  >
                    {t.quotation.deliveryFreqOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="quote-siteAccessNotes" className={labelClass}>
                    {t.quotation.siteAccessLabel}
                  </label>
                  <input
                    id="quote-siteAccessNotes"
                    type="text"
                    value={formData.siteAccessNotes}
                    onChange={(e) =>
                      updateField('siteAccessNotes', e.target.value)
                    }
                    placeholder={t.quotation.siteAccessPlaceholder}
                    className={inputClass()}
                  />
                </div>
              </div>
            )}

            {formData.requestType === 'Customized' && (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="col-span-2">
                  <label htmlFor="quote-customSpecification" className={labelClass}>
                    {t.quotation.customSpecLabel}
                  </label>
                  <textarea
                    id="quote-customSpecification"
                    rows={3}
                    required
                    value={formData.customSpecification}
                    onChange={(e) =>
                      updateField('customSpecification', e.target.value)
                    }
                    placeholder={t.quotation.customSpecPlaceholder}
                    aria-invalid={Boolean(errors.customSpecification)}
                    aria-describedby={
                      errors.customSpecification
                        ? 'quote-customSpecification-error'
                        : undefined
                    }
                    className={inputClass(Boolean(errors.customSpecification))}
                  />
                  {errors.customSpecification && (
                    <p
                      id="quote-customSpecification-error"
                      role="alert"
                      className={errorTextClass}
                    >
                      {errors.customSpecification}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="quote-targetCropOrSoil" className={labelClass}>
                    {t.quotation.targetCropLabel}
                  </label>
                  <input
                    id="quote-targetCropOrSoil"
                    type="text"
                    value={formData.targetCropOrSoil}
                    onChange={(e) =>
                      updateField('targetCropOrSoil', e.target.value)
                    }
                    placeholder={t.quotation.targetCropPlaceholder}
                    className={inputClass()}
                  />
                </div>

                <div className="min-w-0">
                  <label htmlFor="quote-documentationNeeds" className={labelClass}>
                    {t.quotation.docNeedsLabel}
                  </label>
                  <input
                    id="quote-documentationNeeds"
                    type="text"
                    value={formData.documentationNeeds}
                    onChange={(e) =>
                      updateField('documentationNeeds', e.target.value)
                    }
                    placeholder={t.quotation.docNeedsPlaceholder}
                    className={inputClass()}
                  />
                </div>
              </div>
            )}
          </fieldset>

          {/* 3. Shared Contact & Project Information */}
          <fieldset className="pt-5 sm:pt-6 border-t border-[#D8D0BE] dark:border-[#2E382E] space-y-3.5 sm:space-y-4">
            <legend className="font-bold-display text-sm sm:text-base font-bold mb-1 text-[#1F2720] dark:text-[#F4F1E8]">
              {t.quotation.step3Legend}
            </legend>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="min-w-0">
                <label htmlFor="quote-fullName" className={labelClass}>
                  {t.quotation.fullNameLabel}
                </label>
                <input
                  id="quote-fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder={t.quotation.fullNamePlaceholder}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? 'quote-fullName-error' : undefined
                  }
                  className={inputClass(Boolean(errors.fullName))}
                />
                {errors.fullName && (
                  <p
                    id="quote-fullName-error"
                    role="alert"
                    className={errorTextClass}
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="quote-organization" className={labelClass}>
                  {t.quotation.orgLabel}
                </label>
                <input
                  id="quote-organization"
                  type="text"
                  autoComplete="organization"
                  value={formData.organization}
                  onChange={(e) => updateField('organization', e.target.value)}
                  placeholder={t.quotation.orgPlaceholder}
                  className={inputClass()}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="quote-email" className={labelClass}>
                  {t.quotation.emailLabel}
                </label>
                <input
                  id="quote-email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder={t.quotation.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'quote-email-error' : undefined
                  }
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p
                    id="quote-email-error"
                    role="alert"
                    className={errorTextClass}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="quote-phone" className={labelClass}>
                  {t.quotation.phoneLabel}
                </label>
                <div
                  dir="ltr"
                  className={`flex items-stretch w-full min-h-[40px] sm:min-h-[44px] rounded-[7px] overflow-hidden border transition-colors focus-within:outline-2 focus-within:outline-offset-1 ${
                    errors.phone
                      ? 'bg-white border-[#B43C3C] focus-within:outline-[#B43C3C] dark:bg-[#141B15] dark:border-[#D6A063] dark:focus-within:outline-[#D6A063]'
                      : 'bg-white border-[#CFC6B2] focus-within:outline-[#286631] dark:bg-[#141B15] dark:border-[#3D463C] dark:focus-within:outline-[#7AB34C]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center px-2.5 sm:px-3 text-xs sm:text-sm font-bold select-none border-r border-[#D8D0BE] bg-[#EFECE3] text-[#286631] dark:border-[#344034] dark:bg-[#1F2A20] dark:text-[#7AB34C]"
                  >
                    +2
                  </span>
                  <input
                    id="quote-phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel-national"
                    required
                    value={stripEgyptPrefixForInput(formData.phone)}
                    onChange={(e) => updateField('phone', withEgyptCountryCode(e.target.value))}
                    placeholder={t.quotation.phonePlaceholder}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? 'quote-phone-error' : undefined
                    }
                    className="w-full min-w-0 px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm placeholder:text-[10px] sm:placeholder:text-xs md:placeholder:text-sm bg-transparent text-[#1F2720] placeholder:text-[#6C746B] dark:text-[#F4F1E8] dark:placeholder:text-[#8E968C] focus:outline-none"
                  />
                </div>
                {errors.phone && (
                  <p
                    id="quote-phone-error"
                    role="alert"
                    className={errorTextClass}
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="quote-location" className={labelClass}>
                  {t.quotation.locationLabel}
                </label>
                <input
                  id="quote-location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder={t.quotation.locationPlaceholder}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={
                    errors.location ? 'quote-location-error' : undefined
                  }
                  className={inputClass(Boolean(errors.location))}
                />
                {errors.location && (
                  <p
                    id="quote-location-error"
                    role="alert"
                    className={errorTextClass}
                  >
                    {errors.location}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="quote-deliveryTimeline" className={labelClass}>
                  {t.quotation.timelineLabel}
                </label>
                <input
                  id="quote-deliveryTimeline"
                  type="text"
                  value={formData.deliveryTimeline}
                  onChange={(e) =>
                    updateField('deliveryTimeline', e.target.value)
                  }
                  placeholder={t.quotation.timelinePlaceholder}
                  className={inputClass()}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="quote-notes" className={labelClass}>
                  {t.quotation.notesLabel}
                </label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder={t.quotation.notesPlaceholder}
                  className={inputClass()}
                />
              </div>
            </div>
          </fieldset>

          {/* Submit Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
            <p className="text-[11px] sm:text-xs leading-relaxed max-w-md text-[#525B51] dark:text-[#A6A092]">
              {t.quotation.submitFootnote}
            </p>
            <button
              type="submit"
              disabled={status.kind === 'submitting'}
              className="inline-flex items-center justify-center gap-2 min-h-[42px] sm:min-h-[46px] px-6 sm:px-8 rounded-[8px] text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-[#286631] hover:bg-[#1F5127] text-[#F4F1E8] dark:bg-[#7AB34C] dark:hover:bg-[#8AC25C] dark:text-[#121813] hover:shadow-[0_0_24px_rgba(122,179,76,0.28)]"
            >
              {status.kind === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{t.quotation.submittingBtn}</span>
                </>
              ) : (
                <span>{t.quotation.submitBtn}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
