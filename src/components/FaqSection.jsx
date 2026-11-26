import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/siteData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>الأسئلة الشائعة حول الكومبوست</h2>
          <p>
            إجابات سريعة على أكثر الأسئلة التي يطرحها المزارعون والمهندسون حول الكومبوست النقي
            ومعدلات استخدامه وتوريده.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className={`faq-item rv${isOpen ? ' open' : ''}`} style={{ '--d': `${idx * 0.06}s` }} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-ico" aria-hidden="true">+</span>
                </button>
                <div
                  className="faq-a"
                  id={`faq-panel-${idx}`}
                  role="region"
                  hidden={!isOpen}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
