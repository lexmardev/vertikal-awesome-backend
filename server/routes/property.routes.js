const errorHandler = require('../core/handlers/error.handler');
const schemaHandler = require('../core/handlers/schema.handler');
const response = require('../core/helpers/response.helper');

const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

const Property = require('../models/property.model');
const propertySchema = require('../core/schemas/property.schema');

const { pick } = require('lodash');
const { Router } = require('express');

const router = Router();

const getBody = (body) => {
  return pick(body, [
    'name',
    'currency',
    'price',
    'description',
    'bathroom',
    'restroom',
    'parking',
    'pool',
    'airConditioner',
    'privateSecurity',
    'yard',
    'lat',
    'long',
    'user',
  ]);
};

router.post(
  '/upload/photos/:_id',
  auth.authorization,
  schemaHandler.validate(propertySchema.UPLOAD),
  upload.images,
  errorHandler.handleRequest(async (req, res) => {
    const pathImages = [];
    req.files.forEach((file) => {
      const pathImage = file.destination + file.filename;
      pathImages.push(pathImage);
    });

    const _id = req.params._id;

    const result = await Property.findByIdAndUpdate(_id, { optionalImages: pathImages });

    if (result) {
      return response.request(200, 'Image added successfully', {}, res);
    }

    return response.notFound(res, 'Property not found');
  })
);

router.post(
  '/upload/photo/:_id',
  auth.authorization,
  schemaHandler.validate(propertySchema.UPLOAD),
  upload.image,
  errorHandler.handleRequest(async (req, res) => {
    const pathImage = req.file.destination + req.file.filename;
    const _id = req.params._id;

    const result = await Property.findByIdAndUpdate(_id, { primaryImage: pathImage });

    if (result) {
      return response.request(200, 'Image added successfully', {}, res);
    }

    return response.notFound(res, 'Property not found');
  })
);

router.post(
  '/',
  auth.authorization,
  schemaHandler.validate(propertySchema.POST),
  errorHandler.handleRequest(async (req, res) => {
    const property = getBody(req.body);
    const result = await Property.create(property);

    return response.request(201, 'Property created successfully', { _id: result._id }, res);
  })
);

router.put(
  '/:_id',
  auth.authorization,
  schemaHandler.validate(propertySchema.PUT),
  errorHandler.handleRequest(async (req, res) => {
    const property = getBody(req.body);
    delete property.user;

    const result = await Property.findByIdAndUpdate(req.params._id, property);

    if (result) {
      return response.request(201, 'Property updated successfully', { _id: result._id }, res);
    }

    return response.notFound(res, 'Property not found');
  })
);

router.get(
  '/',
  auth.authorization,
  errorHandler.handleRequest(async (req, res) => {
    const results = await Property.find({ user: req.user._id });

    return response.request(200, 'Properties found successfully', { data: results }, res);
  })
);

router.delete(
  '/:_id',
  auth.authorization,
  schemaHandler.validate(propertySchema.DELETE),
  errorHandler.handleRequest(async (req, res) => {
    const _id = req.params._id;

    const result = await Property.findByIdAndDelete(_id);

    if (result) {
      return response.request(200, 'Property deleted successfully', {}, res);
    }

    return response.notFound(res, 'Property not found');
  })
);

module.exports = router;
