import type { CalculatorTransferPayload } from './calculator';

export type QuotationRequestType = 'Standard' | 'Bulk' | 'Customized';

export const QUOTATION_REQUEST_TYPES: readonly QuotationRequestType[] = [
  'Standard',
  'Bulk',
  'Customized',
] as const;

export interface QuotationFormData {
  requestType: QuotationRequestType;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  deliveryTimeline: string;
  notes: string;
  // Conditional: Standard
  packagingPreference: string;
  standardQuantity: string;
  // Conditional: Bulk
  bulkVolume: string;
  deliveryFrequency: string;
  siteAccessNotes: string;
  // Conditional: Customized
  customSpecification: string;
  targetCropOrSoil: string;
  documentationNeeds: string;
}

export type QuotationFieldErrors = Partial<Record<keyof QuotationFormData, string>>;

export interface QuotationSubmissionPayload {
  submittedAt: string;
  form: QuotationFormData;
  calculatorSummary: CalculatorTransferPayload | null;
}

export type QuotationSubmitResult =
  | { ok: true; referenceId?: string; message: string }
  | { ok: false; reason: 'unconfigured' | 'network' | 'rejected'; message: string };

export function createInitialQuotationForm(
  calculatorSummary?: CalculatorTransferPayload | null,
  unitLabels?: { tonsUnit: string; cubicUnit: string }
): QuotationFormData {
  const tonsLabel = unitLabels?.tonsUnit ?? 'metric tons';
  const cubicLabel = unitLabels?.cubicUnit ?? 'm³';
  const prefilledQuantity =
    calculatorSummary &&
    calculatorSummary.estimatedMinTons !== null &&
    calculatorSummary.estimatedMaxTons !== null
      ? `${calculatorSummary.estimatedMinTons}–${calculatorSummary.estimatedMaxTons} ${tonsLabel} (${calculatorSummary.estimatedMinCubicMeters ?? 0}–${calculatorSummary.estimatedMaxCubicMeters ?? 0} ${cubicLabel})`
      : '';

  const prefilledCropSoil =
    calculatorSummary && calculatorSummary.cropLabel && calculatorSummary.soilLabel
      ? `${calculatorSummary.cropLabel} — ${calculatorSummary.soilLabel}`
      : '';

  return {
    requestType: 'Standard',
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    location: '',
    deliveryTimeline: '',
    notes: '',
    packagingPreference: 'To be advised',
    standardQuantity: prefilledQuantity,
    bulkVolume: prefilledQuantity,
    deliveryFrequency: 'One-time delivery',
    siteAccessNotes: '',
    customSpecification: '',
    targetCropOrSoil: prefilledCropSoil,
    documentationNeeds: '',
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s\-()]{6,20}$/;

export function validateQuotationForm(data: QuotationFormData): QuotationFieldErrors {
  const errors: QuotationFieldErrors = {};

  if (!QUOTATION_REQUEST_TYPES.includes(data.requestType)) {
    errors.requestType = 'Please select a valid quotation request type.';
  }

  if (data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.';
  }

  if (data.location.trim().length < 2) {
    errors.location = 'Please specify your delivery governorate or project location.';
  }

  if (data.requestType === 'Bulk' && data.bulkVolume.trim().length === 0) {
    errors.bulkVolume = 'Please indicate your estimated bulk quantity (tons or m³).';
  }

  if (data.requestType === 'Customized' && data.customSpecification.trim().length < 5) {
    errors.customSpecification =
      'Please describe your customized requirement or application details.';
  }

  return errors;
}

export async function submitQuotationRequest(
  payload: QuotationSubmissionPayload,
  endpoint: string,
  fetchImpl: typeof fetch = fetch
): Promise<QuotationSubmitResult> {
  const trimmedEndpoint = endpoint.trim();
  if (!trimmedEndpoint) {
    return {
      ok: false,
      reason: 'unconfigured',
      message:
        'The quotation submission endpoint (VITE_QUOTATION_ENDPOINT) is not configured yet. Your entered details have been preserved—please configure the Google Apps Script endpoint or contact our team directly.',
    };
  }

  try {
    const response = await fetchImpl(trimmedEndpoint, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        reason: 'rejected',
        message: `Submission could not be confirmed (HTTP ${response.status}). Your details are preserved—please try again or contact us directly.`,
      };
    }

    let body: Record<string, unknown> | null = null;
    try {
      body = (await response.json()) as Record<string, unknown>;
    } catch {
      body = null;
    }

    const isConfirmed =
      body !== null &&
      (body.ok === true ||
        body.success === true ||
        (typeof body.status === 'string' && body.status.toLowerCase() === 'success'));

    if (!isConfirmed) {
      return {
        ok: false,
        reason: 'rejected',
        message:
          'The server did not confirm successful processing of your request. Your details are preserved—please retry or contact our team directly.',
      };
    }

    const referenceId =
      typeof body?.referenceId === 'string'
        ? body.referenceId
        : typeof body?.id === 'string'
          ? body.id
          : undefined;

    return {
      ok: true,
      referenceId,
      message:
        'Your quotation request has been received and confirmed. Our commercial team will review your requirements and respond shortly.',
    };
  } catch {
    return {
      ok: false,
      reason: 'network',
      message:
        'A network error prevented submitting your request. All your entered details have been preserved—please check your connection and try again.',
    };
  }
}
