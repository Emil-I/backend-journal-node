'use strict';

const models = require('../db/models');
const Books = models.books;

/**
 * @param req
 * @param res
 * @param next
 */
exports.all = (req, res, next) => {
  Books.getAllBooks((books) => {

    books.find(function(err, books) {
      if (err) {
        console.error(err);
        next();
      }
      res.send(books);
    });

  });
}
