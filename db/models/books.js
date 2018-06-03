'use strict';

const mongoose = require('mongoose');

/**
 * @ mongoose.Schema
 * @param callback
 */
exports.getAllBooks = (callback) => {
  let allBooksScheme = mongoose.Schema({
    name: String
  });

  let Books = mongoose.model('Books', allBooksScheme);
  callback(Books);
}
