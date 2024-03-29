const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'bundle.js';

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, 'client/.eslintrc.js'),
  context: path.resolve(__dirname, '/client'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['/node_modules/'],
  emitError: true,
  emitWarning: true,
};

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    app: [
      path.join(__dirname, 'client/containers/App.tsx'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
  },

  output: {
    publicPath: '/static/js/',
    path: filePath,
    filename: fileName,
    hotUpdateChunkFilename: '.hot/hot-update.js',
    hotUpdateMainFilename: '.hot/hot-update.json',
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './client/.eslintrc.cjs',
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin(ESLintOptions),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      sourceMap: true,
      devTool: 'source-map',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
};
