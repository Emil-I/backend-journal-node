'use strict';

const mongoose = require('mongoose');
const models = require('../db/models');
const User = models.user.User;

/**
 *@param req
 *@param res
 *@param next
 *@method POST (create new User)
 */

exports.create = (req, res, next) => {
  let userData = {
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  let user = new User(userData);

  user.save((err) => {
    if (err) {
      console.log(err);
      next(err);
    }

    res.send(user);
  });
}

/**
 *@param req
 *@param res
 *@param next
 *@method GET (get all users)
 */

exports.getAll = (req, res, next) => {
  User
    .find({})
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send(users);
    });
}

/**
 *@param req
 *@param res
 *@param next
 *@param user:id
 *@method UPDATE (update user)
 */

exports.update = async (req, res, next) => {
  try {

    let query = await User.findById(req.params.id);

    query.set({
      name: "async"
    });

    query.save((err, updateUser) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send(updateUser);
    });

  } catch (err) {
    console.log(err.message);
    console.log('Error name: ' + err.name);
    res.sendStatus(404);
  }
}
