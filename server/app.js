const { addPath } = require('app-module-path');
const path = require('path');
const express = require('express');
const { routes } = require('./routes/index.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'development') {
  const webpack = require('webpack');
  const webPackConfig = require('../webpack.config.dev.ts');
  const webpackCompiler = webpack(webPackConfig);

  app.use(
    require('webpack-dev-middleware')(webpackCompiler, {
      // noInfo: true,
      publicPath: webPackConfig.output.publicPath,
    }),
  );

  app.use(
    require('webpack-hot-middleware')(webpackCompiler, {
      log: false,
      path: '/__webpack_hmr',
    }),
  );
}

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

app.locals.javascript = javac;
app.locals.title = 'Node Chat';

app.use('/static', express.static('public'));
addPath(__dirname);

app.use(routes);

module.exports.app = app;
