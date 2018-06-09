'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @return model User
 * @method POST (create)
 */
exports.create = () => {
  let newUserSchema = new Schema({
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

  let User = mongoose.model('Users', newUserSchema);

  return User;
}

/**
 * @return model User
 * @method GET (get all)
 */
exports.getAll = () => {
  let getAllUsersSchema = new Schema({
    name: String
  });

  let UserAll = mongoose.model('Users', getAllUsersSchema);

  return UserAll;
}
