'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @return Books
 */
exports.getAllBooks = () => {
  let allBooksSchema = new Schema({
    name: String
  });

  let Books = mongoose.model('Books', allBooksSchema);

  return Books;
}
