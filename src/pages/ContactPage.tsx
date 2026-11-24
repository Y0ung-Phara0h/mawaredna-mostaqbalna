import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { ASSETS, getContactConfig, getSocialConfig } from '../config/siteConfig';
import { normalizeEgyptPhone, resolveLocationMapEmbed } from '../lib/contact';
import { AppLink, useApp } from '../context/AppContext';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

function FacebookGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.5-1.46h1.55V4.45c-.27-.04-1.19-.12-2.26-.12-2.24 0-3.77 1.37-3.77 3.88V10.5H8v3h2.52V21h2.98z" />
    </svg>
  );
}

export function ContactPage() {
  const { t, lang, isRtl } = useApp();
  const contact = getContactConfig();
  const social = getSocialConfig();
  const DirectionArrow = isRtl ? ArrowLeft : ArrowRight;

  const [mapLoaded, setMapLoaded] = useState(false);

  const formattedPhone = normalizeEgyptPhone(contact.phone);
  const formattedWhatsapp = normalizeEgyptPhone(contact.whatsapp);
  const locationMap = resolveLocationMapEmbed(contact.locationEmbedUrl, contact.location, lang);

  return (
    <div className="min-h-[75vh] bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8] transition-colors">
      {/* 1. Editorial Contact Hero Band */}
      <section className="relative overflow-hidden border-b border-[#D8D0BE] dark:border-[#2C352C] py-8 sm:py-12 md:py-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url(${ASSETS.patternOutline})`,
            backgroundSize: '340px auto',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="max-w-2xl"
          >
            <p className="text-[11px] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-2 text-[#286631] dark:text-[#7AB34C]">
              {t.contact.eyebrow}
            </p>
            <h1 className="font-bold-display text-[26px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold leading-[1.12] tracking-tight text-balance text-[#1F2720] dark:text-[#F4F1E8]">
              {t.contact.title}
            </h1>
            <p className="mt-2.5 sm:mt-3.5 text-[13.5px] sm:text-[15px] lg:text-base leading-[1.68] text-[#3D463C] dark:text-[#D4CEBE]">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0"
          >
            <AppLink
              to="/request-quotation"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#286631] hover:bg-[#1F5127] text-[#F4F1E8] dark:bg-[#7AB34C] dark:hover:bg-[#8AC25C] dark:text-[#121813] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5"
            >
              <span>{t.contact.ctaQuote}</span>
              <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            </AppLink>
            <AppLink
              to="/calculator"
              className="inline-flex items-center gap-2 rounded-[8px] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold border transition-all hover:-translate-y-0.5 border-[#C7BEA8] bg-[#FAF8F3] hover:bg-white text-[#1F2720] dark:border-[#3D463C] dark:bg-[#1A221B] dark:hover:bg-[#232F24] dark:hover:border-[#7AB34C]/55 dark:text-[#F4F1E8]"
            >
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>{t.contact.ctaCalc}</span>
            </AppLink>
          </motion.div>
        </div>
      </section>

      {/* 2. Redesigned 2-Column Hub: Direct Channels (with automatic +2) + Interactive Location Map Iframe */}
      <section className="py-8 sm:py-12 md:py-14 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Direct Channels Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            <div>
              <h2 className="font-bold-display text-lg sm:text-xl font-bold text-[#1F2720] dark:text-[#F4F1E8]">
                {t.contact.channelsHeading}
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5 flex-1">
              {/* Phone Channel (automatic +2 country code) */}
              <article className="group min-w-0 rounded-[10px] border p-3 sm:p-4 lg:p-5 flex flex-col justify-between gap-2.5 sm:gap-3 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C]/70 dark:bg-[#1A221B] dark:border-[#344034] dark:hover:bg-[#202B22] dark:hover:border-[#7AB34C]/55 transition-colors">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-2 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center shrink-0 bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 w-full flex-1">
                    <h3 className="font-bold-display text-[12px] sm:text-sm lg:text-[15px] font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                      {t.contact.phoneTitle}
                    </h3>
                    <div
                      dir="ltr"
                      className="mt-1 sm:mt-1.5 inline-flex items-center justify-center sm:justify-start gap-1 text-[11px] sm:text-xs lg:text-sm font-semibold tabular-nums text-[#2C352C] dark:text-[#E5DFD0]"
                    >
                      {formattedPhone ? (
                        <span className="whitespace-nowrap">{formattedPhone.display}</span>
                      ) : (
                        <>
                          <span className="px-1.5 py-0.5 rounded bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C] text-[10px] sm:text-[11px] font-bold">
                            +2
                          </span>
                          <span className="font-normal text-[10.5px] sm:text-xs text-[#525B51] dark:text-[#B6B1A4]">
                            {t.contact.phonePending}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5DFD0] dark:border-[#283329] flex justify-center sm:justify-end">
                  {formattedPhone ? (
                    <a
                      href={formattedPhone.telHref}
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.phoneAction}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <AppLink
                      to="/request-quotation"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.useQuoteForm}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </AppLink>
                  )}
                </div>
              </article>

              {/* WhatsApp Channel (automatic +2 country code) */}
              <article className="group min-w-0 rounded-[10px] border p-3 sm:p-4 lg:p-5 flex flex-col justify-between gap-2.5 sm:gap-3 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C]/70 dark:bg-[#1A221B] dark:border-[#344034] dark:hover:bg-[#202B22] dark:hover:border-[#7AB34C]/55 transition-colors">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-2 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center shrink-0 bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                    <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 w-full flex-1">
                    <h3 className="font-bold-display text-[12px] sm:text-sm lg:text-[15px] font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                      {t.contact.whatsappTitle}
                    </h3>
                    <div
                      dir="ltr"
                      className="mt-1 sm:mt-1.5 inline-flex items-center justify-center sm:justify-start gap-1 text-[11px] sm:text-xs lg:text-sm font-semibold tabular-nums text-[#2C352C] dark:text-[#E5DFD0]"
                    >
                      {formattedWhatsapp ? (
                        <span className="whitespace-nowrap">{formattedWhatsapp.display}</span>
                      ) : (
                        <>
                          <span className="px-1.5 py-0.5 rounded bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C] text-[10px] sm:text-[11px] font-bold">
                            +2
                          </span>
                          <span className="font-normal text-[10.5px] sm:text-xs text-[#525B51] dark:text-[#B6B1A4]">
                            {t.contact.whatsappPending}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5DFD0] dark:border-[#283329] flex justify-center sm:justify-end">
                  {formattedWhatsapp ? (
                    <a
                      href={formattedWhatsapp.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.whatsappAction}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <AppLink
                      to="/request-quotation"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.useQuoteForm}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </AppLink>
                  )}
                </div>
              </article>

              {/* Email Channel */}
              <article className="group min-w-0 rounded-[10px] border p-3 sm:p-4 lg:p-5 flex flex-col justify-between gap-2.5 sm:gap-3 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C]/70 dark:bg-[#1A221B] dark:border-[#344034] dark:hover:bg-[#202B22] dark:hover:border-[#7AB34C]/55 transition-colors">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-2 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center shrink-0 bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 w-full flex-1">
                    <h3 className="font-bold-display text-[12px] sm:text-sm lg:text-[15px] font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                      {t.contact.emailTitle}
                    </h3>
                    <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs lg:text-sm leading-snug break-words text-[#3D463C] dark:text-[#D4CEBE]">
                      {contact.email ? (
                        <span dir="ltr" className="inline-block max-w-full">
                          {contact.email.includes('@') ? (
                            <>
                              {contact.email.slice(0, contact.email.indexOf('@'))}
                              <wbr />
                              {contact.email.slice(contact.email.indexOf('@'))}
                            </>
                          ) : (
                            contact.email
                          )}
                        </span>
                      ) : (
                        t.contact.emailPending
                      )}
                    </p>
                  </div>
                </div>
                <div className="pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5DFD0] dark:border-[#283329] flex justify-center sm:justify-end">
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.emailAction}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <AppLink
                      to="/request-quotation"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.useQuoteForm}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </AppLink>
                  )}
                </div>
              </article>

              {/* Official Facebook Page Channel */}
              <article className="group min-w-0 rounded-[10px] border p-3 sm:p-4 lg:p-5 flex flex-col justify-between gap-2.5 sm:gap-3 bg-[#FAF8F3] border-[#D8D0BE] hover:border-[#7AB34C]/70 dark:bg-[#1A221B] dark:border-[#344034] dark:hover:bg-[#202B22] dark:hover:border-[#7AB34C]/55 transition-colors">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-2 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center shrink-0 bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                    <FacebookGlyph />
                  </div>
                  <div className="min-w-0 w-full flex-1">
                    <h3 className="font-bold-display text-[12px] sm:text-sm lg:text-[15px] font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                      {t.contact.facebookTitle}
                    </h3>
                    <p className="mt-1 sm:mt-1.5 text-[10.5px] sm:text-xs lg:text-sm leading-snug text-[#3D463C] dark:text-[#D4CEBE]">
                      {social.facebook
                        ? t.contact.facebookValueConfigured
                        : t.contact.facebookPending}
                    </p>
                  </div>
                </div>
                <div className="pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5DFD0] dark:border-[#283329] flex justify-center sm:justify-end">
                  {social.facebook ? (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.facebookAction}</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <AppLink
                      to="/request-quotation"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#286631] hover:underline underline-offset-4 dark:text-[#7AB34C]"
                    >
                      <span>{t.contact.useQuoteForm}</span>
                      <DirectionArrow className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
                    </AppLink>
                  )}
                </div>
              </article>
            </div>
          </motion.div>

          {/* Embedded Location Map Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="flex-1 rounded-[10px] sm:rounded-[12px] border overflow-hidden flex flex-col bg-[#FAF8F3] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034] shadow-sm">
              {/* Map Header Strip */}
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#D8D0BE] dark:border-[#2C352C] flex flex-wrap items-center justify-between gap-2 bg-[#EFECE3]/70 dark:bg-[#151C16]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[7px] flex items-center justify-center bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-bold-display text-sm sm:text-base font-bold text-[#1F2720] dark:text-[#F4F1E8]">
                      {t.contact.locationTitle}
                    </h2>
                    <p className="text-[11px] font-medium text-[#525B51] dark:text-[#9FA89D]">
                      {t.contact.locationBadge}
                    </p>
                  </div>
                </div>

                <a
                  href={locationMap.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[7px] px-3.5 py-1.5 text-[11.5px] sm:text-xs font-bold border transition-colors border-[#C7BEA8] bg-[#FAF8F3] hover:bg-white text-[#286631] dark:border-[#3D463C] dark:bg-[#1E2720] dark:hover:bg-[#273429] dark:text-[#7AB34C]"
                >
                  <span>{t.contact.mapOpenExternal}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              {/* Live Embedded Location Iframe with lightweight botanical skeleton loader */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[450px] bg-[#E9E3D4] dark:bg-[#141B15]">
                {!mapLoaded && (
                  <div
                    aria-hidden="true"
                    className="skeleton-botanical absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-11 h-11 rounded-[8px] flex items-center justify-center bg-[#FAF8F3]/80 dark:bg-[#1A221B]/80 border border-[#D8D0BE] dark:border-[#344034] text-[#286631] dark:text-[#7AB34C]">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <iframe
                  title={t.contact.mapIframeTitle}
                  src={locationMap.iframeSrc}
                  loading="lazy"
                  onLoad={() => setMapLoaded(true)}
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className={`w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[450px] border-0 block dark:brightness-[0.88] dark:contrast-[1.06] transition-opacity duration-300 ${
                    mapLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!locationMap.isConfigured && (
                  <div className="pointer-events-none absolute bottom-3 inset-x-3 sm:inset-x-4 z-20 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-[7px] px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold backdrop-blur-md bg-[#FAF8F3]/92 border border-[#D8D0BE] text-[#1F2720] dark:bg-[#121813]/90 dark:border-[#3D463C] dark:text-[#E9E3D4] shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#286631] dark:text-[#7AB34C]" aria-hidden="true" />
                      <span>{t.contact.mapPendingBadge}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Address Caption Footer inside Map Card */}
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#D8D0BE] dark:border-[#2C352C] bg-[#FAF8F3] dark:bg-[#1A221B] flex flex-wrap items-center justify-between gap-2">
                {contact.location && !/^https?:\/\//i.test(contact.location) ? (
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#3D463C] dark:text-[#D4CEBE]">
                    {contact.location}
                  </p>
                ) : locationMap.coordinatesLabel ? (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-[13px] text-[#3D463C] dark:text-[#D4CEBE]">
                    <span
                      dir="ltr"
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tabular-nums bg-[#E9E3D4] text-[#286631] dark:bg-[#233224] dark:text-[#7AB34C]"
                    >
                      {locationMap.coordinatesLabel}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#3D463C] dark:text-[#D4CEBE]">
                    {t.contact.locationPending}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. Commercial CTA Strip */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-7 sm:mt-10">
          <div className="rounded-[10px] sm:rounded-[12px] border p-5 sm:p-7 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 bg-[#E9E3D4] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034]">
            <div className="max-w-2xl">
              <h2 className="font-bold-display text-base sm:text-lg lg:text-xl font-bold text-[#1F2720] dark:text-[#F4F1E8]">
                {t.contact.commercialBannerTitle}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#3D463C] dark:text-[#D4CEBE]">
                {t.contact.commercialBannerDesc}
              </p>
            </div>

            <AppLink
              to="/request-quotation"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#286631] hover:bg-[#1F5127] text-[#F4F1E8] dark:bg-[#7AB34C] dark:hover:bg-[#8AC25C] dark:text-[#121813] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all hover:-translate-y-0.5"
            >
              <span>{t.contact.ctaQuote}</span>
              <DirectionArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            </AppLink>
          </div>
        </div>
      </section>
    </div>
  );
}
