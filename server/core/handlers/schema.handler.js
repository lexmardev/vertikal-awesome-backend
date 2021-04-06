const validate = (schema) => {
  return (req, res, next) => {
    const params = ['headers', 'params', 'query', 'body'];
    const validators = [];

    params.forEach((param) => {
      if (schema[param]) {
        validators.push(schema[param].validate(req[param], { allowUnknown: true }));
      }
    });

    return Promise.all(validators)
      .then((results) => {
        let message = '';
        const errorFound = results.some((result) => {
          message = result.error?.message;
          return result.error;
        });

        if (errorFound) {
          return res.status(400).json({
            success: false,
            message,
            data: {
              code: 401,
            },
          });
        }

        next();
      })
      .catch(() => {
        return res.status(500).json({
          success: false,
          message: 'Unexpected error validating data provided',
          data: {
            code: 501,
          },
        });
      });
  };
};

module.exports = {
  validate,
};
