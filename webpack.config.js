var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/js/app.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
      },
      {
        test: /\.html?$/,
        loader: 'ng-cache?prefix=[dir]/[dir]'
      }
    ]
  },
  debug: true
};
