'use strict';

const db = require('../../db/dbconnect');

// exports.all = (cb) => {
//   db.get().collection('books').find().toArray((err, results) => {
//     cb(err, results);
//   });
// }

exports.all = function(callback) {
  // db.get().collection('books').find().toArray(function(err, docs) {
  //   cb(err, docs);
  // });

  db.get().collection('books').find().toArray(function(err, result) {
    callback(err, result);
  });
};
