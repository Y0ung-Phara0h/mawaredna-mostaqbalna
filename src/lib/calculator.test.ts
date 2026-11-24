import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_CALCULATOR_CONFIG,
  evaluateCompostEstimate,
  formatEstimateRange,
  getPerFeddanRateRange,
  loadCalculatorConfigFromEnv,
} from './calculator';

test('computes deterministic min-max metric tons and equivalent m³ for Feddan + crop + soil', () => {
  // 25 Feddan of Field Crops (6-8 t/feddan) on Loamy soil (1.0x) with 0.50-0.55 t/m³ density
  const res = evaluateCompostEstimate(
    { areaFeddan: '25', cropType: 'field_crops', soilType: 'loamy' },
    DEFAULT_CALCULATOR_CONFIG
  );
  assert.equal(res.status, 'ready');
  if (res.status === 'ready') {
    assert.equal(res.estimate.areaFeddan, 25);
    assert.equal(res.estimate.areaSqm, 105000);
    assert.equal(res.estimate.rateMinTonsPerFeddan, 6);
    assert.equal(res.estimate.rateMaxTonsPerFeddan, 8);
    assert.equal(res.estimate.rateMinCubicMetersPerFeddan, 10.9);
    assert.equal(res.estimate.rateMaxCubicMetersPerFeddan, 16);
    assert.equal(res.estimate.estimatedMinTons, 150);
    assert.equal(res.estimate.estimatedMaxTons, 200);
    assert.equal(res.estimate.estimatedMinCubicMeters, 272.7);
    assert.equal(res.estimate.estimatedMaxCubicMeters, 400);
  }
});

test('applies soil type multiplier accurately (e.g. Sandy 1.2x on Sugarcane)', () => {
  const perFeddan = getPerFeddanRateRange('sugarcane', 'sandy', DEFAULT_CALCULATOR_CONFIG);
  assert.equal(perFeddan.rateMinTonsPerFeddan, 12); // 10 * 1.2
  assert.equal(perFeddan.rateMaxTonsPerFeddan, 18); // 15 * 1.2
  assert.equal(perFeddan.rateMinCubicMetersPerFeddan, 21.8); // 12 / 0.55
  assert.equal(perFeddan.rateMaxCubicMetersPerFeddan, 36); // 18 / 0.50
});

test('validates non-positive or empty Feddan inputs cleanly', () => {
  const emptyRes = evaluateCompostEstimate({
    areaFeddan: '',
    cropType: 'vegetables',
    soilType: 'clay',
  });
  assert.equal(emptyRes.status, 'invalid');
  if (emptyRes.status === 'invalid') {
    assert.ok(emptyRes.errors.areaFeddan);
  }

  const zeroRes = evaluateCompostEstimate({
    areaFeddan: '0',
    cropType: 'vegetables',
    soilType: 'clay',
  });
  assert.equal(zeroRes.status, 'invalid');
});

test('supports environment overrides and safely ignores malformed JSON or invalid densities', () => {
  const custom = loadCalculatorConfigFromEnv({
    VITE_COMPOST_BULK_DENSITY_MIN_TONS_PER_M3: '0.52',
    VITE_COMPOST_BULK_DENSITY_MAX_TONS_PER_M3: '0.56',
    VITE_COMPOST_CROP_RATES_JSON: JSON.stringify({
      field_crops: { minTonsPerFeddan: 7, maxTonsPerFeddan: 9 },
    }),
    VITE_COMPOST_SOIL_MULTIPLIERS_JSON: 'not-json',
  });
  assert.equal(custom.minBulkDensityTonsPerM3, 0.52);
  assert.equal(custom.maxBulkDensityTonsPerM3, 0.56);
  assert.equal(custom.cropRates.field_crops.minTonsPerFeddan, 7);
  assert.equal(custom.soilMultipliers.sandy, DEFAULT_CALCULATOR_CONFIG.soilMultipliers.sandy);
  assert.equal(formatEstimateRange(150, 200), '150 – 200');
});
