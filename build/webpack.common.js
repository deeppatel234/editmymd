require('dotenv').config();
const webpack = require('webpack');
const PATHS = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { PUBLIC_DIR, DIST_DIR } = require('./paths');

module.exports = {
  entry: {
    app: `${PATHS.SRC_DIR}/index.js`,
  },
  output: {
    path: PATHS.DIST_DIR,
    filename: 'bundles/[name].[hash:8].js',
    sourceMapFilename: 'maps/[name].[hash:8].map.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      Components: PATHS.COMPONENTS,
      Services: PATHS.SERVICES,
      State: PATHS.STATE,
      Pages: PATHS.PAGES,
      Utilities: PATHS.UTILITIES,
      Src: PATHS.SRC_DIR,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      GITHUB_CLIENT_KEY: JSON.stringify(process.env.GITHUB_CLIENT_KEY),
    }),
    new MiniCssExtractPlugin({
      filename: 'bundles/[name].[hash].css',
    }),
    new CopyPlugin([
      { from: `${PUBLIC_DIR}/assets`, to: `${DIST_DIR}/assets` },
      { from: `${PUBLIC_DIR}/manifest.json`, to: DIST_DIR },
      { from: `${PUBLIC_DIR}/favicon.ico`, to: DIST_DIR },
    ]),
  ]
};
