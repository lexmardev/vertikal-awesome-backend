const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(helmet());

const isInDevelopment = () => process.env.NODE_ENV === 'development';

if (isInDevelopment()) {
  morgan.token('req-body', (req) => {
    return JSON.stringify(req.body);
  });

  const morganFormat =
    'Method::method - EndPoint::url - Status::status - Time::response-time ms - BodyResponse::res[content-length] B - ReqBody::req-body';

  app.use(morgan(morganFormat));
}

// Middleware que valida que el JSON sea correcto
app.use((req, res, next) => {
  express.json()(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
        data: {
          code: 400,
        },
      });
    }

    next();
  });
});

module.exports = app;
