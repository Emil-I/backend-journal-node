'use strict';
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = (app) => {
  let db;
  let url = app.get('config').database.connection;
  let dbName = app.get('config').database.name;

  MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);

    db = client.db(dbName);

    client.close();
  });
}
