import React, { useEffect, useRef, useState } from 'react';
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  WHATSAPP_DISPLAY,
  buildDirectWhatsAppUrl,
  prepareLeadSubmission,
} from '../services/leadService';
import { REQUEST_TYPES, validateContactField } from '../utils/validation';

export function Contact({ contactRef, prefilledOrder }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [requestType, setRequestType] = useState('استفسار عام');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [deliveryData, setDeliveryData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [calcAttached, setCalcAttached] = useState(false);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const companyRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (prefilledOrder?.text) {
      setRequestType('طلب كومبوست');
      setDetails(prefilledOrder.text);
      setCalcAttached(true);
      setDeliveryData(null);
      setErrors((prev) => ({ ...prev, details: undefined }));
    }
  }, [prefilledOrder]);

  const handleFieldBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateContactField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err || undefined }));
  };

  const handleFieldChange = (field, value, setter) => {
    setter(value);
    if (deliveryData) setDeliveryData(null);
    if (touched[field] || errors[field]) {
      const err = validateContactField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err || undefined }));
    }
  };

  const focusFirstInvalid = (errs) => {
    const order = [
      ['name', nameRef],
      ['phone', phoneRef],
      ['company', companyRef],
      ['details', detailsRef],
    ];
    const first = order.find(([key]) => Boolean(errs[key]));
    first?.[1]?.current?.focus();
  };

  const validateAndPrepare = () => {
    setTouched({ name: true, phone: true, company: true, details: true });
    const result = prepareLeadSubmission({
      name,
      phone,
      company,
      requestType,
      details,
    });
    if (!result.success) {
      setErrors(result.errors);
      setDeliveryData(null);
      focusFirstInvalid(result.errors);
      return null;
    }
    setErrors({});
    setDeliveryData(result.data);
    setCopied(false);
    return result.data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = validateAndPrepare();
    if (!data) return;
    window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    if (!deliveryData) return;
    try {
      await navigator.clipboard.writeText(deliveryData.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="contact-sec" ref={contactRef}>
      <div className="wrap contact">
        <div className="rv">
          <div className="sec-head">
            <h2>عندك مخلفات أو محتاج كومبوست؟</h2>
            <p>أرسل طلبك وسيتواصل معك فريق الشركة لدراسته وتحديد أنسب عرض سعر.</p>
          </div>

          <div className="contact-channels">
            <a
              className="contact-channel"
              href={buildDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-channel-label">واتساب المبيعات والتوريد</span>
              <strong dir="ltr" className="num">
                {WHATSAPP_DISPLAY}
              </strong>
            </a>

            <a className="contact-channel" href={`mailto:${CONTACT_EMAIL}`}>
              <span className="contact-channel-label">البريد الإلكتروني</span>
              <strong>{CONTACT_EMAIL}</strong>
            </a>

            <a
              className="contact-channel"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-channel-label">تابعنا على فيسبوك</span>
              <strong>صفحتنا الرسمية على فيسبوك</strong>
            </a>
          </div>
        </div>

        <form className="fc rv" style={{ '--d': '.15s' }} id="reqForm" onSubmit={handleSubmit} noValidate>
          {calcAttached && (
            <div className="calc-attached-banner" role="status">
              <span>تم إرفاق تقدير حاسبة المزرعة تلقائيًا في تفاصيل الطلب.</span>
            </div>
          )}

          <div className="row2">
            <div>
              <label htmlFor="n">الاسم *</label>
              <input
                ref={nameRef}
                id="n"
                autoComplete="name"
                maxLength={120}
                value={name}
                onChange={(e) => handleFieldChange('name', e.target.value, setName)}
                onBlur={(e) => handleFieldBlur('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'err-name' : undefined}
                required
              />
              {errors.name && (
                <p id="err-name" className="calc-err" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="p">رقم الهاتف *</label>
              <input
                ref={phoneRef}
                id="p"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                maxLength={20}
                placeholder="01xxxxxxxxx"
                value={phone}
                onChange={(e) => handleFieldChange('phone', e.target.value, setPhone)}
                onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                required
              />
              {errors.phone && (
                <p id="err-phone" className="calc-err" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="row2">
            <div>
              <label htmlFor="c">اسم الشركة أو المزرعة (اختياري)</label>
              <input
                ref={companyRef}
                id="c"
                autoComplete="organization"
                maxLength={160}
                value={company}
                onChange={(e) => handleFieldChange('company', e.target.value, setCompany)}
                onBlur={(e) => handleFieldBlur('company', e.target.value)}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? 'err-company' : undefined}
              />
              {errors.company && (
                <p id="err-company" className="calc-err" role="alert">
                  {errors.company}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="t">نوع الطلب</label>
              <select
                id="t"
                value={requestType}
                onChange={(e) => {
                  setRequestType(e.target.value);
                  if (deliveryData) setDeliveryData(null);
                }}
              >
                {REQUEST_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-label-row">
            <label htmlFor="d">تفاصيل الطلب</label>
            <span className="field-meta num" aria-hidden="true">
              {details.length} / 1500
            </span>
          </div>
          <textarea
            ref={detailsRef}
            id="d"
            rows="4"
            maxLength={1500}
            placeholder="الكميات، المواعيد، الموقع، وأي ملاحظات أخرى"
            value={details}
            onChange={(e) => handleFieldChange('details', e.target.value, setDetails)}
            onBlur={(e) => handleFieldBlur('details', e.target.value)}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? 'err-details' : undefined}
          />
          {errors.details && (
            <p id="err-details" className="calc-err" role="alert">
              {errors.details}
            </p>
          )}

          <p className="note">نستخدم بياناتك للتواصل معك بخصوص طلبك فقط.</p>

          <div className="contact-actions">
            <button type="submit" className="btn btn-green">
              إرسال عبر واتساب
            </button>
            <button
              type="button"
              className="btn contact-email-btn"
              onClick={() => {
                const data = validateAndPrepare();
                if (data) window.location.href = data.mailtoUrl;
              }}
            >
              إرسال بالبريد الإلكتروني
            </button>
          </div>

          {deliveryData && (
            <div className="ok" id="ok" role="status">
              <p>تم تجهيز طلبك! اختر وسيلة الإرسال المناسبة لك:</p>
              <div className="ok-actions">
                <a
                  href={deliveryData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ok-link"
                >
                  فتح واتساب
                </a>
                <a href={deliveryData.mailtoUrl} className="ok-link">
                  فتح تطبيق البريد
                </a>
                <button type="button" className="ok-link ok-copy" onClick={handleCopyMessage}>
                  {copied ? 'تم نسخ الطلب ✓' : 'نسخ نص الطلب'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
