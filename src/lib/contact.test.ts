import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeEgyptPhone,
  resolveLocationMapEmbed,
  stripEgyptPrefixForInput,
  withEgyptCountryCode,
} from './contact';

test('normalizes Egyptian mobile and landline numbers with automatic +2 prefix without duplication', () => {
  const fromLocal = normalizeEgyptPhone('01012345678');
  assert.ok(fromLocal);
  assert.equal(fromLocal.display, '+2 010 1234 5678');
  assert.equal(fromLocal.telHref, 'tel:+201012345678');
  assert.equal(fromLocal.whatsappHref, 'https://wa.me/201012345678');

  const fromAlreadyPrefixed = normalizeEgyptPhone('+2 010 1234 5678');
  assert.deepEqual(fromAlreadyPrefixed, fromLocal);

  const fromPlus20 = normalizeEgyptPhone('+201012345678');
  assert.deepEqual(fromPlus20, fromLocal);

  const from0020 = normalizeEgyptPhone('00201012345678');
  assert.deepEqual(from0020, fromLocal);

  const fromShortMobile = normalizeEgyptPhone('1012345678');
  assert.deepEqual(fromShortMobile, fromLocal);

  assert.equal(normalizeEgyptPhone('   '), null);
});

test('formats controlled phone input helpers cleanly with +2 prefix', () => {
  assert.equal(stripEgyptPrefixForInput('+2 011 2222 3333'), '011 2222 3333');
  assert.equal(stripEgyptPrefixForInput('+201122223333'), '01122223333');
  assert.equal(withEgyptCountryCode('012 3456 7890'), '+2 012 3456 7890');
  assert.equal(withEgyptCountryCode('+2 012 3456 7890'), '+2 012 3456 7890');
  assert.equal(withEgyptCountryCode(''), '');
});

test('resolves embeddable Google Maps iframe URL from direct embed, place URL, address, or default fallback', () => {
  const direct = resolveLocationMapEmbed(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!test',
    'Minya, Egypt',
    'ar'
  );
  assert.equal(direct.isConfigured, true);
  assert.equal(direct.iframeSrc, 'https://www.google.com/maps/embed?pb=!1m18!1m12!test');

  const fromPlaceUrl = resolveLocationMapEmbed(
    'https://www.google.com/maps/place/Qena/@26.1551,32.7160,15z',
    '',
    'en'
  );
  assert.equal(fromPlaceUrl.isConfigured, true);
  assert.ok(fromPlaceUrl.iframeSrc.includes('26.1551%2C32.7160'));
  assert.ok(fromPlaceUrl.iframeSrc.includes('output=embed'));

  const fromShortlink = resolveLocationMapEmbed('', 'https://maps.app.goo.gl/f3DpR86TeAdW5yd89', 'ar');
  assert.equal(fromShortlink.isConfigured, true);
  assert.ok(fromShortlink.iframeSrc.includes('25.917128%2C32.758254'));
  assert.equal(fromShortlink.externalUrl, 'https://maps.app.goo.gl/f3DpR86TeAdW5yd89');
  assert.equal(fromShortlink.coordinatesLabel, '25.917128, 32.758254');

  const fromSearchCoords = resolveLocationMapEmbed(
    'https://www.google.com/maps/search/25.917128,+32.758254',
    '',
    'en'
  );
  assert.equal(fromSearchCoords.isConfigured, true);
  assert.ok(fromSearchCoords.iframeSrc.includes('25.917128%2C32.758254'));

  const fromAddress = resolveLocationMapEmbed('', 'Qena Governorate, Egypt', 'ar');
  assert.equal(fromAddress.isConfigured, true);
  assert.ok(fromAddress.iframeSrc.includes('hl=ar'));
  assert.ok(fromAddress.iframeSrc.includes('output=embed'));

  const unconfigured = resolveLocationMapEmbed('', '', 'ar');
  assert.equal(unconfigured.isConfigured, false);
  assert.ok(unconfigured.iframeSrc.includes('q=Egypt'));
  assert.ok(unconfigured.iframeSrc.includes('output=embed'));
});
