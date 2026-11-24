import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BadgeCheck, Calculator, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../config/siteConfig';
import { BrandAssetIcon } from '../components/BrandAssetIcon';
import { LazyImage } from '../components/LazyImage';
import { AppLink, useApp } from '../context/AppContext';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function ProductsPage() {
  const { t, isRtl } = useApp();
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8] transition-colors">
      {/* 1. Product Hero */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-12 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url(${ASSETS.patternOutline})`,
            backgroundSize: '340px auto',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Tablet-only (md to lg) full-bleed product image on the side opposite to text, matching full text height with 2px corners */}
        <div className="hidden md:block lg:hidden absolute top-12 bottom-12 end-0 w-[48%]">
          <div className="w-full h-full rounded-[2px] overflow-hidden border-s border-y border-[#D8D0BE] bg-[#286631]/10 dark:bg-[#1A221B] dark:border-[#344034] shadow-sm">
            <div className={`w-full h-full ${isRtl ? '-scale-x-100' : ''}`}>
              <LazyImage
                priority
                src={ASSETS.compostHandsSprout}
                alt={t.products.imgAlt}
                width={1600}
                height={893}
                className="w-full h-full object-cover object-center object-[76%_50%] scale-[1.09] origin-right"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="md:col-span-6 md:pe-6 lg:pe-0"
          >
            <h1 className="font-bold-display text-[24px] sm:text-[34px] md:text-[34px] lg:text-[50px] font-bold leading-[1.12] tracking-tight text-balance text-[#1F2720] dark:text-[#F4F1E8]">
              {t.products.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] md:text-[14.5px] lg:text-[17px] leading-[1.68] max-w-xl text-[#3D463C] dark:text-[#D4CEBE]">
              {t.products.description}
            </p>

            {/* Mobile-only (< md) full-width product image directly above bullet points with max 2px corners */}
            <div className="md:hidden -mx-4 sm:-mx-6 my-4 sm:my-5">
              <div className="rounded-[2px] overflow-hidden border-y border-[#D8D0BE] bg-[#286631]/10 dark:bg-[#1A221B] dark:border-[#344034] aspect-[16/10]">
                <div className={`w-full h-full ${isRtl ? '-scale-x-100' : ''}`}>
                  <LazyImage
                    priority
                    src={ASSETS.compostHandsSprout}
                    alt={t.products.imgAlt}
                    width={1600}
                    height={893}
                    className="w-full h-full object-cover object-right scale-[1.28] origin-right"
                  />
                </div>
              </div>
            </div>

            <ul className="mt-4 sm:mt-5 md:mt-5 lg:mt-6 space-y-2.5 sm:space-y-3">
              {t.products.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-[#2C352C] dark:text-[#DCD6C8]"
                >
                  <CheckCircle2
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0 text-[#286631] dark:text-[#7AB34C]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <AppLink
                to="/calculator"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-[8px] bg-[#286631] hover:bg-[#1F5127] text-[#F4F1E8] dark:bg-[#7AB34C] dark:hover:bg-[#8AC25C] dark:text-[#121813] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                <span>{t.products.ctaCalc}</span>
              </AppLink>
              <AppLink
                to="/request-quotation"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-[8px] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold border transition-all hover:-translate-y-0.5 border-[#C7BEA8] bg-[#FAF8F3] hover:bg-white text-[#1F2720] dark:border-[#3D463C] dark:bg-[#1A221B] dark:hover:bg-[#232F24] dark:hover:border-[#7AB34C]/55 dark:text-[#F4F1E8]"
              >
                <span>{t.products.ctaQuote}</span>
                <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </AppLink>
            </div>
          </motion.div>

          {/* Tablet spacer reserving space for the opposite-side full-bleed image */}
          <div className="hidden md:block lg:hidden md:col-span-6" aria-hidden="true" />

          {/* Desktop (lg+) image aligned horizontally alongside product text/details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="hidden lg:block lg:col-span-6"
          >
            <div className="rounded-[12px] overflow-hidden border border-[#D8D0BE] bg-[#286631]/10 dark:bg-[#1A221B] dark:border-[#344034] shadow-sm aspect-[16/10]">
              <div className={`w-full h-full ${isRtl ? '-scale-x-100' : ''}`}>
                <LazyImage
                  priority
                  src={ASSETS.compostHandsSprout}
                  alt={t.products.imgAlt}
                  width={1600}
                  height={893}
                  className="w-full h-full object-cover object-right scale-[1.28] origin-right"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Four Verified Product Advantages with Official Designer Icons */}
      <section className="py-8 sm:py-12 md:py-14 border-t bg-[#E9E3D4]/75 border-[#D8D0BE] dark:bg-[#161E17] dark:border-[#2E382E]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-5 sm:mb-7 lg:mb-8">
            <h2 className="font-bold-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-bold tracking-tight text-[#286631] dark:text-[#F4F1E8]">
              {t.products.benefitsTitle}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#3D463C] dark:text-[#C5BFB0]">
              {t.products.benefitsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {t.products.benefits.map((benefit, idx) => {
              const isLastOdd =
                t.products.benefits.length % 2 === 1 && idx === t.products.benefits.length - 1;
              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE_OUT_EXPO }}
                  className={`group min-w-0 rounded-[10px] sm:rounded-[12px] border p-3 sm:p-5 lg:p-6 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C] dark:bg-[#1C241D] dark:border-[#344034] dark:hover:bg-[#222E24] dark:hover:border-[#7AB34C]/60 transition-all duration-300 hover:-translate-y-1 ${
                    isLastOdd ? 'col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-[8px] flex items-center justify-center mb-2.5 sm:mb-3.5 bg-[#E9E3D4] dark:bg-[#233224]">
                    <BrandAssetIcon
                      iconKey={benefit.iconKey}
                      className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold-display text-[13px] sm:text-base lg:text-lg font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[11px] sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Full 16-Parameter Verified Technical Analysis Table */}
      <section className="py-8 sm:py-12 md:py-16 border-t border-[#D8D0BE] dark:border-[#2E382E]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-5 sm:mb-7 lg:mb-8">
            <h2 className="font-bold-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-bold tracking-tight text-[#286631] dark:text-[#F4F1E8]">
              {t.products.specsTitle}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#3D463C] dark:text-[#C5BFB0]">
              {t.products.specsSubtitle}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="rounded-[10px] sm:rounded-[12px] border overflow-hidden bg-[#FAF8F3] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034] shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-[#286631] text-[#F4F1E8] dark:bg-[#223224]">
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 sm:py-3.5 text-start text-xs sm:text-sm font-bold"
                    >
                      {t.products.tableHeaders.parameter}
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-5 py-3 sm:py-3.5 text-center text-xs sm:text-sm font-bold whitespace-nowrap"
                    >
                      {t.products.tableHeaders.unit}
                    </th>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 sm:py-3.5 text-end text-xs sm:text-sm font-bold whitespace-nowrap"
                    >
                      {t.products.tableHeaders.value}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8D0BE]/80 dark:divide-[#2E382E]">
                  {t.products.labSpecs.map((row, idx) => (
                    <tr
                      key={row.parameter}
                      className={
                        idx % 2 === 1
                          ? 'bg-[#E9E3D4]/45 dark:bg-[#202921]/75'
                          : 'bg-transparent'
                      }
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#1F2720] dark:text-[#F4F1E8]">
                        {row.parameter}
                      </td>
                      <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-center text-xs sm:text-sm font-medium text-[#5C655B] dark:text-[#B6B1A4] whitespace-nowrap">
                        {row.unit}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-3.5 text-end whitespace-nowrap">
                        {row.isFree ? (
                          <span className="inline-flex items-center gap-1 rounded-[6px] px-2.5 py-0.5 text-[11px] sm:text-xs font-bold bg-[#286631]/12 text-[#286631] dark:bg-[#7AB34C]/18 dark:text-[#7AB34C]">
                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                            {row.value}
                          </span>
                        ) : (
                          <span
                            dir="ltr"
                            className="inline-block font-bold-display text-xs sm:text-sm md:text-[15px] font-bold tabular-nums text-[#286631] dark:text-[#7AB34C]"
                          >
                            {row.value}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* 4 & 5. Official Company Quality Guarantee + Sample & Quotation Callout: stacked vertically on Mobile, side-by-side on Tablet & Desktop */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="relative min-w-0 rounded-[10px] sm:rounded-[12px] border overflow-hidden p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-gradient-to-br from-[#286631] to-[#1D4E24] text-[#F4F1E8] border-[#7AB34C]/40 shadow-md"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.09]"
                style={{
                  backgroundImage: `url(${ASSETS.patternSolid})`,
                  backgroundSize: '300px auto',
                  backgroundRepeat: 'repeat',
                }}
              />
              <div className="relative z-10 flex flex-col justify-between h-full gap-4 sm:gap-5">
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[8px] flex items-center justify-center mb-3 sm:mb-3.5 bg-[#7AB34C] text-[#111A12]">
                    <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                  </div>
                  <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#B6E08E] mb-1">
                    {t.products.guaranteeBadge}
                  </span>
                  <h3 className="font-bold-display text-base sm:text-lg lg:text-xl font-bold leading-snug text-[#F4F1E8]">
                    {t.products.guaranteeTitle}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#E9E3D4]/95">
                    {t.products.guaranteeBody}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-bold bg-[#121813]/55 border border-[#7AB34C]/45 text-[#E9E3D4]">
                    <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#7AB34C]" aria-hidden="true" />
                    <span className="leading-tight">{t.products.taxExemptBadge}</span>
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.5, delay: 0.06, ease: EASE_OUT_EXPO }}
              className="min-w-0 rounded-[10px] sm:rounded-[12px] border p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-4 sm:gap-5 bg-[#FAF8F3] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034]"
            >
              <div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[8px] flex items-center justify-center mb-3 sm:mb-3.5 bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-bold-display text-base sm:text-lg lg:text-xl font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                  {t.products.docsTitle}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                  {t.products.docsBody}
                </p>
              </div>
              <div className="pt-1">
                <AppLink
                  to="/request-quotation"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[8px] bg-[#286631] hover:bg-[#1F5127] text-[#F4F1E8] dark:bg-[#7AB34C] dark:hover:bg-[#8AC25C] dark:text-[#121813] px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors w-full sm:w-auto"
                >
                  <span>{t.products.docsCta}</span>
                  <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                </AppLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
