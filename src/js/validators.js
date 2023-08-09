import { validateCardNumber, paymentSystem } from './checkCardNumber';

export default class Validator {
  constructor(container) {
    this.container = container;
    this.inputNumber = document.querySelector('.form-control');
    this.cards = [...document.querySelectorAll('.card')];
  }

  init() {
    this.inputNumber.addEventListener('input', this.onInput.bind(this));
    this.validateButton = this.container.querySelector('.btn');
    this.validateButton.addEventListener('click', this.onSubmit.bind(this));
  }

  onInput(event) {
    event.preventDefault();
    const { value } = this.inputNumber;
    paymentSystem(value);
    if (value !== '') {
      this.cards.forEach((e) => e.classList.add('card-pale'));
      const numberPayment = paymentSystem(value);
      this.cards[numberPayment].classList.remove('card-pale');
    } else {
      this.cards.forEach((e) => e.classList.remove('card-pale'));
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const validOrNot = validateCardNumber(this.inputNumber.value);
    if (validOrNot) {
      alert('Valid');
    } else {
      alert('Not Valid');
    }
    this.inputNumber.value = '';
  }
}
