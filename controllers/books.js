'use strict';

const models = require('../db/models');
const Books = models.books;

/**
 * @param req
 * @param res
 * @param next
 * @dir
 */


exports.dir = (req, res, next) => {
  Books.dir((template) => {
    res.send(template);
  });
}

exports.all = (req, res, next) => {
  Books.all((books) => {
    console.log(books);
    // req.send(books);
  });
  // next();
}
