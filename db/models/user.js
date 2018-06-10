'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @return model User
 * @ mongoose schema User
 */

let userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  created: {
    type: Date,
    default: Date.now
  }
  // , {versionKey: false} Для отключения ключа ерсий
});

let User = mongoose.model('Users', userSchema);
exports.User = User;
