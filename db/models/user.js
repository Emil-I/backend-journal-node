'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @return model User
 * @ mongoose schema User
 */

let userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  role: String,
  created: {
    type: Date,
    default: Date.now
  }
});

let User = mongoose.model('Users', userSchema);
exports.User = User;
