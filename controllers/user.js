'use strict';
// {
//   "name": "Emil",
//   "email": "emil@gmail.com",
//   "password": "qwerty",
//   "role": "admin"
// }
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require(`../config/${process.env.NODE_ENV}.json`);
const jwt = require('jsonwebtoken');
const jwtVerifyPromise = require('../utils/jwtVerifyPromise').jwtVerifyPromise;
const mongoose = require('mongoose');
const models = require('../db/models');
const User = models.user.User;


/**
 *@param req
 *@param res
 *@param next
 *@method POST (create new User)
 */

exports.registration = async (req, res, next) => {
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
      return console.log(`User ${email} is already registered`);
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
 *@method POST (login)
 */

exports.login = async (req, res, next) => {
  try {

    const {
      email,
      password
    } = req.body;

    // CHECK EMAIL
    const user = await User.findOne({
      email: email
    });

    if (!user) {
      return res.send('User not found!');
    }

    // CHECK PASSWORD
    let checkPass = await bcrypt.compare(password, user.password.hash);

    if (!checkPass) {
      return res.send('Password don\'t match!');
    }

    // CREATE TOKEN
    const token = jwt.sign({
      id: user.id
    }, config.SECRET_KAY);

    res.send(token);

  } catch (err) {
    return console.log(err);
  }
}

/**
 *@param req
 *@param res
 *@param next
 *@method GET (get user)
 */

exports.me = async (req, res, next) => {
  try {

    const {
      authorization: headerValue
    } = req.headers;

    if (_.isNull(headerValue) || _.isUndefined(headerValue) || _.isEmpty(headerValue)) {
      return res.sendStatus(400);
    }

    // const [, jwtToken] = headerValue.split(' ');
    // console.log(headerValue);

    const {
      id
    } = await jwtVerifyPromise(headerValue);

    let user = await User.findOne({
      _id: id
    }, {
      password: false
    });

    if (!user) {
      return res.sendStatus(400);
    }

    return res.send(user);

  } catch (err) {
    return console.log(err);
  }

}


/**
 *@param req
 *@param res
 *@param next
 *@method GET (get all users)
 */

exports.getAll = async (req, res, next) => {
  try {

    let users = await User.find({}, {
      password: false
    });

    if (users) {
      return res.send(users);
    }

  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
 *@param req
 *@param res
 *@param next
 *@param user:id
 *@method UPDATE (update user)
 */
//
// exports.update = async (req, res, next) => {
//   console.log(req.query.name);
//   try {
//
//     let query = await User.findById(req.params.id);
//
//     query.set({
//       name: req.query.name || 'unknown'
//     });
//
//     query.save((err, updateUser) => {
//       if (err) {
//         next(err);
//       }
//       res.send(updateUser);
//     });
//
//   } catch (err) {
//     next(err);
//   }
// }
