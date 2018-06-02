'use strict';
/**
 * @param req
 * @param res
 * @param next
 * @dir
 */

exports.dir = (req, res, next) => {
  let template = `<h1 style='width:100%;text-align:center;padding-top:100px;'>Hello server :)</h1>`;
  res.send(template);
}

/**
 * @param req
 * @param res
 * @param next
 * GET ALL BOOOKS
 */

const Books = require('../db/models/books');

exports.all = (req, res, next) => {
  Books.all((err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // res.send(result);
  });
}
