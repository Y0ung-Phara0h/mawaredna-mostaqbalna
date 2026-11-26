import React from 'react';

export const BRAND_ICONS = {
  iconCompostBag: '/icons/icon-compost-bag.webp',
  iconSoilLeaves: '/icons/icon-soil-leaves.webp',
  iconSugarcaneStalk: '/icons/icon-sugarcane-stalk.webp',
  iconSproutBlades: '/icons/icon-sprout-blades.webp',
  iconFieldRidges: '/icons/icon-field-ridges.webp',
  iconWaterDrop: '/icons/icon-water-drop.webp',
};

/**
 * Renders an official designer botanical icon (WebP) with calibrated light/dark visibility.
 */
export function BrandAssetIcon({ iconKey, className = '', onDark = false }) {
  const src = BRAND_ICONS[iconKey];
  if (!src) return null;

  const isTwoTone = iconKey === 'iconSoilLeaves';
  const toneClass = isTwoTone ? 'brand-icon--twotone' : 'brand-icon--mono';
  const darkSurfaceClass = onDark ? 'brand-icon--ondark' : '';

  return (
    <img
      src={src}
      alt=""
      width="48"
      height="48"
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`brand-icon ${toneClass} ${darkSurfaceClass} ${className}`.trim()}
    />
  );
}
