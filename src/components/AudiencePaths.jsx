import React from 'react';
import { Icon } from './IconSprite';
import { BrandAssetIcon } from './BrandAssetIcon';

export function AudiencePaths() {
  return (
    <div className="wrap" style={{ paddingTop: 44 }}>
      <div className="paths rv">
        <a className="path" href="#calc">
          <span className="path-icon-box">
            <BrandAssetIcon iconKey="iconFieldRidges" className="path-brand-icon" />
          </span>
          <div>
            <h2>أنا مزارع</h2>
            <p>احسب كمية الكومبوست لمزرعتك واطلبها</p>
          </div>
          <Icon name="arr" className="ar" />
        </a>
        <a className="path" href="#compost">
          <span className="path-icon-box">
            <BrandAssetIcon iconKey="iconCompostBag" className="path-brand-icon" />
          </span>
          <div>
            <h2>أنا مهندس أو شركة</h2>
            <p>ورقة بيانات الكومبوست وخدمات التدوير</p>
          </div>
          <Icon name="arr" className="ar" />
        </a>
      </div>
    </div>
  );
}
