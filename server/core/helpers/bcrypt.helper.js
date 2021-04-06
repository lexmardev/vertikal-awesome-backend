const bcryptjs = require('bcryptjs');

const hash = (data) => {
  return new Promise((resolve, reject) => {
    bcryptjs
      .hash(data, 10)
      .then((dataHashed) => {
        resolve(dataHashed);
      })
      .catch(() => {
        reject(new Error('Data could not be encrypted'));
      });
  });
};

const compare = (data, dataHashed) => {
  return new Promise((resolve, reject) => {
    bcryptjs
      .compare(data, dataHashed)
      .then((result) => resolve(result))
      .catch(() => reject(new Error('Data could not be compared')));
  });
};

module.exports = {
  hash,
  compare,
};
