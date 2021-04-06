const jwt = require('../core/helpers/jwt.helper');

const authorization = (req, res, next) => {
  const token = req.get('x-token');

  jwt
    .decode(token)
    .then((decoded) => {
      req.user = decoded.payload;
      next();
    })
    .catch(() => {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: {
          code: 400,
        },
      });
    });
};

module.exports = {
  authorization,
};
