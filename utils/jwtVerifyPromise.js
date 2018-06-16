const jwt = require('jsonwebtoken');
const config = require(`../config/${process.env.NODE_ENV}.json`);

exports.jwtVerifyPromise = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_KAY, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
}
