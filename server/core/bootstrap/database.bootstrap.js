const mongoose = require('mongoose');
const env = require('../helpers/yenv.helper');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  poolSize: 10,
};

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(`${env.DATABASE.HOST}${env.DATABASE.DB}`, options)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

module.exports = {
  connect,
};
