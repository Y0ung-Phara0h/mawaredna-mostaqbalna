export function formatAr(n, decimals = 0) {
  return n.toLocaleString('ar-EG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function animateCount(el, values, decimals = 0, suffix = '', duration = 1500) {
  if (!el) return;
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const set = (k) => {
    el.textContent = values.map((a) => formatAr(a * k, decimals)).join('–') + suffix;
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
