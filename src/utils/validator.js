const validator = require('validator');

exports.validateRegisterInput = (email, password, role) => {
  let errors = {};

  if (!email || !validator.isEmail(email)) {
    errors.email = 'Valid email is required';
  }

  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (role === undefined || ![0, 1].includes(role)) {
    errors.role = 'Role must be 0 (admin) or 1 (user)';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

exports.validateLoginInput = (email, password) => {
  let errors = {};

  if (!email || !validator.isEmail(email)) {
    errors.email = 'Valid email is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

exports.validateReactionTime = (time) => {
  let errors = {};

  if (time === undefined || typeof time !== 'number' || time < 0) {
    errors.time = 'Reaction time must be a non-negative number';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};