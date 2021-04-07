const env = require('./yenv.helper');
const jwt = require('jwt-simple');
const moment = require('moment');

const encode = (payload = {}) =>
  new Promise((resolve, reject) => {
    try {
      const data = {
        iat: moment().unix(),
        exp: moment().add(env.TOKEN.TIMEOUT, env.TOKEN.UNITS).unix(),
        payload,
      };
      const encoded = jwt.encode(data, env.TOKEN.SECRET_KEY, 'HS256');
      resolve(encoded);
    } catch (error) {
      error.message = 'Error enconding token';
      reject(error);
    }
  });

const decode = (token) =>
  new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, env.TOKEN.SECRET_KEY);
      resolve(payload);
    } catch (error) {
      error.message = 'Error decoding token';
      reject(error);
    }
  });

module.exports = {
  encode,
  decode,
};
