import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BadgeCheck, Calculator, Mail, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../config/siteConfig';
import { AppLink, useApp } from '../context/AppContext';
import { BrandAssetIcon, type BrandIconKey } from './BrandAssetIcon';
import { CompostCalculatorWidget } from './CompostCalculatorWidget';
import { LazyImage } from './LazyImage';

const PRINCIPLE_ASSET_MAP: Record<'sustainable' | 'excellence' | 'future', BrandIconKey> = {
  sustainable: 'iconSugarcaneStalk',
  excellence: 'iconSproutBlades',
  future: 'iconSoilLeaves',
};

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function BoldHome() {
  const { t, isRtl, theme } = useApp();
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;
  const isDark = theme === 'dark';

  return (
    <div className="bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8] transition-colors">
      {/* 1. HERO:
          - Mobile (< md): Full-bleed image with TOP shadow (heading+subtitle) + clear middle window (circular planting) + BOTTOM shadow (CTA buttons).
          - Tablet (md): Side-by-side full-bleed hero with circular planting shifted further right (EN) / left (AR).
          - Desktop (lg+): Full-bleed side-by-side Concept 2 composition. */}
      <section className="relative overflow-hidden bg-[#F6F3EC] dark:bg-[#121813] transition-colors">
        <div className="absolute inset-0">
          {/* Mobile (< md) slightly zoomed-out image frame centered on the circular planting; full-bleed inset-0 on md+ */}
          <div className="absolute inset-x-0 top-[76px] bottom-[62px] sm:top-[84px] sm:bottom-[68px] md:inset-0">
            <LazyImage
              priority
              src={ASSETS.heroCircularTransformation}
              alt={t.home.heroImgAlt}
              width={1920}
              height={1071}
              className={`w-full h-full object-cover object-[78%_50%] sm:object-[78%_50%] md:object-[28%_56%] lg:object-[84%_60%] xl:object-[82%_62%] transition-transform duration-700 ${
                isRtl ? 'md:scale-x-[-1]' : ''
              }`}
            />
          </div>

          {/* Mobile (< md) TOP shadow behind heading & subtitle — seamlessly blends top image edge */}
          <div
            aria-hidden="true"
            className={`md:hidden absolute inset-x-0 top-0 h-[46%] transition-colors ${
              isDark
                ? 'bg-gradient-to-b from-[#0B100C] from-[28%] via-[#121813]/82 via-[56%] to-transparent'
                : 'bg-gradient-to-b from-[#F6F3EC] from-[30%] via-[#F6F3EC]/86 via-[58%] to-transparent'
            }`}
          />

          {/* Mobile (< md) BOTTOM shadow behind CTA buttons — seamlessly blends bottom image edge */}
          <div
            aria-hidden="true"
            className={`md:hidden absolute inset-x-0 bottom-0 h-[36%] transition-colors ${
              isDark
                ? 'bg-gradient-to-t from-[#121813] from-[32%] via-[#121813]/86 via-[58%] to-transparent'
                : 'bg-gradient-to-t from-[#F6F3EC] from-[32%] via-[#F6F3EC]/90 via-[58%] to-transparent'
            }`}
          />

          {/* Tablet & Desktop (md+) directional scrim behind headings — deep shadow in Dark Mode, warm parchment fade in Light Mode */}
          <div
            aria-hidden="true"
            className={`hidden md:block absolute inset-0 transition-colors ${
              isDark
                ? isRtl
                  ? 'bg-gradient-to-l from-[#0C120D] via-[#121813]/92 via-[38%] to-transparent to-[64%]'
                  : 'bg-gradient-to-r from-[#0C120D] via-[#121813]/92 via-[38%] to-transparent to-[64%]'
                : isRtl
                  ? 'bg-gradient-to-l from-[#F6F3EC] via-[#F6F3EC]/92 via-[38%] to-transparent to-[62%]'
                  : 'bg-gradient-to-r from-[#F6F3EC] via-[#F6F3EC]/92 via-[38%] to-transparent to-[62%]'
            }`}
          />

          {/* Tablet & Desktop (md+) focused radial pool behind heading column so circular planting on the opposite side stays vivid */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? isRtl
                  ? 'radial-gradient(48% 82% at 86% 48%, rgba(12, 18, 13, 0.92) 0%, rgba(18, 24, 19, 0.52) 52%, transparent 100%)'
                  : 'radial-gradient(48% 82% at 14% 48%, rgba(12, 18, 13, 0.92) 0%, rgba(18, 24, 19, 0.52) 52%, transparent 100%)'
                : isRtl
                  ? 'radial-gradient(48% 84% at 86% 48%, rgba(246, 243, 236, 0.94) 0%, rgba(246, 243, 236, 0.54) 52%, transparent 100%)'
                  : 'radial-gradient(48% 84% at 14% 48%, rgba(246, 243, 236, 0.94) 0%, rgba(246, 243, 236, 0.54) 52%, transparent 100%)',
            }}
          />

          {/* Smooth bottom blend into active canvas on md+ */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-x-0 bottom-0 h-28 lg:h-32 bg-gradient-to-t from-[#F6F3EC] via-[#F6F3EC]/60 dark:from-[#121813] dark:via-[#121813]/70 to-transparent"
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-14 md:pb-20 lg:pt-20 lg:pb-28 min-h-[570px] sm:min-h-[600px] md:min-h-[510px] lg:min-h-[640px] flex items-stretch md:items-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-stretch md:items-center w-full">
            {/* Message Column:
                On mobile -> split top (heading/subtitle over top shadow) + clear center gap + bottom (CTAs over bottom shadow).
                On tablet/desktop -> unified column aligned on the text side. */}
            <div className="md:col-span-6 lg:col-span-6 w-full md:max-w-[560px] flex flex-col justify-between md:justify-center">
              {/* Top Group: Headline (~82% width on mobile) & Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="w-[84%] sm:w-[82%] md:w-full"
              >
                <h1 className="font-bold-display text-[25px] sm:text-[33px] md:text-[38px] lg:text-[52px] xl:text-[58px] font-bold leading-[1.15] tracking-tight text-[#1F2720] dark:text-[#F4F1E8] dark:drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
                  {t.home.heroLine1}
                  <span className="md:hidden"> </span>
                  <br className="hidden md:inline" />
                  {t.home.heroLine2}
                  <span className="md:hidden"> </span>
                  <br className="hidden md:inline" />
                  {t.home.heroLine3}{' '}
                  <span className="text-[#286631] dark:text-[#7AB34C] block mt-0.5">
                    {t.home.heroHighlight}
                  </span>
                </h1>

                <p className="mt-2.5 sm:mt-3.5 md:mt-5 text-[13px] sm:text-[14.5px] md:text-[15.5px] lg:text-[18px] leading-[1.55] text-[#2F372E] dark:text-[#E9E3D4]/94 md:max-w-[440px]">
                  {t.home.heroSubtitle}
                </p>
              </motion.div>

              {/* Mobile-only open visual window for the zoomed-out circular planting graphic */}
              <div className="flex-1 min-h-[240px] sm:min-h-[260px] md:hidden" aria-hidden="true" />

              {/* Bottom Group: CTA Buttons (sits cleanly over the bottom shadow on mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT_EXPO }}
                className="md:mt-7 lg:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3"
              >
                <AppLink
                  to="/products"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[8px] bg-[#7AB34C] hover:bg-[#8AC25C] text-[#111A12] px-4 py-2.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-[13px] lg:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(122,179,76,0.34)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C]"
                >
                  <span>{t.home.heroPrimaryCta}</span>
                  <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </AppLink>

                <AppLink
                  to="/calculator"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[8px] px-4 py-2.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-[13px] lg:text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 bg-white/88 hover:bg-[#E9E3D4] text-[#286631] border-[#286631]/30 dark:bg-[#121813]/80 dark:hover:bg-[#1E2B20] dark:text-[#F4F1E8] dark:border-white/25 dark:hover:border-[#7AB34C]/60 backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C]"
                >
                  <span>{t.home.heroSecondaryCta}</span>
                  <Calculator
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#286631] dark:text-[#7AB34C]"
                    aria-hidden="true"
                  />
                </AppLink>
              </motion.div>
            </div>

            {/* Tablet & Desktop spacer letting the unobstructed circular planting graphic breathe */}
            <div className="hidden md:block md:col-span-6" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 2. MOBILE-FIRST BLURRED BORDERLESS VALUE STRIP WITH OFFICIAL DESIGNER BOTANICAL ICONS */}
      <section
        aria-label={t.home.principlesAria}
        className="relative z-20 -mt-2 sm:-mt-4 md:-mt-9 lg:-mt-12 pb-6 sm:pb-8 lg:pb-10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="rounded-[10px] sm:rounded-[12px] px-2.5 py-3.5 sm:px-6 sm:py-5 lg:px-8 lg:py-7 backdrop-blur-xl bg-white/78 shadow-[0_10px_30px_rgba(31,39,32,0.06)] dark:bg-white/[0.045] dark:shadow-[0_14px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="grid grid-cols-3">
              {t.home.principles.map((item, idx) => (
                <div
                  key={item.id}
                  className={`group cursor-default flex flex-col md:flex-row items-center justify-center text-center md:text-start gap-2 sm:gap-2.5 md:gap-3.5 lg:gap-4 px-1.5 sm:px-3 md:px-4 py-0.5 ${
                    idx > 0 ? 'border-s border-[#3D463C]/14 dark:border-white/12' : ''
                  }`}
                >
                  <BrandAssetIcon
                    iconKey={PRINCIPLE_ASSET_MAP[item.id]}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                  />
                  <p className="text-[11px] sm:text-[13px] md:text-[14px] lg:text-base font-bold text-[#1F2720] dark:text-[#F4F1E8] leading-[1.3] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:text-[#286631] dark:group-hover:text-[#7AB34C]">
                    {item.line1} {item.line2}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. LIGHTWEIGHT GLASSY COMPOST CALCULATOR PANEL */}
      <section aria-label={t.calculator.sectionAria} className="py-4 sm:py-6 md:py-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <CompostCalculatorWidget mode="preview" />
        </motion.div>
      </section>

      {/* 4. OUR PRODUCT SECTION — CONCEPT 2 ARCHED COMPOSITION + VERIFIED KEY SPECS + SUBTLE BRAND PATTERN */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Whisper-subtle official sugarcane outline pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.055]"
          style={{
            backgroundImage: `url(${ASSETS.patternOutline})`,
            backgroundSize: '340px auto',
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="md:col-span-5"
            >
              <p className="text-[11px] sm:text-xs font-bold tracking-wide text-[#286631] dark:text-[#7AB34C] mb-1.5 sm:mb-2">
                {t.products.naturalBadge}
              </p>
              <h2 className="font-bold-display text-[22px] sm:text-[28px] md:text-[32px] lg:text-[42px] font-bold tracking-tight text-[#286631] dark:text-[#F4F1E8]">
                {t.home.productTitle}
              </h2>
              <p className="mt-2.5 sm:mt-3.5 text-[13.5px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.65] text-[#3D463C] dark:text-[#DCD6C8] max-w-[430px]">
                {t.home.productSubtitle}
              </p>

              {/* Verified key analysis numbers directly from official product spec sheet */}
              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 max-w-[430px]">
                {t.home.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[8px] border px-3 py-2.5 sm:px-3.5 sm:py-3 bg-white/80 border-[#D8D0BE] dark:bg-[#1A221B]/90 dark:border-[#344034]"
                  >
                    <p className="font-bold-display text-base sm:text-lg lg:text-xl font-bold tabular-nums text-[#286631] dark:text-[#7AB34C] leading-tight">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-[#4E584D] dark:text-[#C5BFB0]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 lg:mt-7">
                <AppLink
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#7AB34C] hover:bg-[#8AC25C] text-[#111A12] px-6 py-2.5 sm:px-7 sm:py-3 lg:px-8 text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(122,179,76,0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286631] dark:focus-visible:outline-[#7AB34C]"
                >
                  <span>{t.home.productCta}</span>
                  <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </AppLink>
              </div>
            </motion.div>

            {/* Concept 2 Iconic Sweeping Arched Organic Silhouette + Floating Designer Accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="md:col-span-7 relative"
            >
              <svg
                width="136"
                height="136"
                viewBox="0 0 136 136"
                fill="none"
                aria-hidden="true"
                className={`hidden md:block pointer-events-none absolute -bottom-3 z-20 w-24 h-24 lg:w-[136px] lg:h-[136px] text-[#286631]/40 dark:text-[#7AB34C]/40 animate-gentle-float ${
                  isRtl ? '-right-4 lg:-right-5 scale-x-[-1]' : '-left-4 lg:-left-5'
                }`}
              >
                <path
                  d="M20 116C26 76 54 44 106 30C92 78 60 110 20 116Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M24 112C48 84 74 62 102 34"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path
                  d="M12 72C26 52 50 42 78 46C58 68 34 78 12 72Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>

              <div
                className={`relative overflow-hidden bg-[#286631]/10 dark:bg-[#121813] shadow-[0_14px_36px_rgba(31,39,32,0.12)] dark:shadow-none aspect-[16/10] sm:aspect-[16/9] ${
                  isRtl
                    ? 'rounded-[10px] sm:rounded-tr-[105px] sm:rounded-br-[64px] lg:rounded-tr-[145px] lg:rounded-br-[88px] sm:rounded-tl-[10px] sm:rounded-bl-[10px]'
                    : 'rounded-[10px] sm:rounded-tl-[105px] sm:rounded-bl-[64px] lg:rounded-tl-[145px] lg:rounded-bl-[88px] sm:rounded-tr-[10px] sm:rounded-br-[10px]'
                }`}
              >
                <div className={`w-full h-full ${isRtl ? '-scale-x-100' : ''}`}>
                  <LazyImage
                    src={ASSETS.compostHandsSprout}
                    alt={t.home.productImgAlt}
                    width={1600}
                    height={893}
                    className="w-full h-full object-cover object-right scale-[1.28] origin-right transition-transform duration-700 hover:scale-[1.32]"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="hidden dark:block pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(18,24,19,0.55)]"
                />
              </div>
            </motion.div>
          </div>

          {/* 4 Verified Product Advantages from Official Campaign Specs with Designer Icons */}
          <div className="mt-8 sm:mt-12 lg:mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-6">
              <div>
                <h3 className="font-bold-display text-lg sm:text-xl md:text-2xl font-bold text-[#286631] dark:text-[#F4F1E8]">
                  {t.products.benefitsTitle}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#3D463C] dark:text-[#C5BFB0]">
                  {t.products.benefitsSubtitle}
                </p>
              </div>
              <AppLink
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#286631] dark:text-[#7AB34C] hover:underline underline-offset-4 shrink-0"
              >
                <span>{t.products.specsTitle}</span>
                <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </AppLink>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
              {t.products.benefits.map((benefit, idx) => {
                const isLastOdd =
                  t.products.benefits.length % 2 === 1 && idx === t.products.benefits.length - 1;
                return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE_OUT_EXPO }}
                  className={`group min-w-0 rounded-[10px] sm:rounded-[12px] border p-3 sm:p-5 bg-white/90 border-[#D8D0BE] hover:border-[#7AB34C] dark:bg-[#1A221B] dark:border-[#344034] dark:hover:bg-[#202B22] dark:hover:border-[#7AB34C]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(40,102,49,0.09)] dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.35)] ${
                    isLastOdd ? 'col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-[8px] flex items-center justify-center mb-2.5 sm:mb-4 bg-[#E9E3D4]/85 dark:bg-[#233224]">
                    <BrandAssetIcon
                      iconKey={benefit.iconKey}
                      className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="font-bold-display text-[13px] sm:text-base font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                    {benefit.title}
                  </h4>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-[13.5px] leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                    {benefit.description}
                  </p>
                </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CIRCULAR TRANSFORMATION OVERVIEW & COMPANY QUALITY GUARANTEE */}
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#E9E3D4]/65 border-y border-[#D6D0C0] dark:bg-[#1A221B] dark:border-[#3D463C]/70 transition-colors overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `url(${ASSETS.patternSolid})`,
            backgroundSize: '360px auto',
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-5 sm:mb-7 lg:mb-8">
            <h2 className="font-bold-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-bold tracking-tight text-[#286631] dark:text-[#F4F1E8]">
              {t.home.circularTitle}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#3D463C] dark:text-[#C8C3B6]">
              {t.home.circularSubtitle}
            </p>
          </div>

          <ol className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
            {t.home.circularStages.map((stage, idx) => {
              const isLastOdd =
                t.home.circularStages.length % 2 === 1 &&
                idx === t.home.circularStages.length - 1;
              return (
                <motion.li
                  key={stage.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                  className={`group min-w-0 rounded-[10px] sm:rounded-[12px] p-3 sm:p-5 lg:p-6 border bg-white border-[#D7D1C2] hover:border-[#7AB34C]/65 dark:bg-[#222B23] dark:border-[#3D463C] dark:hover:bg-[#28352A] dark:hover:border-[#7AB34C]/65 transition-all duration-300 hover:-translate-y-0.5 ${
                    isLastOdd ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="font-bold-display text-xs sm:text-sm font-bold text-[#A87945] dark:text-[#7AB34C] tabular-nums">
                      {stage.step}
                    </span>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[7px] sm:rounded-[8px] flex items-center justify-center bg-[#E9E3D4]/80 dark:bg-[#19231A]">
                      <BrandAssetIcon
                        iconKey={stage.iconKey}
                        className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold-display text-[13px] sm:text-base lg:text-lg font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                    {stage.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[11px] sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C8C3B6]">
                    {stage.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-5 sm:mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="lg:col-span-5 rounded-[10px] sm:rounded-[12px] p-4 sm:p-5 lg:p-6 border flex flex-col justify-between bg-white border-[#D7D1C2] dark:bg-[#1E261F] dark:border-[#3D463C]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center bg-[#E9E3D4] text-[#286631] dark:bg-[#286631]/30 dark:border dark:border-[#7AB34C]/30 dark:text-[#7AB34C]">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-[6px] px-2.5 py-1 text-[11px] font-bold bg-[#286631]/10 text-[#286631] dark:bg-[#7AB34C]/18 dark:text-[#7AB34C]">
                    <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    {t.products.taxExemptBadge}
                  </span>
                </div>
                <h3 className="font-bold-display text-base sm:text-lg lg:text-xl font-bold text-[#1F2720] dark:text-[#F4F1E8]">
                  {t.home.qualityTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C8C3B6]">
                  {t.home.qualityBody}
                </p>
              </div>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-4">
                <AppLink
                  to="/request-quotation"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold underline-offset-4 hover:underline text-[#286631] dark:text-[#7AB34C] dark:hover:text-[#8AC25C]"
                >
                  <span>{t.home.qualityCta}</span>
                  <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </AppLink>
              </div>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-5">
              {t.home.contextCards.map((card, idx) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                  className="group min-w-0 rounded-[10px] sm:rounded-[12px] border overflow-hidden flex flex-col bg-white border-[#D7D1C2] dark:bg-[#1E261F] dark:border-[#3D463C]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#E9E3D4] dark:bg-[#232C24]">
                    <LazyImage
                      src={ASSETS[card.imageKey]}
                      alt={card.title}
                      width={1230}
                      height={446}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 sm:p-5 flex-1">
                    <h3 className="font-bold-display text-[12.5px] sm:text-[15.5px] lg:text-base font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                      {card.title}
                    </h3>
                    <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C8C3B6]">
                      {card.caption}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. REQUEST A QUOTATION BANNER — FAITHFUL CONCEPT 2 TWO-LAYER SWOOP + SUNLIT FIELD */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="relative rounded-[12px] sm:rounded-[14px] overflow-hidden border border-[#C9C3B3] dark:border-[#3D463C] bg-[#1A221B] shadow-[0_12px_32px_rgba(31,39,32,0.1)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.36)]"
          >
            {/* Tablet & Desktop (md+) faithful horizontal swoop banner */}
            <div className="relative hidden md:flex items-center justify-between min-h-[120px] lg:min-h-[138px] px-6 lg:px-10 py-5 lg:py-7">
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <LazyImage
                  src={ASSETS.sugarcaneFieldMountains}
                  alt=""
                  aria-hidden="true"
                  width={1230}
                  height={446}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div
                aria-hidden="true"
                className={`absolute inset-0 ${
                  isRtl
                    ? 'bg-gradient-to-r from-[#121813]/45 via-transparent to-transparent'
                    : 'bg-gradient-to-l from-[#121813]/45 via-transparent to-transparent'
                }`}
              />

              <svg
                viewBox="0 0 1200 160"
                preserveAspectRatio="none"
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full pointer-events-none ${
                  isRtl ? 'scale-x-[-1]' : ''
                }`}
              >
                <defs>
                  <linearGradient id="brandSwoopPrimary" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#84BE54" />
                    <stop offset="68%" stopColor="#7AB34C" />
                    <stop offset="100%" stopColor="#5D9636" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0H712C795 0 806 86 710 142C665 164 600 160 555 160H0V0Z"
                  fill="#7AB34C"
                  fillOpacity="0.34"
                />
                <path
                  d="M0 0H668C756 2 770 74 684 128C636 158 585 160 532 160H0V0Z"
                  fill="url(#brandSwoopPrimary)"
                />
              </svg>

              <div className="relative z-10 flex items-center gap-3.5 lg:gap-4 max-w-[460px] lg:max-w-[560px]">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[8px] bg-[#121813]/10 flex items-center justify-center text-[#121813] shrink-0">
                  <Mail className="w-5 h-5 lg:w-7 lg:h-7" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold-display text-[21px] lg:text-[30px] font-bold text-[#121813] tracking-tight leading-tight">
                    {t.home.quoteBannerTitle}
                  </h2>
                  <p className="mt-1 text-xs lg:text-[15px] font-medium text-[#1F2720]">
                    {t.home.quoteBannerSubtitle}
                  </p>
                </div>
              </div>

              <AppLink
                to="/request-quotation"
                className="relative z-10 inline-flex items-center gap-2 lg:gap-2.5 rounded-[8px] bg-[#121813]/92 hover:bg-[#0B100C] text-[#F4F1E8] border border-[#7AB34C]/45 px-5 py-2.5 lg:px-7 lg:py-3.5 text-xs lg:text-sm font-bold whitespace-nowrap shrink-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(0,0,0,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7AB34C]"
              >
                <span>{t.home.quoteBannerCta}</span>
                <DirectionArrow className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#7AB34C]" aria-hidden="true" />
              </AppLink>
            </div>

            {/* Mobile (< md) compact stacked version */}
            <div className="md:hidden">
              <div className="bg-gradient-to-br from-[#84BE54] to-[#6DA442] px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[7px] bg-[#121813]/10 flex items-center justify-center text-[#121813] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-bold-display text-[18px] sm:text-[21px] font-bold text-[#121813] leading-tight">
                      {t.home.quoteBannerTitle}
                    </h2>
                    <p className="mt-1 text-xs sm:text-[13px] font-medium text-[#1F2720]">
                      {t.home.quoteBannerSubtitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative px-4 py-4 sm:px-5 flex items-center justify-center overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                  <LazyImage
                    src={ASSETS.sugarcaneFieldMountains}
                    alt=""
                    aria-hidden="true"
                    width={1230}
                    height={446}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-[#121813]/40" />
                <AppLink
                  to="/request-quotation"
                  className="relative z-10 w-full inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#121813]/92 hover:bg-[#0B100C] text-[#F4F1E8] border border-[#7AB34C]/45 px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors"
                >
                  <span>{t.home.quoteBannerCta}</span>
                  <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7AB34C]" aria-hidden="true" />
                </AppLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
