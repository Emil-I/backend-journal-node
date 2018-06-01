'use strict';

module.exports = (app) => {
  const controllers = app.get('controllers');

  app.get('/', controllers.books.dir);
}
