const app = require('./core/bootstrap/server.bootstrap');
const db = require('./core/bootstrap/database.bootstrap');
const routes = require('./routes/index.routes');
const env = require('./core/helpers/yenv.helper');
const winston = require('./core/helpers/winston.helper');

const port = process.env.PORT || env.SERVER.PORT;

db.connect()
  .then(() => {
    winston.console.info('CONNECTED', { origin: 'Database' });
    try {
      routes.setRoutes(app);
      app.listen(port, () => {
        winston.console.info(`Server listening on port: ${port}`, { origin: 'Express' });
      });
    } catch (error) {
      winston.console.error(error.message, { origin: 'Express' });
    }
  })
  .catch((error) => {
    winston.console.error(error.message, { origin: 'Database error' });
  });
