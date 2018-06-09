'use strict';

const mongoose = require('mongoose');
const models = require('../db/models');
const UserModel = models.user;

/**
 *@param req
 *@param res
 *@param next
 */

exports.create = (req, res, next) => {
  let userData = {
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  let userCreate = UserModel.create();

  let User = new userCreate(userData);

  User.save((err) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      next(err);
    }

    res.send(User);
    // res.sendStatus(200);
    // TODO try res.json(User);
  });
}

/**
 *@param req
 *@param res
 *@param next
 */

exports.getAll = (req, res, next) => {
  UserModel.getAll().find({}, (err, users) => {
    if (err) {
      console.error(err);
      next(err);
    }
    // BUG при втором запросе получаю 500-ю
    res.send(users);
  });
}
