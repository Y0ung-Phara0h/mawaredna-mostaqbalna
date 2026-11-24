export type CropTypeId =
  | 'field_crops'
  | 'vegetables'
  | 'orchards'
  | 'sugarcane'
  | 'date_palms'
  | 'protected_agriculture'
  | 'newly_reclaimed';

export type SoilTypeId = 'sandy' | 'loamy' | 'clay' | 'calcareous' | 'saline';

export const CROP_TYPE_IDS: readonly CropTypeId[] = [
  'field_crops',
  'vegetables',
  'orchards',
  'sugarcane',
  'date_palms',
  'protected_agriculture',
  'newly_reclaimed',
] as const;

export const SOIL_TYPE_IDS: readonly SoilTypeId[] = [
  'sandy',
  'loamy',
  'clay',
  'calcareous',
  'saline',
] as const;

export const FEDDAN_TO_SQM = 4200;

export interface CropRateRange {
  minTonsPerFeddan: number;
  maxTonsPerFeddan: number;
}

export interface CalculatorConfig {
  /** Verified lab bulk density lower bound in metric tons per cubic meter (default: 0.50 t/m³ = 500 kg/m³). */
  minBulkDensityTonsPerM3: number;
  /** Verified lab bulk density upper bound in metric tons per cubic meter (default: 0.55 t/m³ = 550 kg/m³). */
  maxBulkDensityTonsPerM3: number;
  /** Baseline min–max application rates in metric tons per Feddan by crop type. */
  cropRates: Record<CropTypeId, CropRateRange>;
  /** Agronomic adjustment multipliers by soil type. */
  soilMultipliers: Record<SoilTypeId, number>;
}

/**
 * Default agronomic parameters grounded in the company's verified lab bulk density
 * (500–550 kg/m³ = 0.50–0.55 t/m³) and standard Egyptian agricultural compost guidance.
 * Any value can be overridden via VITE_COMPOST_* environment variables.
 */
export const DEFAULT_CALCULATOR_CONFIG: CalculatorConfig = {
  minBulkDensityTonsPerM3: 0.5,
  maxBulkDensityTonsPerM3: 0.55,
  cropRates: {
    field_crops: { minTonsPerFeddan: 6, maxTonsPerFeddan: 8 },
    vegetables: { minTonsPerFeddan: 8, maxTonsPerFeddan: 12 },
    orchards: { minTonsPerFeddan: 10, maxTonsPerFeddan: 14 },
    sugarcane: { minTonsPerFeddan: 10, maxTonsPerFeddan: 15 },
    date_palms: { minTonsPerFeddan: 8, maxTonsPerFeddan: 12 },
    protected_agriculture: { minTonsPerFeddan: 12, maxTonsPerFeddan: 16 },
    newly_reclaimed: { minTonsPerFeddan: 12, maxTonsPerFeddan: 18 },
  },
  soilMultipliers: {
    sandy: 1.2,
    loamy: 1.0,
    clay: 1.05,
    calcareous: 1.15,
    saline: 1.25,
  },
};

export interface CalculatorInput {
  areaFeddan: string;
  cropType: CropTypeId;
  soilType: SoilTypeId;
}

export interface CalculatorEstimate {
  areaFeddan: number;
  areaSqm: number;
  cropType: CropTypeId;
  soilType: SoilTypeId;
  rateMinTonsPerFeddan: number;
  rateMaxTonsPerFeddan: number;
  rateMinCubicMetersPerFeddan: number;
  rateMaxCubicMetersPerFeddan: number;
  estimatedMinTons: number;
  estimatedMaxTons: number;
  estimatedMinCubicMeters: number;
  estimatedMaxCubicMeters: number;
}

export type CalculatorEvaluation =
  | {
      status: 'invalid';
      errors: Partial<Record<'areaFeddan' | 'cropType' | 'soilType', string>>;
    }
  | {
      status: 'ready';
      estimate: CalculatorEstimate;
    };

