const request = (status, message, data, res, success = true) => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};

const notFound = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    message,
    data: {
      code: 404,
    },
  });
};

module.exports = {
  request,
  notFound,
};
