import type { Language } from '../config/siteConfig';

export interface FormattedEgyptPhone {
  /** Human-readable phone formatted with automatic +2 country code (LTR). */
  display: string;
  /** Valid tel: href with E.164 +2 prefix. */
  telHref: string;
  /** Valid WhatsApp wa.me href with digits-only 2 prefix. */
  whatsappHref: string;
}

/**
 * Strips leading Egypt country code variations (+2, +20, 002, 0020, 20)
 * and returns the local Egyptian subscriber number (e.g., 01012345678 or 0223456789).
 */
export function extractLocalEgyptDigits(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const hasPlus = trimmed.startsWith('+');
  let digits = trimmed.replace(/[^\d]/g, '');
  if (!digits) return '';

  if (digits.startsWith('0020')) {
    digits = '0' + digits.slice(4);
  } else if (digits.startsWith('002')) {
    digits = digits.slice(3);
  } else if (hasPlus && digits.startsWith('20')) {
    digits = '0' + digits.slice(2);
  } else if (hasPlus && digits.startsWith('2')) {
    digits = digits.slice(1);
  } else if (!hasPlus && digits.startsWith('20') && digits.length >= 11) {
    digits = '0' + digits.slice(2);
  }

  // Egyptian mobile numbers entered without leading 0 (e.g., 1012345678 -> 01012345678)
  if (/^(10|11|12|15)\d{8}$/.test(digits)) {
    digits = '0' + digits;
  }

  return digits;
}

/**
 * Formats any Egyptian phone number with the automatic (+2) country code prefix.
 * Never duplicates +2 if already present.
 */
export function normalizeEgyptPhone(raw: string): FormattedEgyptPhone | null {
  const local = extractLocalEgyptDigits(raw);
  if (!local) return null;

  // Format 11-digit Egyptian mobile numbers cleanly: +2 010 1234 5678
  let formattedLocal = local;
  if (/^01[0125]\d{8}$/.test(local)) {
    formattedLocal = `${local.slice(0, 3)} ${local.slice(3, 7)} ${local.slice(7)}`;
  }

  const internationalDigits = local.startsWith('0') ? `2${local}` : `20${local}`;
  const display = `+2 ${formattedLocal}`;

  return {
    display,
    telHref: `tel:+${internationalDigits}`,
    whatsappHref: `https://wa.me/${internationalDigits}`,
  };
}

/**
 * Strips any leading +2 / +20 / 002 prefix for controlled phone inputs that render a fixed "+2" prefix badge.
 */
export function stripEgyptPrefixForInput(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('+20')) return '0' + trimmed.slice(3).trimStart();
  if (trimmed.startsWith('+2')) return trimmed.slice(2).trimStart();
  if (trimmed.startsWith('0020')) return '0' + trimmed.slice(4).trimStart();
  if (trimmed.startsWith('002')) return trimmed.slice(3).trimStart();
  return raw;
}

/**
 * Combines a local input value with the automatic "+2" country code prefix.
 */
export function withEgyptCountryCode(localInput: string): string {
  const cleanedLocal = stripEgyptPrefixForInput(localInput).trim();
  if (!cleanedLocal) return '';
  return `+2 ${cleanedLocal}`;
}

export interface LocationMapEmbed {
  iframeSrc: string;
  externalUrl: string;
  coordinatesLabel: string | null;
  isConfigured: boolean;
}

/**
 * Verified coordinates resolved from the company's official Google Maps share link
 * (https://maps.app.goo.gl/f3DpR86TeAdW5yd89 -> 25.917128, 32.758254).
 */
const KNOWN_SHORTLINK_COORDS: Record<string, string> = {
  'https://maps.app.goo.gl/f3DpR86TeAdW5yd89': '25.917128,32.758254',
};

/**
 * Resolves a safe, embeddable Google Maps iframe URL from either a direct embed URL,
 * a shared Google Maps URL (including /maps/search/lat,lng or known shortlink), coordinates, or an address.
 */
