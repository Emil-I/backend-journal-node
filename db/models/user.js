'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @return model User
 * @mongoose schema User
 */

let userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    validate: {
      validator: (string) => {
        return string.length >= 4;
      },
      message: 'Name has to be at least 4 characters long and consist of alphanumeric characters only'
    },
    required: [true, 'User name required']
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    hash: {
      type: String,
      required: true
    }
    // salt: {
    //   type: String,
    //   required: true
    // }
  },
  role: String,
  created: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

let User = mongoose.model('Users', userSchema);

exports.User = User;
