import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authError, smsRequested } from '../src/auth-response.js';

test('Kaspi action error explains why SMS was not requested', () => {
  const response = {
    meta: { sn: 'EnterPhoneNumber' },
    type: 'Action',
    error: {
      code: 'UserPhoneNumberDoesNotBelongToAnyOperator',
      desc: 'Введенный номер не принадлежит ни одному оператору РК',
    },
  };
  assert.deepEqual(authError(response), {
    code: 'UserPhoneNumberDoesNotBelongToAnyOperator',
    description: 'Введенный номер не принадлежит ни одному оператору РК',
  });
  assert.equal(smsRequested(response), false);
});

test('Kaspi update alarm blocks initiation and current OTP view is accepted', () => {
  assert.equal(authError({ view: { onOpenAlarm: { error: { code: 'OldVersionToUpdate', label: 'Обновите приложение, чтобы войти' } } } })?.code, 'OldVersionToUpdate');
  assert.equal(smsRequested({ view: { code: 'KPUniversalEnterOtp' } }), true);
  assert.equal(smsRequested({ view: { code: 'KPUniversalEnterPhoneNumber' } }), false);
});
