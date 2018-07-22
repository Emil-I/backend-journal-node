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

    if (!password) {
      return res.status(500).send('Password required');
    }

    if (user) {
      res.status(400).send(`User is already registered`);
      return console.log(`User ${email} is already registered`);
    }

    const saltRounds = 10;
    const SALT = await bcrypt.genSalt(saltRounds);

    const HASH = await bcrypt.hash(password, SALT);

    // generate a salt
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //   if (err) return next(err);

    //   // hash the password using our new salt
    //   bcrypt.hash(password, salt, function (err, hash) {
    //     if (err) return next(err);

    //     // override the cleartext password with the hashed one
    //     user.password = hash;
    //     next();
    //   });
    // });

    let userData = {
      _id: id,
      name: name,
      email: email,
      password: {
        hash: HASH
        // salt: SALT
      },
      role: role
    }

    user = await User.create(userData);

    return res.send(user);

  } catch (err) {
    // return console.log(err);
    next(err);
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
      return res.status(404).send('User not found!');
    }

    // CHECK PASSWORD
    let checkPass = await bcrypt.compare(password, user.password.hash);

    if (!checkPass) {
      return res.status(500).send('Password don\'t match!');
    }

    // CREATE TOKEN
    const token = jwt.sign({
      id: user.id
    }, config.SECRET_KAY);

    res.send(token);

  } catch (err) {
    // return console.log(err);
    next(err);
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
    
    console.log(headerValue);
      if (_.isNull(headerValue) || _.isUndefined(headerValue) || _.isEmpty(headerValue)) {
      return res.sendStatus(400);
    }

    const [, jwtToken] = headerValue.split(' ');

    const {
      id
    } = await jwtVerifyPromise(jwtToken);

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
    // return console.log(err);
    next(err);
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
    // let users = await User.find({});

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