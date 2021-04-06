const errorHandler = require('../core/handlers/error.handler');
const schemaHandler = require('../core/handlers/schema.handler');
const bcrypt = require('../core/helpers/bcrypt.helper');
const jwt = require('../core/helpers/jwt.helper');
const response = require('../core/helpers/response.helper');
const sendgrid = require('../core/helpers/sengrid.helper');

const User = require('../models/user.model');
const userSchema = require('../core/schemas/user.schema');

const { pick } = require('lodash');
const { Router } = require('express');

const router = Router();

router.post(
  '/api/register',
  schemaHandler.validate(userSchema.POST),
  errorHandler.handleRequest(async (req, res) => {
    const user = pick(req.body, ['username', 'email', 'password']);
    user.password = await bcrypt.hash(user.password);
    const result = await User.create(user);

    let emailSent = false;
    let error;

    await sendgrid
      .sendEmail(result.email)
      .then((result) => (emailSent = result))
      .catch((err) => (error = err));

    if (emailSent) {
      return response.request(201, 'User created successfully', { _id: result._id }, res);
    }

    await User.findByIdAndDelete(result._id);
    throw error;
  })
);

router.post(
  '/api/login',
  schemaHandler.validate(userSchema.LOGIN),
  errorHandler.handleRequest(async (req, res) => {
    const user = pick(req.body, ['email', 'password']);
    const result = await await User.findOne({ email: user.email });

    if (result) {
      if (await bcrypt.compare(user.password, result.password)) {
        const token = await jwt.sign({ payload: { _id: result._id } });
        return response.request(200, 'User logged in successfully', { token }, res);
      }
    }
    return response.notFound(res, 'Invalid email or password');
  })
);

module.exports = router;
