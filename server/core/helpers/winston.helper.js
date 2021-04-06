const winston = require('winston');

const console = winston.createLogger({
  format: winston.format.simple(),
  defaultMeta: { origin: 'Default' },
  transports: [new winston.transports.Console()],
});

module.exports = {
  console,
};
