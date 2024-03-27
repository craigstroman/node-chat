const { addPath } = require('app-module-path');
const path = require('path');
const express = require('express');
const { routes } = require('./routes/index.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const nodeEnv = process.env.NODE_ENV;

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

app.locals.javascript;
app.locals.title = 'Node Chat';

app.use('/static', express.static('public'));
addPath(__dirname);

app.use(routes);

module.exports.app = app;
