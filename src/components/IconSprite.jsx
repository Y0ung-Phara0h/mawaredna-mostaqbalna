import React from 'react';

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="calc" viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" />
        </symbol>
        <symbol id="arr" viewBox="0 0 24 24">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </symbol>
        <symbol id="moon" viewBox="0 0 24 24">
          <path d="M20 14A8 8 0 0110 4a8 8 0 1010 10z" />
        </symbol>
        <symbol id="sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </symbol>
        <symbol id="menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Icon({ name, className = '' }) {
  return (
    <svg className={`i ${className}`.trim()} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
