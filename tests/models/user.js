process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let models = require('../../db/models');
let User = models.user.User;

describe('User', () => {

  beforeEach((done) => {
    console.log('d');
    User.remove({}, (err) => {
      if (err) return console.log(err);
      console.log('del');
      done();
    });
  });

  describe('test', () => {
    it('it should test', (done) => {
      // let userData = {
      //   _id: new mongoose.Types.ObjectId,
      //   name: 'Test',
      //   email: 'test@gmail.com',
      //   password: '123123',
      //   role: 'admin'
      // }
      //
      // let user = new User(userData);
      //
      // user.save((err) => {
      //   if (err) {
      //     next(err);
      //   }
      //   console.log(user);
      //   done();
      // });
      User
        .find({})
        .exec((err, users) => {
          if (err) {
            return next(err);
          }
          console.log(users);
          done();
        });
    });

  });


});
