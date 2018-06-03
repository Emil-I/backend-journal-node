'use strict';

const mongoose = require('mongoose');

let db;

module.exports = (app) => {

  let configUrl = app.get('config').database.connection;
  let nameDB = app.get('config').database.name;
  let url = configUrl + nameDB;
  let optionsDB = {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500 // Reconnect every 500ms
  }

  mongoose.connect(url, optionsDB);

  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));

  db.once('open', () => {
    console.log('---DB connected---');
  });

}
