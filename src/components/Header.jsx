import React, { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../data/siteData';
import { Icon } from './IconSprite';

export function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.dataset.theme = saved;
    }

    let rafId = 0;
    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);

    const updateMetrics = () => {
      maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        setScrolled((prev) => {
          const next = y > 10;
          return prev === next ? prev : next;
        });
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.min(1, y / maxScroll)})`;
        }
      });
    };

    const onClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });
    document.addEventListener('click', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    onScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateMetrics);
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark =
      root.dataset.theme === 'dark' ||
      (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  };

  return (
    <header ref={headerRef} className={scrolled ? 'sc' : ''}>
      <div className="wrap nav">
        <a href="#top" className="brand" aria-label="مواردنا مستقبلنا — الصفحة الرئيسية">
          <img
            className="lg logo-light"
            src="/brand/icon-logo.svg"
            alt=""
            width="38"
            height="38"
            decoding="async"
          />
          <img
            className="lg logo-dark"
            src="/brand/icon-logo-white.svg"
            alt=""
            width="38"
            height="38"
            loading="lazy"
            decoding="async"
          />
          <span>
            مواردنا مستقبلنا
            <small>من مخلفاتنا نصنع مستقبلًا</small>
          </span>
        </a>

        <nav
          className={`links${menuOpen ? ' open' : ''}`}
          id="links"
          aria-label="التنقل الرئيسي"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={isActive ? 'on' : ''}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="tools">
          <button
            type="button"
            className="icon-btn"
            id="theme"
            aria-label="تبديل الوضع الليلي"
            onClick={toggleTheme}
          >
            <Icon name="moon" />
          </button>
          <a href="#contact" className="btn btn-green">
            اطلب خدمة
          </a>
          <button
            type="button"
            className="icon-btn burger"
            id="burger"
            aria-label="القائمة"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <div className="pb" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
