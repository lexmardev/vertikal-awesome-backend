const joi = require('joi');

const userSchema = {
  POST: {
    body: joi.object().keys({
      username: joi.string().trim().required(),
      email: joi.string().trim().email().required(),
      password: joi.string().trim().required(),
      confirmPassword: joi.ref('password'),
    }),
  },
  LOGIN: {
    body: joi.object().keys({
      email: joi.string().trim().email().required(),
      password: joi.string().trim().required(),
    }),
  },
};

module.exports = userSchema;
