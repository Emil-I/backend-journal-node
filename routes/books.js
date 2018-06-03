'use strict';

module.exports = (app) => {
  const controllers = app.get('controllers');

  app.route('/books').get(controllers.books.all);
}
