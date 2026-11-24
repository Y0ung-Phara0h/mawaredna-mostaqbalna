import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialQuotationForm,
  submitQuotationRequest,
  validateQuotationForm,
} from './quotation';

test('validates required shared fields and request-type conditional fields', () => {
  const base = createInitialQuotationForm();
  const emptyErrors = validateQuotationForm(base);
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.location);

  const validStandard = {
    ...base,
    requestType: 'Standard' as const,
    fullName: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+20 100 123 4567',
    location: 'Minya',
  };
  assert.deepEqual(validateQuotationForm(validStandard), {});

  const invalidBulk = { ...validStandard, requestType: 'Bulk' as const, bulkVolume: '' };
  assert.ok(validateQuotationForm(invalidBulk).bulkVolume);

  const invalidCustom = {
    ...validStandard,
    requestType: 'Customized' as const,
    customSpecification: '',
  };
  assert.ok(validateQuotationForm(invalidCustom).customSpecification);
});

test('never reports fake success when Apps Script endpoint is unconfigured or unconfirmed', async () => {
  const form = createInitialQuotationForm();
  const payload = { submittedAt: new Date().toISOString(), form, calculatorSummary: null };

  const unconfigured = await submitQuotationRequest(payload, '');
  assert.equal(unconfigured.ok, false);
  if (!unconfigured.ok) {
    assert.equal(unconfigured.reason, 'unconfigured');
  }

  const unconfirmedFetch = (async () =>
    ({
      ok: true,
      status: 200,
      json: async () => ({ status: 'pending' }),
    }) as Response) as typeof fetch;

  const rejected = await submitQuotationRequest(
    payload,
    'https://script.google.com/macros/s/test/exec',
    unconfirmedFetch
  );
  assert.equal(rejected.ok, false);
  if (!rejected.ok) {
    assert.equal(rejected.reason, 'rejected');
  }
});

test('confirms success only when endpoint responds HTTP 200 with positive confirmation', async () => {
  const form = createInitialQuotationForm();
  const payload = { submittedAt: new Date().toISOString(), form, calculatorSummary: null };

  const confirmedFetch = (async () =>
    ({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, referenceId: 'MM-2025-001' }),
    }) as Response) as typeof fetch;

  const result = await submitQuotationRequest(
    payload,
    'https://script.google.com/macros/s/test/exec',
    confirmedFetch
  );
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.referenceId, 'MM-2025-001');
  }
});
