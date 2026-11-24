import { ASSETS } from '../config/siteConfig';
import { useApp } from '../context/AppContext';

interface BrandLogoProps {
  compact?: boolean;
  forceLightText?: boolean;
  showTagline?: boolean;
}

export function BrandLogo({
  compact = false,
  forceLightText = false,
  showTagline = false,
}: BrandLogoProps) {
  const { t, theme } = useApp();
  const isLightText = forceLightText || theme === 'dark';

  return (
    <span className="group inline-flex items-center gap-2 sm:gap-2.5 whitespace-nowrap shrink-0 select-none">
      {/* Official Designer Sugarcane Square Emblem (tightly framed to crop transparent horizontal canvas margins) */}
      <span
        className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-[5px] sm:rounded-[7px] transition-transform duration-300 group-hover:scale-105 ${
          compact
            ? 'w-7 h-7 sm:w-8 sm:h-8'
            : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
        }`}
      >
        <img
          src={ASSETS.brandIcon}
          alt=""
          aria-hidden="true"
          width={256}
          height={180}
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain scale-[1.58]"
        />
      </span>

      <span className="flex flex-col leading-none text-start">
        <span
          dir="rtl"
          className={`font-arabic font-bold tracking-normal leading-[1.12] ${
            compact
              ? 'text-[13px] sm:text-[15px] md:text-[16px]'
              : 'text-[14px] sm:text-[16px] md:text-[17.5px]'
          } ${isLightText ? 'text-[#F4F1E8]' : 'text-[#286631]'}`}
        >
          {t.brand.arabicName}
        </span>
        <span
          className={`font-semibold tracking-tight mt-0.5 ${
            compact
              ? 'text-[8.5px] sm:text-[9.5px] md:text-[10.5px]'
              : 'text-[9px] sm:text-[10px] md:text-[11px]'
          } ${isLightText ? 'text-[#7AB34C]' : 'text-[#3D463C]'}`}
        >
          {showTagline ? t.brand.tagline : t.brand.englishName}
        </span>
      </span>
    </span>
  );
}
