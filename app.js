const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');


// let configPath = path.join(__dirname, 'config', process.env.NODE_ENV + '.json');
let configPath = path.join(__dirname, `/config/config.json`);


const config = require(configPath);


let app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.set('port', config.port);
app.set('config', config);


// connect to DB
app.set('db', require('./db')(app));


//controllers
const controllers = require('./controllers');
app.set('controllers', controllers);


// init routes
let routesDirectory = path.join(__dirname, 'routes');
fs.readdirSync(routesDirectory).filter(function(file) {
  return file.indexOf('.js') > 0 && fs.statSync(path.join(routesDirectory, file)).isFile();
}).forEach(function(file) {
  require(path.join(routesDirectory, file))(app);
});


app.use(function(err, req, res, next) {
  if (res.headersSent) return next(err);
  res.sendStatus(500);
});

// / catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('NOT FOUND');
  err.status = 404;
  next(err);
});


// / error handlers
app.use((err, req, res, next) => {
  console.log(err);
  let template_404 = `<h1 style='width:100%;text-align:center;padding-top:100px;'>Not Found <br/> status 404</h1>`;
  res.send(template_404);
  res.sendStatus(404);
});


module.exports = app;
