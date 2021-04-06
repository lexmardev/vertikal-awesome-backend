const joi = require('joi');

const propertySchema = {
  POST: {
    body: joi.object().keys({
      name: joi.string().trim().required(),
      currency: joi.string().trim().required(),
      price: joi.number().positive().precision(2).required(),
      description: joi.string().trim().required(),
      bathroom: joi.number().positive().integer().required(),
      restroom: joi.number().positive().integer().required(),
      parking: joi.number().positive().integer().required(),
      pool: joi.boolean().required(),
      airConditioner: joi.boolean().required(),
      privateSecurity: joi.boolean().required(),
      yard: joi.boolean().required(),
      lat: joi.number().required(),
      long: joi.number().required(),
      user: joi.string().required(),
    }),
  },
  PUT: {
    body: joi.object().keys({
      name: joi.string().trim(),
      currency: joi.string().trim(),
      price: joi.number().positive().precision(2),
      description: joi.string().trim(),
      bathroom: joi.number().positive().integer(),
      restroom: joi.number().positive().integer(),
      parking: joi.number().positive().integer(),
      pool: joi.boolean(),
      airConditioner: joi.boolean(),
      privateSecurity: joi.boolean(),
      yard: joi.boolean(),
      lat: joi.number(),
      long: joi.number(),
    }),
    params: joi.object().keys({
      _id: joi.string().required(),
    }),
  },
  DELETE: {
    params: joi.object().keys({
      _id: joi.string().required(),
    }),
  },
  UPLOAD: {
    params: joi.object().keys({
      _id: joi.string().required(),
    }),
  },
};

module.exports = propertySchema;
