import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/siteData';
import { BrandAssetIcon } from './BrandAssetIcon';

export function Services() {
  const [activeTab, setActiveTab] = useState('a');
  const items = SERVICES_DATA[activeTab];

  return (
    <section id="services" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <h2>خدمات تغطي الرحلة كاملة</h2>
          <p>من الحصاد حتى وصول الكمبوست إلى مزرعتك.</p>
        </div>

        <div className="tabs rv" role="tablist" aria-label="تصنيف الخدمات">
          <button
            type="button"
            id="tab-a"
            className="tab"
            role="tab"
            aria-selected={activeTab === 'a'}
            aria-controls="svc"
            onClick={() => setActiveTab('a')}
          >
            مجالات العمل
          </button>
          <button
            type="button"
            id="tab-b"
            className="tab"
            role="tab"
            aria-selected={activeTab === 'b'}
            aria-controls="svc"
            onClick={() => setActiveTab('b')}
          >
            خدمات المزارع والشركات
          </button>
        </div>

        <div
          className="svc"
          id="svc"
          role="tabpanel"
          aria-labelledby={activeTab === 'a' ? 'tab-a' : 'tab-b'}
          key={activeTab}
        >
          {items.map((item, i) => (
            <div className="row" style={{ '--i': i }} key={item.title}>
              <span className="svc-icon-box">
                <BrandAssetIcon iconKey={item.brandIcon} className="svc-brand-icon" />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
