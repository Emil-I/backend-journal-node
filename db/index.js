'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let db;
let url = app.get('config').database.connection;
let dbName = app.get('config').database.name;

MongoClient.connect(url, (err, client) => {
  if(err) return console.log(err);

  db = client.db(dbName);

  client.close();

  app.listen(3003, () => {
    console.log('API started');
  });
});

module.exports = db;
