// Library Imports
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const config = require('./config');

// Init Express App
const app = express();

// Set Server Port
app.set('port', config.port);

// redirect all http request to https
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// Init Express Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Webpack Development Server
const env = process.env.NODE_ENV;
if (env && env.trim() === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('../build/webpack.dev');

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: { colors: true },
    }),
  );
}

// Import Routes
const api = require('./api');
const publicAssets = require('./public');

// Register Routes
app.use('/api', api);
app.use(publicAssets);

module.exports = app;
