'use strict';

module.exports = (app) => {
  const controllers = app.get('controllers');

  app.route('/register').post(controllers.user.registration);

  app.route('/login').post(controllers.user.login);

  app.route('/user').get(controllers.user.me);

  app.route('/users').get(controllers.user.getAll);

  // app.route('/users/:id').get(controllers.user.update); должен быть POST а не GET
}
