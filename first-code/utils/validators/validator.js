const Validator = require('validatorjs');

const validatorHandler = (data, rule) => {
  let validation = new Validator(data, rule);
  if (validation.passes()) {
    return true;
  } else if(validation.fails()) {
    return false;
  }
}

module.exports = validatorHandler;
