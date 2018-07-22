const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');


let configPath = path.join(__dirname, `/config/${process.env.NODE_ENV}.json`);


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
fs.readdirSync(routesDirectory).filter(function (file) {
  return file.indexOf('.js') > 0 && fs.statSync(path.join(routesDirectory, file)).isFile();
}).forEach(function (file) {
  require(path.join(routesDirectory, file))(app);
});


// / catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('NOT FOUND');
  err.status = 404;
  next(err);
});


// error handlers
app.use((err, req, res, next) => {
  console.log(err);

  if (err.code) {
    err.status = err.code;
  }

  if (err.name === 'ValidationError') {
    err.status = 500;
  }


  // check standart null validation message
  let data = /(.+) cannot be null/.exec(err.message || '');
  if (data && data.length > 1) {
    err.message = `INCORECT_${data[1].toUpperCase()}`;
  } else {
    err.status = 500;
  }

  res.status(err.status);

  let result = {
    error: {
      message: err.message,
      value: err.value
    }
  }

  if (err.status === 500 && req.app.get('env') === 'production') {
    result.error.message = 'INTERNAL_SERVER_ERROR';
  }

  res.json(result);
});


module.exports = app;