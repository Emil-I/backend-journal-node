'use strict';

module.exports = (app) => {
  const controllers = app.get('controllers');

  app.route('/').get(controllers.dir.dir);
}
