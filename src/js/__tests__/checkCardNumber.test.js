import { validateCardNumber, paymentSystem } from '../checkCardNumber';

test.each([
  ['visa', '411111123456789', 0],
  ['mir', '2551382000000013', 1],
  ['mastercard', '5105109876543214', 2],
  ['amex', '371449635398431', 3],
  ['discover', '6011115555666688', 4],
  ['jcb', '3530111444409999', 5],
  ['diners club', '30569309025955', 6],
])('it should be %s', (_, cardNumber, expected) => {
  expect(paymentSystem(cardNumber)).toBe(expected);
});

test.each([
  ['Valide mir', '2201382000000013', true],
  ['Valide diners club', '38520000023237', true],
  ['Valide jcb', '3530111333300000', true],
  ['Valide american express', '371449635398431', true],
  ['Valide visa', '4111111111111111', true],
  ['Valide mastercard', '5105105105105100', true],
  ['Valide discover', '6011111111111117', true],
  ['notvalide card number', '0105105105105100', false],
  ['notvalide card number', '1234', false],
])('it should be %s', (_, cardNumber, expected) => {
  expect(validateCardNumber(cardNumber)).toBe(expected);
});
