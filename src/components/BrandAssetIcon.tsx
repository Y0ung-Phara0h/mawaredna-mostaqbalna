import { ASSETS } from '../config/siteConfig';

export type BrandIconKey =
  | 'iconCompostBag'
  | 'iconSoilLeaves'
  | 'iconSugarcaneStalk'
  | 'iconSproutBlades'
  | 'iconFieldRidges'
  | 'iconWaterDrop';

interface BrandAssetIconProps {
  iconKey: BrandIconKey;
  className?: string;
}

/**
 * Renders an official designer PNG botanical icon with calibrated light/dark visibility:
 * - In Light Mode: preserves authentic Deep Forest Green (#286631) crispness.
 * - In Dark Mode: lifts single-tone forest icons into luminous brand Leaf Green (#7AB34C)
 *   while preserving the cream leaves on iconSoilLeaves.
 */
export function BrandAssetIcon({ iconKey, className = 'w-7 h-7' }: BrandAssetIconProps) {
  const isTwoTone = iconKey === 'iconSoilLeaves';

  return (
    <img
      src={ASSETS[iconKey]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={`object-contain shrink-0 select-none transition-transform duration-300 ${
        isTwoTone
          ? 'dark:brightness-[1.32] dark:saturate-[1.1]'
          : 'dark:brightness-[2.1] dark:saturate-[1.05]'
      } ${className}`}
    />
  );
}
