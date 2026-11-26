import React from 'react';

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="leaf" viewBox="0 0 24 24">
          <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19l7-7" />
        </symbol>
        <symbol id="truck" viewBox="0 0 24 24">
          <path d="M2 6h11v10H2zM13 9h4l4 3v4h-8" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </symbol>
        <symbol id="rec" viewBox="0 0 24 24">
          <path d="M4 12a8 8 0 0113-6l2 2M20 12a8 8 0 01-13 6l-2-2M19 4v4h-4M5 20v-4h4" />
        </symbol>
        <symbol id="flask" viewBox="0 0 24 24">
          <path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />
        </symbol>
        <symbol id="gear" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </symbol>
        <symbol id="phone" viewBox="0 0 24 24">
          <path d="M5 4h4l2 5-2 1a11 11 0 006 6l1-2 5 2v3a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2" />
        </symbol>
        <symbol id="box" viewBox="0 0 24 24">
          <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />
        </symbol>
        <symbol id="fuel" viewBox="0 0 24 24">
          <path d="M5 21V4h9v17M5 10h9M14 8l4 2v8a1.5 1.5 0 003 0v-6l-3-3" />
        </symbol>
        <symbol id="calc" viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" />
        </symbol>
        <symbol id="doc" viewBox="0 0 24 24">
          <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7" />
        </symbol>
        <symbol id="ck" viewBox="0 0 24 24">
          <path d="M5 12l5 5 9-10" />
        </symbol>
        <symbol id="arr" viewBox="0 0 24 24">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </symbol>
        <symbol id="moon" viewBox="0 0 24 24">
          <path d="M20 14A8 8 0 0110 4a8 8 0 1010 10z" />
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
