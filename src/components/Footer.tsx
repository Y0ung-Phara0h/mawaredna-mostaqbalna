import { ASSETS, getSocialConfig } from '../config/siteConfig';
import { AppLink, useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.5-1.46h1.55V4.45c-.27-.04-1.19-.12-2.26-.12-2.24 0-3.77 1.37-3.77 3.88V10.5H8v3h2.52V21h2.98z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useApp();
  const social = getSocialConfig();

  const facebookLinkClass =
    'inline-flex items-center gap-2 h-9 sm:h-10 px-3.5 sm:px-4 rounded-[8px] text-xs sm:text-[13px] font-semibold transition-all bg-[#F6F3EC] border border-[#D4CEBF] text-[#286631] hover:bg-[#286631] hover:border-[#286631] hover:text-[#F4F1E8] dark:bg-[#1A221B] dark:border-[#3D463C] dark:text-[#E9E3D4] dark:hover:text-[#111A12] dark:hover:bg-[#7AB34C] dark:hover:border-[#7AB34C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C]';

  return (
    <footer className="relative overflow-hidden w-full transition-colors bg-[#E9E3D4] border-t border-[#D6D0C0] text-[#1F2720] dark:bg-[#0E130F] dark:border-[#3D463C]/60 dark:text-[#F4F1E8]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url(${ASSETS.patternOutline})`,
          backgroundSize: '300px auto',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-7 lg:gap-8">
          <AppLink to="/" aria-label={t.brand.homeAria}>
            <BrandLogo compact showTagline />
          </AppLink>

          {/* Generously spaced bold navigation links */}
          <nav
            aria-label={t.nav.footerAria}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-7 md:gap-x-9 lg:gap-x-10 sm:gap-y-3"
          >
            {t.nav.items.map((item) => (
              <AppLink
                key={item.path}
                to={item.path}
                className="text-xs sm:text-sm md:text-[15px] font-semibold whitespace-nowrap transition-colors text-[#3D463C] hover:text-[#286631] dark:text-[#E9E3D4]/90 dark:hover:text-[#7AB34C]"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          {/* Official social channel (Facebook only) */}
          <div className="flex items-center">
            {social.facebook ? (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.social.facebookAria}
                className={facebookLinkClass}
              >
                <FacebookIcon />
                <span>{t.social.facebookLabel}</span>
              </a>
            ) : (
              <AppLink
                to="/contact"
                aria-label={t.social.facebookAria}
                className={facebookLinkClass}
              >
                <FacebookIcon />
                <span>{t.social.facebookLabel}</span>
              </AppLink>
            )}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#D4CEBF] dark:border-[#3D463C]/50 text-center text-[11px] sm:text-xs font-medium text-[#5C655B] dark:text-[#B6B1A4]">
          {t.brand.copyright}
        </div>
      </div>
    </footer>
  );
}
