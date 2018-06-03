'use strict';

const mongoose = require('mongoose');

let db;

module.exports = (app) => {

  let configUrl = app.get('config').database.connection;
  let nameDB = app.get('config').database.name;
  let url = configUrl + nameDB;

  mongoose.connect(url);

  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));

  db.once('open', () => {
    console.log('db connection');
  });

}
