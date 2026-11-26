export const CROP_TYPE_IDS = [
  'field_crops',
  'vegetables',
  'orchards',
  'sugarcane',
  'date_palms',
  'protected_agriculture',
  'newly_reclaimed',
];

export const SOIL_TYPE_IDS = ['sandy', 'loamy', 'clay', 'calcareous', 'saline'];

export const FEDDAN_TO_SQM = 4200;

export const CROP_LABELS = {
  field_crops: 'المحاصيل الحقلية',
  vegetables: 'الخضروات',
  orchards: 'البساتين وأشجار الفاكهة',
  sugarcane: 'قصب السكر',
  date_palms: 'النخيل',
  protected_agriculture: 'الزراعات المحمية (الصوب)',
  newly_reclaimed: 'الأراضي المستصلحة حديثاً',
};

export const SOIL_LABELS = {
  sandy: 'رملية',
  loamy: 'طميية (صفراء)',
  clay: 'طينية',
  calcareous: 'جيرية',
  saline: 'ملحية',
};

export const AREA_CONVERSIONS = [
  { unit: 'الفدان', value: '4,200 م² (24 قيراط)' },
  { unit: 'القيراط', value: '175 م²' },
  { unit: 'الهكتار', value: '10,000 م² (≈ 2.38 فدان)' },
  { unit: 'المتر المربع', value: '1 م²' },
];

export const CALCULATOR_STEPS = [
  {
    num: '1',
    title: 'أدخل المساحة بالفدان',
    desc: 'حدد مساحة المزرعة بالفدان مع دليل التحويل الفوري للقيراط والهكتار والمتر المربع.',
  },
  {
    num: '2',
    title: 'اختر المحصول والتربة',
    desc: 'حدد نوع المحصول وطبيعة التربة لتعديل معدل الإضافة للفدان تلقائياً.',
  },
  {
    num: '3',
    title: 'راجع النطاق وتابع الطلب',
    desc: 'اعرض الحد الأدنى والأقصى بالطن والمتر المكعب ثم انتقل لطلب عرض السعر.',
  },
];

/**
 * Default agronomic parameters grounded in the company's verified lab bulk density
 * (500–550 kg/m³ = 0.50–0.55 t/m³) and standard Egyptian agricultural compost guidance.
 * Any value can be overridden via VITE_COMPOST_* environment variables.
 */
export const DEFAULT_CALCULATOR_CONFIG = {
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

function parsePositiveNumber(raw) {
  if (!raw || String(raw).trim() === '') return null;
  const parsed = Number(String(raw).trim());
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

export function loadCalculatorConfigFromEnv(env = {}) {
  const minD =
    parsePositiveNumber(env.VITE_COMPOST_BULK_DENSITY_MIN_TONS_PER_M3) ??
    DEFAULT_CALCULATOR_CONFIG.minBulkDensityTonsPerM3;
  const maxD =
    parsePositiveNumber(env.VITE_COMPOST_BULK_DENSITY_MAX_TONS_PER_M3) ??
    DEFAULT_CALCULATOR_CONFIG.maxBulkDensityTonsPerM3;

  const minBulkDensityTonsPerM3 = Math.min(minD, maxD);
  const maxBulkDensityTonsPerM3 = Math.max(minD, maxD);

  const cropRates = { ...DEFAULT_CALCULATOR_CONFIG.cropRates };
  if (env.VITE_COMPOST_CROP_RATES_JSON?.trim()) {
    try {
      const parsed = JSON.parse(env.VITE_COMPOST_CROP_RATES_JSON);
      for (const id of CROP_TYPE_IDS) {
        const entry = parsed?.[id];
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

  const soilMultipliers = { ...DEFAULT_CALCULATOR_CONFIG.soilMultipliers };
  if (env.VITE_COMPOST_SOIL_MULTIPLIERS_JSON?.trim()) {
    try {
      const parsed = JSON.parse(env.VITE_COMPOST_SOIL_MULTIPLIERS_JSON);
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

export function getRuntimeCalculatorConfig() {
  try {
    const metaEnv = import.meta?.env ?? {};
    return loadCalculatorConfigFromEnv(metaEnv);
  } catch {
    return DEFAULT_CALCULATOR_CONFIG;
  }
}

export function roundToOne(value) {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

/**
 * Computes per-Feddan min–max tons & equivalent m³ rates for the selected crop + soil combination.
 */
export function getPerFeddanRateRange(
  cropType,
  soilType,
  config = DEFAULT_CALCULATOR_CONFIG
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

export function evaluateCompostEstimate(input, config = DEFAULT_CALCULATOR_CONFIG) {
  const errors = {};
  const trimmedArea = String(input.areaFeddan ?? '').trim();
  const parsedArea = Number(trimmedArea);

  if (trimmedArea === '' || !Number.isFinite(parsedArea) || parsedArea <= 0) {
    errors.areaFeddan = 'يرجى إدخال مساحة صالحة بالفدان أكبر من الصفر.';
  }

  if (!CROP_TYPE_IDS.includes(input.cropType)) {
    errors.cropType = 'يرجى اختيار نوع محصول صالح.';
  }

  if (!SOIL_TYPE_IDS.includes(input.soilType)) {
    errors.soilType = 'يرجى اختيار نوع تربة صالح.';
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

export function formatEstimateNumber(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '0';
  const hasDecimal = Math.abs(value - Math.round(value)) > 0.01;
  return value.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimal ? 1 : 0,
    maximumFractionDigits: 1,
  });
}

export function formatEstimateRange(min, max) {
  if (min === null || min === undefined || max === null || max === undefined) return '0';
  return `${formatEstimateNumber(min)} – ${formatEstimateNumber(max)}`;
}
