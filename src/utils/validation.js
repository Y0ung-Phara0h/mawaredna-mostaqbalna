import { normalizeDigits } from './format.js';

export const REQUEST_TYPES = [
  'استفسار عام',
  'طلب كمبوست',
  'جمع مخلفات',
  'استشارة زراعية',
];

const HAS_LETTER_RE = /[\p{L}]/u;
const EG_MOBILE_RE = /^(?:(?:\+|00)20)?0?1[0125]\d{8}$/;
const EG_LANDLINE_RE = /^(?:(?:\+|00)20)?0[2-9]\d{7,8}$/;
const INTL_PHONE_RE = /^\+[1-9]\d{7,14}$/;
const REPEATED_DIGITS_RE = /^(\+?20)?0?(\d)\2{7,}$/;

export function cleanPhoneValue(raw) {
  return normalizeDigits(raw ?? '').replace(/[\s().-]/g, '');
}

/**
 * Validates a single contact form field for real-time onBlur / onChange feedback.
 */
export function validateContactField(field, value) {
  switch (field) {
    case 'name': {
      const name = String(value ?? '').trim();
      if (!name) return 'يرجى إدخال الاسم.';
      if (name.length < 2) return 'يرجى إدخال الاسم (حرفان على الأقل).';
      if (name.length > 120) return 'الاسم طويل جدًا (الحد الأقصى 120 حرفًا).';
      if (!HAS_LETTER_RE.test(name)) return 'يرجى إدخال اسم صحيح يحتوي على حروف.';
      return '';
    }
    case 'phone': {
      const phone = cleanPhoneValue(value);
      if (!phone) return 'يرجى إدخال رقم الهاتف للتواصل.';
      const validFormat =
        EG_MOBILE_RE.test(phone) || EG_LANDLINE_RE.test(phone) || INTL_PHONE_RE.test(phone);
      if (!validFormat || REPEATED_DIGITS_RE.test(phone)) {
        return 'يرجى إدخال رقم هاتف مصري أو دولي صحيح (مثال: 010xxxxxxxx أو +2010xxxxxxxx).';
      }
      return '';
    }
    case 'company': {
      const company = String(value ?? '').trim();
      if (company && company.length < 2) return 'اسم الشركة أو المزرعة قصير جدًا.';
      if (company.length > 160) return 'اسم الشركة أو المزرعة طويل جدًا (الحد الأقصى 160 حرفًا).';
      return '';
    }
    case 'details': {
      const details = String(value ?? '').trim();
      if (details && details.length < 5) {
        return 'يرجى كتابة تفاصيل أوضح للطلب (5 أحرف على الأقل) أو تركه فارغًا.';
      }
      if (details.length > 1500) return 'تفاصيل الطلب تتجاوز الحد المسموح (1500 حرف).';
      return '';
    }
    default:
      return '';
  }
}

/**
 * Validates all contact/quotation inquiry fields before WhatsApp or Email handoff.
 */
export function validateContactLead(input) {
  const errors = {};

  const nameErr = validateContactField('name', input.name);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validateContactField('phone', input.phone);
  if (phoneErr) errors.phone = phoneErr;

  const companyErr = validateContactField('company', input.company);
  if (companyErr) errors.company = companyErr;

  const detailsErr = validateContactField('details', input.details);
  if (detailsErr) errors.details = detailsErr;

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    cleaned: {
      name: String(input.name ?? '').trim(),
      phone: cleanPhoneValue(input.phone),
      company: String(input.company ?? '').trim(),
      requestType: REQUEST_TYPES.includes(input.requestType)
        ? input.requestType
        : REQUEST_TYPES[0],
      details: String(input.details ?? '').trim(),
    },
  };
}
