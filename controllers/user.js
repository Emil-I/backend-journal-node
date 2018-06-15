'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const models = require('../db/models');
const User = models.user.User;

/**
 *@param req
 *@param res
 *@param next
 *@method POST (create new User)
 */

exports.create = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId;
    const {
      name,
      email,
      password,
      role
    } = req.body;

    let user = await User.findOne({
      email: email
    });

    if (user) {
      res.sendStatus(400);
      return console.log('User is already registered');
    }

    const saltRounds = 10;
    const HASH = await bcrypt.hash(password, saltRounds);
    const SALT = await bcrypt.genSalt(saltRounds);

    let userData = {
      _id: id,
      name: name,
      email: email,
      password: {
        hash: HASH,
        salt: SALT
      },
      role: role
    }

    user = await User.create(userData);

    return res.send(user);

  } catch (err) {
    return console.log(err);
    // next(err);
  }

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
  console.log(req.query.name);
  try {

    let query = await User.findById(req.params.id);

    query.set({
      name: req.query.name || 'unknown'
    });

    query.save((err, updateUser) => {
      if (err) {
        next(err);
      }
      res.send(updateUser);
    });

  } catch (err) {
    next(err);
  }
}
