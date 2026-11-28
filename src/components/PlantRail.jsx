import React, { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../data/siteData';

const LINKS = NAV_LINKS.filter((l) => l.href !== '#contact');
const SEGS = 22;
const ALL = [...LINKS, { href: '#contact', label: 'تواصل معنا' }];

function interp(x, xs, ys) {
  if (x <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i += 1) {
    if (x <= xs[i]) {
      const span = xs[i] - xs[i - 1] || 1;
      return ys[i - 1] + ((x - xs[i - 1]) / span) * (ys[i] - ys[i - 1]);
    }
  }
  return ys[ys.length - 1];
}

// A growing stalk on the page edge: grows with your scroll, sprouting a leaf at every section.
export function PlantRail() {
  const [active, setActive] = useState(-1);
  const [lit, setLit] = useState(0);
  const railRef = useRef(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    let raf = 0;
    let last = -2;
    let lastLit = -1;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const anchor = window.scrollY + vh * 0.45;
      const n = ALL.length;
      const maxAnchor = Math.max(1, docH - vh * 0.55);
      const atBottom = window.scrollY + vh >= docH - 3;
      // clamp section tops so every node (incl. the last) is reachable before the page ends
      const tops = ALL.map(({ href }, i) => {
        const el = document.querySelector(href);
        if (!el) return null;
        const t = el.getBoundingClientRect().top + window.scrollY;
        return Math.min(t, maxAnchor - (n - i) * 6);
      });
      const xs = [0];
      const ps = [0];
      tops.forEach((t, i) => {
        if (t == null || t <= xs[xs.length - 1]) return;
        xs.push(t);
        ps.push((i + 1) / (n + 1));
      });
      xs.push(maxAnchor);
      ps.push(1);
      const p = atBottom ? 1 : Math.min(1, Math.max(0, interp(anchor, xs, ps)));
      rail.style.setProperty('--p', p.toFixed(4));

      const litCount = Math.round(p * SEGS);
      if (litCount !== lastLit) {
        lastLit = litCount;
        setLit(litCount);
      }

      let idx = -1;
      tops.forEach((t, i) => {
        if (t != null && (atBottom || t <= anchor)) idx = i;
      });
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <aside className="plant" ref={railRef} aria-label="مؤشر التنقل بين الأقسام">
      <div className="plant-stem" aria-hidden="true">
        {Array.from({ length: SEGS }, (_, k) => (
          <i key={k} className={`pseg${k < lit ? ' on' : ''}`} />
        ))}
      </div>

      <div className="plant-bud" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="34" height="34">
          <path d="M20 38V20" stroke="#4f8f3a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path className="bud-l" d="M20 22C12 22 6 17 5 9c8 0 14 5 15 13z" fill="#7ab34c" />
          <path className="bud-r" d="M20 18C20 10 26 4 35 3c0 8-6 14-15 15z" fill="#9ccc6f" />
        </svg>
      </div>

      {ALL.map((link, i) => {
        const isLit = i <= active;
        const side = i % 2 === 0 ? 'l' : 'r';
        return (
          <a
            key={link.href}
            href={link.href}
            className={`plant-node ${side}${isLit ? ' lit' : ''}${i === active ? ' now' : ''}`}
            style={{ top: `${((i + 1) / (ALL.length + 1)) * 100}%` }}
            aria-label={link.label}
            aria-current={i === active ? 'location' : undefined}
          >
            <span className="plant-dot" />
            <svg className="plant-leaf" viewBox="0 0 36 22" aria-hidden="true">
              <path d="M0 11C8 -2 26 -2 36 8 30 20 12 24 0 11z" />
              <path d="M2 11C14 9 24 9 33 8" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" />
            </svg>
            <span className="plant-label">{link.label}</span>
          </a>
        );
      })}
    </aside>
  );
}
