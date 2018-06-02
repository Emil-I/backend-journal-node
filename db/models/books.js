'use strict';

const db = require('../../db');

exports.all = (cb) => {
  db.collection('books').find().toArray((err, results) => {
    cb(err, results);
  });
}
