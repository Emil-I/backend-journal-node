let controllers = {};
const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname).filter(function(file) {
  return file.indexOf('.js') > 0 && file !== 'index.js' && fs.statSync(path.join(__dirname, file)).isFile();
}).forEach(function(file) {
  controllers[file.split('.')[0]] = require(path.join(__dirname, file));
});

module.exports = controllers;
