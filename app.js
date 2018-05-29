const fs = require('fs');
const path = require('path');

const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const express = require('express');

// let configPath = path.join(__dirname, 'config', process.env.NODE_ENV + '.json');
let configPath = path.join(__dirname, '/config/config' + '.json');

const config = require(configPath);

let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.set('port', config.port);
app.set('config', config);

console.log(app.get('port'));


// TODO Добавить обработчик ошибок, ток вот думаб сюда или в отдельный файл пихнуть


module.exports = app;