export function resolveLocationMapEmbed(
  embedUrl: string,
  locationText: string,
  lang: Language
): LocationMapEmbed {
  const cleanEmbed = embedUrl.trim();
  const cleanLocation = locationText.trim();
  const hl = lang === 'ar' ? 'ar' : 'en';

  // 1. Direct Google Maps embed iframe URL
  if (cleanEmbed && (/\/maps\/embed/i.test(cleanEmbed) || /output=embed/i.test(cleanEmbed))) {
    const fallbackExternal = cleanLocation
      ? /^https?:\/\//i.test(cleanLocation)
        ? cleanLocation
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanLocation)}`
      : cleanEmbed.replace(/\/maps\/embed/i, '/maps');
    return {
      iframeSrc: cleanEmbed,
      externalUrl: fallbackExternal,
      coordinatesLabel: null,
      isConfigured: true,
    };
  }

  // 2. Extract coordinates or query from any provided Google Maps URL or text
  const source = cleanEmbed || cleanLocation;
  if (source) {
    // Match verified company shortlink
    const normalizedShortlink = source.replace(/\/+$/, '');
    const knownCoords = KNOWN_SHORTLINK_COORDS[normalizedShortlink];
    if (knownCoords) {
      const [lat, lng] = knownCoords.split(',');
      return {
        iframeSrc: `https://maps.google.com/maps?q=${encodeURIComponent(knownCoords)}&z=15&hl=${hl}&output=embed`,
        externalUrl: source,
        coordinatesLabel: `${lat}, ${lng}`,
        isConfigured: true,
      };
    }

    // Match @lat,lng or /maps/search/lat,+lng from Google Maps URLs
    const coordsMatch =
      source.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/) ||
      source.match(/\/maps\/search\/(-?\d+(?:\.\d+)?),\+?(-?\d+(?:\.\d+)?)/i);
    if (coordsMatch) {
      const coords = `${coordsMatch[1]},${coordsMatch[2]}`;
      return {
        iframeSrc: `https://maps.google.com/maps?q=${encodeURIComponent(coords)}&z=15&hl=${hl}&output=embed`,
        externalUrl: /^https?:\/\//i.test(source)
          ? source
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coords)}`,
        coordinatesLabel: `${coordsMatch[1]}, ${coordsMatch[2]}`,
        isConfigured: true,
      };
    }

    // Match ?q=... or &query=...
    const queryParam = source.match(/[?&](?:q|query)=([^&]+)/i);
    if (queryParam) {
      const decoded = decodeURIComponent(queryParam[1].replace(/\+/g, ' '));
      return {
        iframeSrc: `https://maps.google.com/maps?q=${encodeURIComponent(decoded)}&z=14&hl=${hl}&output=embed`,
        externalUrl: /^https?:\/\//i.test(source)
          ? source
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(decoded)}`,
        coordinatesLabel: null,
        isConfigured: true,
      };
    }

    // Plain address or raw lat,lng text
    if (!/^https?:\/\//i.test(source)) {
      return {
        iframeSrc: `https://maps.google.com/maps?q=${encodeURIComponent(source)}&z=14&hl=${hl}&output=embed`,
        externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(source)}`,
        coordinatesLabel: null,
        isConfigured: true,
      };
    }

    // Fallback for any other shortened link when human-readable location text is also supplied
    if (cleanLocation && !/^https?:\/\//i.test(cleanLocation)) {
      return {
        iframeSrc: `https://maps.google.com/maps?q=${encodeURIComponent(cleanLocation)}&z=14&hl=${hl}&output=embed`,
        externalUrl: source,
        coordinatesLabel: null,
        isConfigured: true,
      };
    }

    return {
      iframeSrc: `https://maps.google.com/maps?q=Egypt&z=6&hl=${hl}&output=embed`,
      externalUrl: source,
      coordinatesLabel: null,
      isConfigured: true,
    };
  }

  // 3. Default regional overview embed (Egypt) when no location env var is set yet
  return {
    iframeSrc: `https://maps.google.com/maps?q=Egypt&z=6&hl=${hl}&output=embed`,
    externalUrl: 'https://www.google.com/maps/place/Egypt',
    coordinatesLabel: null,
    isConfigured: false,
  };
}
