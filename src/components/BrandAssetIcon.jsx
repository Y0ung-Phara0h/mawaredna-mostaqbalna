import React from 'react';

/**
 * Renders an official designer botanical icon via inlined WebP CSS classes (0 extra HTTP requests).
 */
export function BrandAssetIcon({ iconKey, className = '', onDark = false }) {
  if (!iconKey) return null;

  const isTwoTone = iconKey === 'iconSoilLeaves';
  const toneClass = isTwoTone ? 'brand-icon--twotone' : 'brand-icon--mono';
  const darkSurfaceClass = onDark ? 'brand-icon--ondark' : '';

  return (
    <span
      aria-hidden="true"
      className={`brand-icon brand-icon--${iconKey} ${toneClass} ${darkSurfaceClass} ${className}`.trim()}
    />
  );
}
