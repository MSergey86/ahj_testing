import Validator from './validators';

const container = document.querySelector('.col-md-5');

const validator = new Validator(container);

validator.init();
