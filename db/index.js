'use strict';
const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
const DB = require('./dbconnect');

module.exports = (app) => {

  let url = app.get('config').database.connection;
  // let dbName = app.get('config').database.name;
  // TODO Нжно как то пробросить название базы в connect

  DB.connect(url, (err, client) => {
    if (err) return console.log(err);
  });
}
