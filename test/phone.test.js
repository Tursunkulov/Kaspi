import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kaspiLoginPhone } from '../src/phone.js';

test('Kaspi login sends the ten-digit national number', () => {
  assert.equal(kaspiLoginPhone('77001234567'), '7001234567');
  assert.equal(kaspiLoginPhone('+7 700 123 45 67'), '7001234567');
  assert.equal(kaspiLoginPhone('87001234567'), '7001234567');
  assert.equal(kaspiLoginPhone('7001234567'), '7001234567');
  assert.equal(kaspiLoginPhone('7700'), null);
  assert.equal(kaspiLoginPhone('phone 77001234567'), null);
});
