'use strict';

module.exports = (app) => {
  const controllers = app.get('controllers');

  app.route('/').get(controllers.books.dir);
}
