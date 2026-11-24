import test from 'node:test';
import assert from 'node:assert/strict';
import { computeHeaderScrollState } from './headerScroll';

test('returns top docked state at top of page', () => {
  assert.equal(
    computeHeaderScrollState({
      scrollY: 0,
      lastScrollY: 120,
      previousMode: 'floating',
      mobileMenuOpen: false,
    }),
    'top'
  );
  assert.equal(
    computeHeaderScrollState({
      scrollY: 20,
      lastScrollY: 0,
      previousMode: 'top',
      mobileMenuOpen: false,
    }),
    'top'
  );
});

test('hides header when scrolling down past hide threshold', () => {
  assert.equal(
    computeHeaderScrollState({
      scrollY: 220,
      lastScrollY: 160,
      previousMode: 'floating',
      mobileMenuOpen: false,
    }),
    'hidden'
  );
});

test('shows centered floating header when scrolling up away from top', () => {
  assert.equal(
    computeHeaderScrollState({
      scrollY: 180,
      lastScrollY: 240,
      previousMode: 'hidden',
      mobileMenuOpen: false,
    }),
    'floating'
  );
});

test('keeps header visible in floating mode while mobile menu is open', () => {
  assert.equal(
    computeHeaderScrollState({
      scrollY: 300,
      lastScrollY: 200,
      previousMode: 'hidden',
      mobileMenuOpen: true,
    }),
    'floating'
  );
});
