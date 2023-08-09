export function paymentSystem(cardNumber) {
  if (cardNumber.startsWith('2')) {
    return 1; // mir
  }
  if (cardNumber.startsWith('4')) {
    return 0; // visa
  }
  if (cardNumber.startsWith('51') || cardNumber.startsWith('52') || cardNumber.startsWith('53') || cardNumber.startsWith('54') || cardNumber.startsWith('55')) {
    return 2; // mastercard
  }
  if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
    return 3; // amex
  }
  if (cardNumber.startsWith('60') || cardNumber.startsWith('65')) {
    return 4; // discover
  }
  if (cardNumber.startsWith('35')) {
    return 5; // jsb
  }
  if (cardNumber.startsWith('30')) {
    return 6; // diners
  }
}

export function validateCardNumber(cardNumber) {
  let sum = null;
  for (let i = 0; i < cardNumber.length; i += 1) {
    let result = parseInt(cardNumber[i], 10);

    if ((cardNumber.length - i) % 2 === 0) {
      result *= 2;
      if (result > 9) {
        result -= 9;
      }
    }
    sum += result;
  }
  return sum % 10 === 0;
}
