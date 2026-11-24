export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';

export type RoutePath =
  | '/'
  | '/about'
  | '/products'
  | '/calculator'
  | '/request-quotation'
  | '/contact';

export const PUBLIC_ROUTES: readonly RoutePath[] = [
  '/',
  '/about',
  '/products',
  '/calculator',
  '/request-quotation',
  '/contact',
] as const;

export const ASSETS = {
  sugarcaneFieldMountains: '/assets/optimized/sugarcane-field-mountains.webp',
  tilledSoilSunrise: '/assets/optimized/tilled-soil-sunrise.webp',
  sugarcaneStalks: '/assets/optimized/sugarcane-stalks.webp',
  heroCircularTransformation: '/assets/optimized/hero-circular.webp',
  compostMoundClean: '/assets/optimized/compost-mound-clean.webp',
  compostHandsSprout: '/assets/optimized/compost-hands-sprout.webp',
  // Official Designer Brand Mark, Botanical Icons & Sugarcane Patterns (WebP compressed)
  brandIcon: '/assets/optimized/logo-icon.webp',
  iconCompostBag: '/assets/optimized/icon-compost-bag.webp',
  iconSoilLeaves: '/assets/optimized/icon-soil-leaves.webp',
  iconSugarcaneStalk: '/assets/optimized/icon-sugarcane-stalk.webp',
  iconSproutBlades: '/assets/optimized/icon-sprout-blades.webp',
  iconFieldRidges: '/assets/optimized/icon-field-ridges.webp',
  iconWaterDrop: '/assets/optimized/icon-water-drop.webp',
  patternOutline: '/assets/optimized/pattern-outline.webp',
  patternSolid: '/assets/optimized/pattern-solid.webp',
} as const;

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  locationEmbedUrl: string;
}

export interface SocialConfig {
  facebook: string;
}

function readEnv(key: string): string {
  try {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
    return (metaEnv?.[key] ?? '').trim();
  } catch {
    return '';
  }
}

export function getContactConfig(): ContactConfig {
  return {
    phone: readEnv('VITE_CONTACT_PHONE'),
    whatsapp: readEnv('VITE_CONTACT_WHATSAPP'),
    email: readEnv('VITE_CONTACT_EMAIL'),
    location: readEnv('VITE_CONTACT_LOCATION'),
    locationEmbedUrl: readEnv('VITE_CONTACT_LOCATION_EMBED_URL'),
  };
}

export function getSocialConfig(): SocialConfig {
  return {
    facebook: readEnv('VITE_SOCIAL_FACEBOOK'),
  };
}

export function getQuotationEndpoint(): string {
  return readEnv('VITE_QUOTATION_ENDPOINT');
}
