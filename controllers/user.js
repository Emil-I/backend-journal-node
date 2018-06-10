'use strict';

const mongoose = require('mongoose');
const models = require('../db/models');
const UserModel = models.user;

/**
 *@param req
 *@param res
 *@param next
 *@method POST
 */

exports.create = (req, res, next) => {
  let userData = {
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  const User = UserModel.User;

  let user = new User(userData);

  user.save((err) => {
    if (err) {
      console.log(err);
      // res.sendStatus(500);
      next(err);
    }

    res.send(user);
  });
}

/**
 *@param req
 *@param res
 *@param next
 *@method GET
 */
exports.getAll = (req, res, next) => {
  UserModel.User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      // res.sendStatus(500);
      return next(err);
    }
    res.send(users);
  });
}
