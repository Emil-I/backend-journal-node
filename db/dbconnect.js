'use strict';

const MongoClient = require('mongodb').MongoClient;

let state = {
  db: null
}

exports.connect = (url, next) => {
  if (state.db) {
    return next();
  }

  MongoClient.connect(url, (err, client) => {
    if (err) return next(err);

    state.db = client.db('some');

    // state.db.collection('books').find().toArray(function(err, result) {
    //   if (err) throw console.log(err);
    //   console.log(result);
    //   client.close();
    // });

    client.close();
  });
}


exports.get = () => {
  return state.db;
}
