'use strict';

module.exports = (app) => {
  const controllers = app.get('controllers');

  app.route('/user').post(controllers.user.create);

  app.route('/users').get(controllers.user.getAll);

  app.route('/users/:id').get(controllers.user.update);
}
