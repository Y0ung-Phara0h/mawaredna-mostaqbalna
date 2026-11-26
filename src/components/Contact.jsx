import React, { useEffect, useState } from 'react';

export function Contact({ contactRef, prefilledDetails }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [requestType, setRequestType] = useState('استفسار عام');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledDetails) {
      setRequestType('طلب كومبوست');
      setDetails(prefilledDetails);
    }
  }, [prefilledDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(`طلب: ${requestType}`);
    const body = encodeURIComponent(
      `الاسم: ${name}\nالهاتف: ${phone}\nالجهة: ${company}\nنوع الطلب: ${requestType}\n\n${details}`
    );
    window.location.href = `mailto:mawrednamostaqpalona@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" style={{ paddingTop: 0 }} ref={contactRef}>
      <div className="wrap contact">
        <div className="rv">
          <div className="sec-head">
            <h2>عندك مخلفات أو محتاج كومبوست؟</h2>
            <p>أرسل طلبك وسيتواصل معك فريق الشركة لدراسته وتحديد أنسب عرض سعر.</p>
          </div>
          <p>
            <a
              href="mailto:mawrednamostaqpalona@gmail.com"
              style={{ color: 'var(--green)', fontWeight: 600 }}
            >
              mawrednamostaqpalona@gmail.com
            </a>
          </p>
          <p>
            <a
              href="https://www.facebook.com/share/19b9S23gdk/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--green)', fontWeight: 600 }}
            >
              صفحتنا على فيسبوك
            </a>
          </p>
        </div>

        <form
          className="fc rv"
          style={{ '--d': '.15s', border: '1px solid var(--line)' }}
          id="reqForm"
          onSubmit={handleSubmit}
        >
          <div className="row2">
            <div>
              <label htmlFor="n">الاسم *</label>
              <input
                id="n"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="p">رقم الهاتف *</label>
              <input
                id="p"
                type="tel"
                placeholder="01xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row2">
            <div>
              <label htmlFor="c">اسم الشركة أو المزرعة (اختياري)</label>
              <input
                id="c"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="t">نوع الطلب</label>
              <select
                id="t"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
              >
                <option value="استفسار عام">استفسار عام</option>
                <option value="طلب كومبوست">طلب كومبوست</option>
                <option value="جمع مخلفات">جمع مخلفات</option>
                <option value="استشارة زراعية">استشارة زراعية</option>
              </select>
            </div>
          </div>

          <label htmlFor="d">تفاصيل الطلب</label>
          <textarea
            id="d"
            rows="4"
            placeholder="الكميات، المواعيد، الموقع، وأي ملاحظات أخرى"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <p className="note">نستخدم بياناتك للتواصل معك بخصوص طلبك فقط.</p>
          <button type="submit" className="btn btn-green" style={{ marginTop: 14 }}>
            إرسال الطلب
          </button>

          {submitted && (
            <div className="ok" id="ok" role="status">
              جاهز. افتح تطبيق البريد لإكمال الإرسال.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
