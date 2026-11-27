import { validateContactLead } from '../utils/validation';

export const WHATSAPP_NUMBER = '201111342238';
export const WHATSAPP_DISPLAY = '+20 111 134 2238';
export const CONTACT_EMAIL = 'mawrednamostaqpalona@gmail.com';
export const FACEBOOK_URL = 'https://www.facebook.com/share/19b9S23gdk/';

export function formatLeadMessage(lead) {
  const lines = [
    `طلب جديد من موقع مواردنا مستقبلنا`,
    `نوع الطلب: ${lead.requestType}`,
    `الاسم: ${lead.name}`,
    `الهاتف: ${lead.phone}`,
  ];
  if (lead.company) {
    lines.push(`الشركة / المزرعة: ${lead.company}`);
  }
  if (lead.details) {
    lines.push('', 'التفاصيل:', lead.details);
  }
  return lines.join('\n');
}

export function buildWhatsAppUrl(lead) {
  const text = formatLeadMessage(lead);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildDirectWhatsAppUrl(presetText = 'مرحبًا، أود الاستفسار عن كمبوست مواردنا مستقبلنا.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(presetText)}`;
}

export function buildMailtoUrl(lead) {
  const subject = encodeURIComponent(`طلب: ${lead.requestType}`);
  const body = encodeURIComponent(formatLeadMessage(lead));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Validates and prepares client-side delivery channels (WhatsApp, Email, Copy).
 * Standardized response contract: { success, data?, errors? }.
 */
export function prepareLeadSubmission(input) {
  const result = validateContactLead(input);
  if (!result.valid) {
    return { success: false, errors: result.errors };
  }

  const lead = result.cleaned;
  return {
    success: true,
    data: {
      lead,
      message: formatLeadMessage(lead),
      whatsappUrl: buildWhatsAppUrl(lead),
      mailtoUrl: buildMailtoUrl(lead),
    },
  };
}
