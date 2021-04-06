const setRoutes = (app) => {
  app.use(require('./user.routes'));
  app.use('/api/properties', require('./property.routes'));
  app.use('/api/images', require('./image.routes'));

  app.use('/api/healt-check', (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Im alive',
      data: {},
    });
  });

  // Middleware para rutas inválidas
  app.use((req, res) => {
    return res.status(404).json({
      success: false,
      message: 'Path not found',
      data: {
        code: 400,
      },
    });
  });
};

module.exports = {
  setRoutes,
};
