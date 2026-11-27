const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/**
 * Formats numbers using standard English/Western Arabic numerals (0-9).
 */
export function formatNum(n, decimals = 0) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Backwards-compatible alias
export const formatAr = formatNum;

/**
 * Normalizes Eastern Arabic / Persian numerals and decimal separators to ASCII 0-9 / .
 */
export function normalizeDigits(raw) {
  if (raw === null || raw === undefined) return '';
  return String(raw)
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٫,]/g, '.')
    .trim();
}

export function animateCount(el, values, decimals = 0, suffix = '', duration = 1500) {
  if (!el) return;
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const set = (k) => {
    el.textContent = values.map((a) => formatNum(a * k, decimals)).join('–') + suffix;
  };

  if (reduce) {
    set(1);
    return;
  }

  const t0 = performance.now();
  function frame(t) {
    const p = Math.min(1, (t - t0) / duration);
    set(1 - Math.pow(1 - p, 3));
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
