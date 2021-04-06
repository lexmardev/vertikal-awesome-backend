const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  primaryImage: {
    type: String,
  },
  optionalImages: {
    type: [String],
    max: 5,
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  restroom: {
    type: Number,
    required: true,
  },
  parking: {
    type: Number,
    required: true,
  },
  pool: {
    type: Boolean,
    default: false,
  },
  airConditioner: {
    type: Boolean,
    default: false,
  },
  privateSecurity: {
    type: Boolean,
    default: false,
  },
  yard: {
    type: Boolean,
    default: false,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

propertySchema.methods.toJSON = function () {
  const property = this.toObject();
  property.location = {
    latitude: property.lat,
    longitude: property.long,
  };

  delete property.lat;
  delete property.long;

  return property;
};

module.exports = mongoose.model('Property', propertySchema);
