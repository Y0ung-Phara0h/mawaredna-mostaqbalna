export type HeaderScrollMode = 'top' | 'hidden' | 'floating';

export interface HeaderScrollInput {
  scrollY: number;
  lastScrollY: number;
  previousMode: HeaderScrollMode;
  mobileMenuOpen: boolean;
}

const TOP_THRESHOLD = 28;
const HIDE_THRESHOLD = 90;
const SCROLL_DELTA_DEADZONE = 6;

export function computeHeaderScrollState({
  scrollY,
  lastScrollY,
  previousMode,
  mobileMenuOpen,
}: HeaderScrollInput): HeaderScrollMode {
  const safeY = Math.max(0, scrollY);

  if (safeY <= TOP_THRESHOLD) {
    return 'top';
  }

  if (mobileMenuOpen) {
    return 'floating';
  }

  const delta = safeY - lastScrollY;
  if (Math.abs(delta) < SCROLL_DELTA_DEADZONE) {
    return previousMode === 'top' ? 'floating' : previousMode;
  }

  if (delta > 0 && safeY > HIDE_THRESHOLD) {
    return 'hidden';
  }

  if (delta < 0) {
    return 'floating';
  }

  return previousMode === 'top' ? 'floating' : previousMode;
}
