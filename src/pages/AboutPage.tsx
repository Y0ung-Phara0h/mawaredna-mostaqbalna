import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ASSETS } from '../config/siteConfig';
import { BrandAssetIcon, type BrandIconKey } from '../components/BrandAssetIcon';
import { LazyImage } from '../components/LazyImage';
import { AppLink, useApp } from '../context/AppContext';

const VALUE_ASSET_ICONS: readonly BrandIconKey[] = [
  'iconSugarcaneStalk',
  'iconFieldRidges',
  'iconSoilLeaves',
];

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function AboutPage() {
  const { t, isRtl } = useApp();
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8] transition-colors">
      {/* Intro Band with Official Sugarcane Geometric Pattern */}
      <section className="relative overflow-hidden border-b bg-[#E9E3D4] border-[#D8D0BE] dark:bg-[#182019] dark:border-[#2E382E]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.06]"
          style={{
            backgroundImage: `url(${ASSETS.patternOutline})`,
            backgroundSize: '320px auto',
            backgroundRepeat: 'repeat',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20"
        >
          <p className="text-[11px] sm:text-xs md:text-sm font-bold mb-2 sm:mb-3 text-[#286631] dark:text-[#7AB34C]">
            {t.about.eyebrow} · {t.brand.tagline}
          </p>
          <h1 className="font-bold-display text-[24px] sm:text-[34px] md:text-[42px] lg:text-[50px] font-bold leading-[1.14] tracking-tight max-w-3xl text-balance text-[#1F2720] dark:text-[#F4F1E8]">
            {t.about.title}
          </h1>
          <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] md:text-base lg:text-[17px] leading-[1.68] max-w-2xl text-[#3D463C] dark:text-[#D4CEBE]">
            {isRtl ? (
              t.about.introSuffix
            ) : (
              <>
                <span dir="rtl" className="font-arabic font-semibold">
                  {t.brand.arabicName}
                </span>{' '}
                {t.about.introSuffix}
              </>
            )}
          </p>
        </motion.div>
      </section>

      {/* Company Story Split — Tablet & Desktop full-bleed image on opposite side with 2px corners */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-14 lg:py-20">
        {/* Tablet & Desktop (md+) image taking full width of opposite side and matching text section height */}
        <div className="hidden md:block absolute top-14 bottom-14 lg:top-20 lg:bottom-20 end-0 w-[48%]">
          <div className="w-full h-full rounded-[2px] overflow-hidden border-s border-y border-[#D8D0BE] bg-[#E9E3D4] dark:border-[#344034] dark:bg-[#1A221B] shadow-sm">
            <LazyImage
              priority
              src={ASSETS.sugarcaneFieldMountains}
              alt={t.about.storyImgAlt}
              width={1230}
              height={446}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
          <div className="md:col-span-6 md:pe-6 lg:pe-10">
            <h2 className="font-bold-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-bold tracking-tight text-[#1F2720] dark:text-[#F4F1E8]">
              {t.about.storyTitle}
            </h2>
            <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] lg:text-base leading-[1.7] text-[#3D463C] dark:text-[#D4CEBE]">
              {t.about.storyP1}
            </p>
            <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] lg:text-base leading-[1.7] text-[#4E584D] dark:text-[#B9B3A3]">
              {t.about.storyP2}
            </p>
          </div>

          {/* Mobile (< md) image */}
          <div className="md:hidden">
            <div className="rounded-[2px] overflow-hidden border border-[#D8D0BE] bg-[#E9E3D4] dark:border-[#344034] dark:bg-[#1A221B] shadow-sm">
              <LazyImage
                priority
                src={ASSETS.sugarcaneFieldMountains}
                alt={t.about.storyImgAlt}
                width={1230}
                height={446}
                wrapperClassName="w-full aspect-[16/9]"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Tablet & Desktop spacer matching the opposite-side full-bleed image column */}
          <div className="hidden md:block md:col-span-6" aria-hidden="true" />
        </div>
      </section>

      {/* Mission & Values Cards with Designer Icons */}
      <section className="py-8 sm:py-12 md:py-16 border-y bg-[#E9E3D4] border-[#D8D0BE] dark:bg-[#182019] dark:border-[#2E382E]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-bold tracking-tight mb-5 sm:mb-7 lg:mb-8 text-[#1F2720] dark:text-[#F4F1E8]">
            {t.about.valuesTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
            {t.about.values.map((val, idx) => {
              const isLastOdd =
                t.about.values.length % 2 === 1 && idx === t.about.values.length - 1;
              return (
                <motion.article
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                  className={`group min-w-0 rounded-[10px] sm:rounded-[12px] border p-3 sm:p-5 lg:p-6 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C]/65 dark:bg-[#1C241D] dark:border-[#344034] dark:hover:bg-[#222E24] dark:hover:border-[#7AB34C]/65 transition-all duration-300 hover:-translate-y-1 ${
                    isLastOdd ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-[7px] sm:rounded-[8px] flex items-center justify-center mb-2.5 sm:mb-4 bg-[#E9E3D4] dark:bg-[#233224]">
                    <BrandAssetIcon
                      iconKey={VALUE_ASSET_ICONS[idx % VALUE_ASSET_ICONS.length]}
                      className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold-display text-[13px] sm:text-base lg:text-lg font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                    {val.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[11px] sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                    {val.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conceptual Resource Narrative & Production Context */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-5 sm:mb-7 lg:mb-8">
            <h2 className="font-bold-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-bold tracking-tight text-[#1F2720] dark:text-[#F4F1E8]">
              {t.about.cycleTitle}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#3D463C] dark:text-[#C5BFB0]">
              {t.about.cycleSubtitle}
            </p>
          </div>

          <ol className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
            {t.home.circularStages.map((stage, idx) => {
              const isLastOdd =
                t.home.circularStages.length % 2 === 1 &&
                idx === t.home.circularStages.length - 1;
              return (
                <motion.li
                  key={stage.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                  className={`group min-w-0 rounded-[10px] sm:rounded-[12px] border p-3 sm:p-5 lg:p-6 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C]/65 dark:bg-[#1A221B] dark:border-[#344034] dark:hover:bg-[#222E24] dark:hover:border-[#7AB34C]/65 transition-all ${
                    isLastOdd ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold tabular-nums text-[#A87945] dark:text-[#7AB34C]">
                      {stage.step}
                    </span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[7px] sm:rounded-[8px] flex items-center justify-center bg-[#E9E3D4]/80 dark:bg-[#233224]">
                      <BrandAssetIcon
                        iconKey={stage.iconKey}
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <h3 className="mt-1 sm:mt-2 font-bold-display text-[13px] sm:text-base lg:text-lg font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                    {stage.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[11px] sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                    {stage.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-7 sm:mt-10 lg:mt-12 rounded-[10px] sm:rounded-[12px] border overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center bg-[#E9E3D4] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034]">
            <div className="lg:col-span-6 h-full">
              <LazyImage
                src={ASSETS.tilledSoilSunrise}
                alt={t.about.productionImgAlt}
                width={1226}
                height={449}
                wrapperClassName="w-full h-full aspect-[16/9] lg:aspect-auto lg:min-h-[260px]"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8">
              <h3 className="font-bold-display text-lg sm:text-xl lg:text-2xl font-bold text-[#1F2720] dark:text-[#F4F1E8]">
                {t.about.productionTitle}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-[#3D463C] dark:text-[#D4CEBE]">
                {t.about.productionBody}
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                <AppLink
                  to="/request-quotation"
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-[8px] bg-[#286631] hover:bg-[#1F5127] text-[#F4F1E8] dark:bg-[#7AB34C] dark:hover:bg-[#8AC25C] dark:text-[#121813] px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-bold transition-colors"
                >
                  <span>{t.about.ctaQuote}</span>
                  <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                </AppLink>
                <AppLink
                  to="/contact"
                  className="inline-flex items-center rounded-[8px] px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold border transition-colors border-[#C7BEA8] bg-[#FAF8F3] text-[#1F2720] hover:bg-white dark:border-[#3D463C] dark:bg-transparent dark:text-[#F4F1E8] dark:hover:bg-[#232F24] dark:hover:border-[#7AB34C]/55"
                >
                  {t.about.ctaContact}
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
