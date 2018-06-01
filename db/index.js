'use strict';
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = (app) => {
  let db;
  let url = app.get('config').database.connection;
  let dbName = app.get('config').database.name;

  MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);

    db = client.db(dbName).collection('books');;

    client.close();

    app.listen(3003, () => {
      console.log('API started');
    });
  });
}
