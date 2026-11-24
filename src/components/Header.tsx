import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { AppLink, useApp } from '../context/AppContext';
import { computeHeaderScrollState, type HeaderScrollMode } from '../lib/headerScroll';
import { BrandLogo } from './BrandLogo';

export function Header() {
  const { route, t, theme, setTheme, lang, setLang } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [scrollMode, setScrollMode] = useState<HeaderScrollMode>('top');
  const lastScrollYRef = useRef(0);
  const mobileOpenRef = useRef(false);
  const prefsOpenRef = useRef(false);
  const prefsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
    if (mobileOpen && window.scrollY > 28) {
      setScrollMode('floating');
    }
  }, [mobileOpen]);

  // Lock page scrolling on mobile & tablet whenever the navigation drawer is open
  useEffect(() => {
    if (!mobileOpen) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen]);

  useEffect(() => {
    prefsOpenRef.current = prefsOpen;
  }, [prefsOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setPrefsOpen(false);
    setScrollMode(window.scrollY <= 28 ? 'top' : 'floating');
  }, [route]);

  useEffect(() => {
    let ticking = false;
    lastScrollYRef.current = window.scrollY;

    const updateOnScroll = () => {
      const currentY = window.scrollY;
      const prevY = lastScrollYRef.current;
      lastScrollYRef.current = currentY;
      setScrollMode((prev) => {
        const next = computeHeaderScrollState({
          scrollY: currentY,
          lastScrollY: prevY,
          previousMode: prev,
          mobileMenuOpen: mobileOpenRef.current || prefsOpenRef.current,
        });
        return next;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !prefsOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setPrefsOpen(false);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (
        prefsOpen &&
        prefsContainerRef.current &&
        !prefsContainerRef.current.contains(e.target as Node)
      ) {
        setPrefsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mobileOpen, prefsOpen]);

  const isFloating = scrollMode === 'floating';
  const isHidden = scrollMode === 'hidden';

  return (
    <>
      {/* Backdrop scrim behind open mobile/tablet drawer to block background interaction */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Fixed header shell with smooth top-docked / hidden / centered-floating transitions */}
      <div
        data-header-state={scrollMode}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHidden
            ? '-translate-y-[125%] opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        } ${isFloating ? 'pt-3 px-3 sm:px-6' : 'pt-0 px-0'}`}
      >
        <header
          data-header-state={scrollMode}
          className={`mx-auto w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-xl ${
            isFloating
              ? 'max-w-[1160px] h-13 sm:h-14 md:h-16 rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-2xl border shadow-[0_16px_42px_rgba(18,24,19,0.18)] dark:shadow-[0_18px_48px_rgba(0,0,0,0.48)] bg-[#F6F3EC]/92 border-[#3D463C]/18 dark:bg-[#18211A]/90 dark:border-[#7AB34C]/28'
              : 'max-w-none h-14 sm:h-16 md:h-[76px] rounded-none border-b bg-[#F6F3EC]/94 border-[#D7D1C2] dark:bg-[#121813]/92 dark:border-[#3D463C]/70'
          }`}
        >
          <div
            className={`h-full mx-auto flex items-center justify-between gap-2 sm:gap-5 transition-all duration-300 ${
              isFloating ? 'px-3.5 sm:px-6' : 'max-w-[1280px] px-4 sm:px-6 lg:px-8'
            }`}
          >
            {/* Start side: Official Designer Brand Logo */}
            <AppLink
              to="/"
              aria-label={t.brand.homeAria}
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C] rounded-md shrink-0"
            >
              <BrandLogo compact={isFloating} />
            </AppLink>

            {/* End side: Navigation links grouped directly next to Get in Touch CTA & unified Preferences dropdown */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 xl:gap-6 shrink-0">
              <nav
                aria-label={t.nav.primaryAria}
                className="hidden lg:flex items-center gap-5 xl:gap-6"
              >
                {t.nav.items.map((item) => {
                  const active = route === item.path;
                  return (
                    <AppLink
                      key={item.path}
                      to={item.path}
                      aria-current={active ? 'page' : undefined}
                      className={`relative py-1 text-sm whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C] rounded-sm ${
                        active
                          ? 'font-bold text-[#286631] dark:text-[#7AB34C]'
                          : 'font-medium text-[#3D463C] hover:text-[#286631] dark:text-[#E9E3D4]/85 dark:hover:text-[#7AB34C]'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="header-active-indicator"
                          aria-hidden="true"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[#286631] dark:bg-[#7AB34C]"
                        />
                      )}
                    </AppLink>
                  );
                })}
              </nav>

              {/* Primary CTA Button */}
              <AppLink
                to="/contact"
                className={`hidden sm:inline-flex items-center justify-center rounded-[8px] bg-[#7AB34C] hover:bg-[#8AC25C] text-[#111A12] font-bold whitespace-nowrap shrink-0 transition-all duration-200 hover:shadow-[0_6px_22px_rgba(122,179,76,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C] ${
                  isFloating
                    ? 'px-4 py-1.5 sm:py-2 text-xs sm:text-sm'
                    : 'px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm'
                }`}
              >
                {t.nav.getInTouch}
              </AppLink>

              {/* Compact Controls: Unified Preferences Dropdown (Language + Theme) & Mobile Menu Button */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div ref={prefsContainerRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setPrefsOpen((prev) => !prev);
                      setMobileOpen(false);
                    }}
                    aria-expanded={prefsOpen}
                    aria-haspopup="menu"
                    aria-label={t.nav.preferencesAria}
                    className={`inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 md:h-10 px-2.5 sm:px-3 rounded-[8px] border text-xs font-bold transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C] ${
                      prefsOpen
                        ? 'border-[#286631] bg-[#E9E3D4] text-[#286631] dark:border-[#7AB34C] dark:bg-[#232F25] dark:text-[#7AB34C]'
                        : 'border-[#D0C9B8] bg-[#E9E3D4]/75 text-[#286631] hover:bg-[#E9E3D4] hover:border-[#286631] dark:border-[#3D463C] dark:bg-[#1F2820] dark:text-[#E9E3D4] dark:hover:bg-[#28362A] dark:hover:border-[#7AB34C]'
                    }`}
                  >
                    <Globe
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#286631] dark:text-[#7AB34C]"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{t.nav.preferencesTitle}</span>
                    {theme === 'dark' ? (
                      <Moon
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7AB34C]"
                        aria-hidden="true"
                      />
                    ) : (
                      <Sun
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A87945]"
                        aria-hidden="true"
                      />
                    )}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        prefsOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {prefsOpen && (
                      <motion.div
                        role="menu"
                        aria-label={t.nav.preferencesAria}
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute end-0 mt-2.5 w-64 rounded-[10px] border p-3.5 shadow-[0_18px_46px_rgba(18,24,19,0.22)] dark:shadow-[0_20px_52px_rgba(0,0,0,0.58)] backdrop-blur-xl bg-[#FAF8F3]/98 border-[#D7D1C2] text-[#1F2720] dark:bg-[#18211A]/98 dark:border-[#3D463C] dark:text-[#F4F1E8] z-50"
                      >
                        {/* Language Switcher Section */}
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C655B] dark:text-[#B6B1A4] mb-2 px-1">
                            {t.nav.languageHeading}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={lang === 'ar'}
                              onClick={() => {
                                setLang('ar');
                                setPrefsOpen(false);
                              }}
                              className={`flex items-center justify-center gap-1.5 min-h-[38px] px-2 rounded-[7px] text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                                lang === 'ar'
                                  ? 'bg-[#286631] text-[#F4F1E8] border-[#286631] dark:bg-[#7AB34C] dark:text-[#111A12] dark:border-[#7AB34C]'
                                  : 'bg-[#F6F3EC] text-[#3D463C] border-[#D8D0BE] hover:bg-[#E9E3D4]/70 hover:border-[#286631] dark:bg-[#1E271F] dark:text-[#DCD6C8] dark:border-[#344034] dark:hover:bg-[#28362A] dark:hover:border-[#7AB34C]'
                              }`}
                            >
                              {lang === 'ar' && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                              <span>{t.nav.arabicLabel}</span>
                            </button>

                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={lang === 'en'}
                              onClick={() => {
                                setLang('en');
                                setPrefsOpen(false);
                              }}
                              className={`flex items-center justify-center gap-1.5 min-h-[38px] px-2 rounded-[7px] text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                                lang === 'en'
                                  ? 'bg-[#286631] text-[#F4F1E8] border-[#286631] dark:bg-[#7AB34C] dark:text-[#111A12] dark:border-[#7AB34C]'
                                  : 'bg-[#F6F3EC] text-[#3D463C] border-[#D8D0BE] hover:bg-[#E9E3D4]/70 hover:border-[#286631] dark:bg-[#1E271F] dark:text-[#DCD6C8] dark:border-[#344034] dark:hover:bg-[#28362A] dark:hover:border-[#7AB34C]'
                              }`}
                            >
                              {lang === 'en' && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                              <span>{t.nav.englishLabel}</span>
                            </button>
                          </div>
                        </div>

                        <div className="my-3 h-px bg-[#D8D0BE] dark:bg-[#2E382E]" aria-hidden="true" />

                        {/* Appearance / Theme Switcher Section */}
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C655B] dark:text-[#B6B1A4] mb-2 px-1">
                            {t.nav.appearanceHeading}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={theme === 'dark'}
                              onClick={() => {
                                setTheme('dark');
                                setPrefsOpen(false);
                              }}
                              className={`flex items-center justify-center gap-1.5 min-h-[38px] px-2 rounded-[7px] text-[11.5px] font-bold whitespace-nowrap border transition-all cursor-pointer ${
                                theme === 'dark'
                                  ? 'bg-[#286631] text-[#F4F1E8] border-[#286631] dark:bg-[#7AB34C] dark:text-[#111A12] dark:border-[#7AB34C]'
                                  : 'bg-[#F6F3EC] text-[#3D463C] border-[#D8D0BE] hover:bg-[#E9E3D4]/70 hover:border-[#286631] dark:bg-[#1E271F] dark:text-[#DCD6C8] dark:border-[#344034] dark:hover:bg-[#28362A] dark:hover:border-[#7AB34C]'
                              }`}
                            >
                              <Moon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              <span>{t.nav.darkModeLabel}</span>
                            </button>

                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={theme === 'light'}
                              onClick={() => {
                                setTheme('light');
                                setPrefsOpen(false);
                              }}
                              className={`flex items-center justify-center gap-1.5 min-h-[38px] px-2 rounded-[7px] text-[11.5px] font-bold whitespace-nowrap border transition-all cursor-pointer ${
                                theme === 'light'
                                  ? 'bg-[#286631] text-[#F4F1E8] border-[#286631] dark:bg-[#7AB34C] dark:text-[#111A12] dark:border-[#7AB34C]'
                                  : 'bg-[#F6F3EC] text-[#3D463C] border-[#D8D0BE] hover:bg-[#E9E3D4]/70 hover:border-[#286631] dark:bg-[#1E271F] dark:text-[#DCD6C8] dark:border-[#344034] dark:hover:bg-[#28362A] dark:hover:border-[#7AB34C]'
                              }`}
                            >
                              <Sun className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              <span>{t.nav.lightModeLabel}</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Hamburger Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen((prev) => !prev);
                    setPrefsOpen(false);
                  }}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-primary-nav"
                  aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
                  className="lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-[8px] border transition-colors cursor-pointer border-[#D0C9B8] bg-white text-[#286631] hover:bg-[#E9E3D4] dark:border-[#3D463C] dark:bg-[#1F2820] dark:text-[#F4F1E8] dark:hover:bg-[#28362A] dark:hover:border-[#7AB34C]"
                >
                  {mobileOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Animated Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-primary-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:hidden mx-auto mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border px-4 py-4 shadow-xl backdrop-blur-xl bg-[#F6F3EC]/98 border-[#D7D1C2] text-[#1F2720] dark:bg-[#18211A]/98 dark:border-[#3D463C] dark:text-[#F4F1E8] ${
                isFloating ? 'max-w-[1160px] rounded-[10px]' : 'rounded-b-[10px] border-t-0 mt-0'
              }`}
            >
              <nav aria-label={t.nav.mobileAria} className="flex flex-col gap-1">
                {t.nav.items.map((item) => {
                  const active = route === item.path;
                  return (
                    <AppLink
                      key={item.path}
                      to={item.path}
                      aria-current={active ? 'page' : undefined}
                      className={`min-h-[44px] flex items-center px-3.5 rounded-[8px] text-base transition-colors ${
                        active
                          ? 'bg-[#E9E3D4] text-[#286631] font-bold dark:bg-[#286631]/35 dark:text-[#7AB34C]'
                          : 'font-medium text-[#3D463C] hover:bg-[#E9E3D4]/70 dark:text-[#E9E3D4]/85 dark:hover:bg-[#232C24]'
                      }`}
                    >
                      {item.label}
                    </AppLink>
                  );
                })}
                <AppLink
                  to="/contact"
                  className="mt-3 min-h-[44px] flex items-center justify-center rounded-[8px] bg-[#7AB34C] hover:bg-[#8AC25C] text-[#111A12] text-sm font-bold"
                >
                  {t.nav.getInTouch}
                </AppLink>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layout spacer matching docked header height so fixed transitions never shift content */}
      <div aria-hidden="true" className="h-14 sm:h-16 md:h-[76px] w-full shrink-0" />
    </>
  );
}
