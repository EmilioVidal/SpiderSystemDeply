// src/utils/dbUtils.js
const { connection } = require('../Config/confDB');

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.exec(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { executeQuery };
