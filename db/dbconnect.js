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

    state.db = client;

    client.close();
  });
}


exports.get = () => {
  return state.db;
}