export interface CalculatorTransferPayload {
  areaFeddan: string;
  cropType: CropTypeId;
  cropLabel: string;
  soilType: SoilTypeId;
  soilLabel: string;
  rateMinTonsPerFeddan: number | null;
  rateMaxTonsPerFeddan: number | null;
  rateMinCubicMetersPerFeddan: number | null;
  rateMaxCubicMetersPerFeddan: number | null;
  estimatedMinTons: number | null;
  estimatedMaxTons: number | null;
  estimatedMinCubicMeters: number | null;
  estimatedMaxCubicMeters: number | null;
}

function parsePositiveNumber(raw: string | undefined): number | null {
  if (!raw || raw.trim() === '') return null;
  const parsed = Number(raw.trim());
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

export function loadCalculatorConfigFromEnv(
  env: Record<string, string | undefined>
): CalculatorConfig {
  const minD =
    parsePositiveNumber(env.VITE_COMPOST_BULK_DENSITY_MIN_TONS_PER_M3) ??
    DEFAULT_CALCULATOR_CONFIG.minBulkDensityTonsPerM3;
  const maxD =
    parsePositiveNumber(env.VITE_COMPOST_BULK_DENSITY_MAX_TONS_PER_M3) ??
    DEFAULT_CALCULATOR_CONFIG.maxBulkDensityTonsPerM3;

  const minBulkDensityTonsPerM3 = Math.min(minD, maxD);
  const maxBulkDensityTonsPerM3 = Math.max(minD, maxD);

  const cropRates: Record<CropTypeId, CropRateRange> = {
    ...DEFAULT_CALCULATOR_CONFIG.cropRates,
  };
  if (env.VITE_COMPOST_CROP_RATES_JSON?.trim()) {
    try {
      const parsed = JSON.parse(env.VITE_COMPOST_CROP_RATES_JSON) as Record<string, unknown>;
      for (const id of CROP_TYPE_IDS) {
        const entry = parsed?.[id] as Record<string, unknown> | undefined;
        if (
          entry &&
          typeof entry.minTonsPerFeddan === 'number' &&
          typeof entry.maxTonsPerFeddan === 'number' &&
          entry.minTonsPerFeddan > 0 &&
          entry.maxTonsPerFeddan >= entry.minTonsPerFeddan
        ) {
          cropRates[id] = {
            minTonsPerFeddan: entry.minTonsPerFeddan,
            maxTonsPerFeddan: entry.maxTonsPerFeddan,
          };
        }
      }
    } catch {
      // Fall back to default rates if override JSON is malformed
    }
  }

  const soilMultipliers: Record<SoilTypeId, number> = {
    ...DEFAULT_CALCULATOR_CONFIG.soilMultipliers,
  };
  if (env.VITE_COMPOST_SOIL_MULTIPLIERS_JSON?.trim()) {
    try {
      const parsed = JSON.parse(env.VITE_COMPOST_SOIL_MULTIPLIERS_JSON) as Record<string, unknown>;
      for (const id of SOIL_TYPE_IDS) {
        const val = parsed?.[id];
        if (typeof val === 'number' && Number.isFinite(val) && val > 0) {
          soilMultipliers[id] = val;
        }
      }
    } catch {
      // Fall back to default multipliers if override JSON is malformed
    }
  }

  return {
    minBulkDensityTonsPerM3,
    maxBulkDensityTonsPerM3,
    cropRates,
    soilMultipliers,
  };
}

export function getRuntimeCalculatorConfig(): CalculatorConfig {
  try {
    const metaEnv =
      (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
    return loadCalculatorConfigFromEnv(metaEnv);
  } catch {
    return DEFAULT_CALCULATOR_CONFIG;
  }
}

export function roundToOne(value: number): number {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

/**
 * Computes per-Feddan min–max tons & equivalent m³ rates for the selected crop + soil combination.
 */
export function getPerFeddanRateRange(
  cropType: CropTypeId,
  soilType: SoilTypeId,
  config: CalculatorConfig = DEFAULT_CALCULATOR_CONFIG
) {
  const base = config.cropRates[cropType] ?? DEFAULT_CALCULATOR_CONFIG.cropRates.field_crops;
  const multiplier = config.soilMultipliers[soilType] ?? 1;

  const rateMinTonsPerFeddan = base.minTonsPerFeddan * multiplier;
  const rateMaxTonsPerFeddan = base.maxTonsPerFeddan * multiplier;

  // Lower volume bound uses max density (0.55 t/m³); upper volume bound uses min density (0.50 t/m³)
  const rateMinCubicMetersPerFeddan = rateMinTonsPerFeddan / config.maxBulkDensityTonsPerM3;
  const rateMaxCubicMetersPerFeddan = rateMaxTonsPerFeddan / config.minBulkDensityTonsPerM3;

  return {
    rateMinTonsPerFeddan: roundToOne(rateMinTonsPerFeddan),
    rateMaxTonsPerFeddan: roundToOne(rateMaxTonsPerFeddan),
    rateMinCubicMetersPerFeddan: roundToOne(rateMinCubicMetersPerFeddan),
    rateMaxCubicMetersPerFeddan: roundToOne(rateMaxCubicMetersPerFeddan),
  };
}

export function evaluateCompostEstimate(
  input: CalculatorInput,
  config: CalculatorConfig = DEFAULT_CALCULATOR_CONFIG
): CalculatorEvaluation {
  const errors: Partial<Record<'areaFeddan' | 'cropType' | 'soilType', string>> = {};
  const trimmedArea = input.areaFeddan.trim();
  const parsedArea = Number(trimmedArea);

  if (trimmedArea === '' || !Number.isFinite(parsedArea) || parsedArea <= 0) {
    errors.areaFeddan = 'Please enter a valid positive farm area in Feddan.';
  }

  if (!CROP_TYPE_IDS.includes(input.cropType)) {
    errors.cropType = 'Please select a valid crop type.';
  }

  if (!SOIL_TYPE_IDS.includes(input.soilType)) {
    errors.soilType = 'Please select a valid soil type.';
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', errors };
  }

  const base = config.cropRates[input.cropType];
  const multiplier = config.soilMultipliers[input.soilType];

  const rateMinTons = base.minTonsPerFeddan * multiplier;
  const rateMaxTons = base.maxTonsPerFeddan * multiplier;
  const rateMinM3 = rateMinTons / config.maxBulkDensityTonsPerM3;
  const rateMaxM3 = rateMaxTons / config.minBulkDensityTonsPerM3;

  const areaSqm = parsedArea * FEDDAN_TO_SQM;
  const totalMinTons = parsedArea * rateMinTons;
  const totalMaxTons = parsedArea * rateMaxTons;
  const totalMinM3 = parsedArea * rateMinM3;
  const totalMaxM3 = parsedArea * rateMaxM3;

  return {
    status: 'ready',
    estimate: {
      areaFeddan: parsedArea,
      areaSqm: Math.round(areaSqm),
      cropType: input.cropType,
      soilType: input.soilType,
      rateMinTonsPerFeddan: roundToOne(rateMinTons),
      rateMaxTonsPerFeddan: roundToOne(rateMaxTons),
      rateMinCubicMetersPerFeddan: roundToOne(rateMinM3),
      rateMaxCubicMetersPerFeddan: roundToOne(rateMaxM3),
      estimatedMinTons: roundToOne(totalMinTons),
      estimatedMaxTons: roundToOne(totalMaxTons),
      estimatedMinCubicMeters: roundToOne(totalMinM3),
      estimatedMaxCubicMeters: roundToOne(totalMaxM3),
    },
  };
}

export function formatEstimateNumber(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '0';
  const hasDecimal = Math.abs(value - Math.round(value)) > 0.01;
  return value.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimal ? 1 : 0,
    maximumFractionDigits: 1,
  });
}

export function formatEstimateRange(min: number | null, max: number | null): string {
  if (min === null || max === null) return '0';
  return `${formatEstimateNumber(min)} – ${formatEstimateNumber(max)}`;
}
