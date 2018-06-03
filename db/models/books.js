'use strict';

const mongoose = require('mongoose');

let booksSchema = mongoose.Schema({
  name: String
});

let Books = mongoose.model('Books', booksSchema);

exports.dir = function(callback) {
  let template = `<h1 style='width:100%;text-align:center;padding-top:100px;'>Hello server :)</h1>`;

  callback(template);
};

exports.all = (callback) => {

  Books.find(function(err, books) {
    if (err) return console.error(err);
    callback(books);
  });
}
