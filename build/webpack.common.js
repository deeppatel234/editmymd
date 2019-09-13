require('dotenv').config();

const PATHS = require('./paths');

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
        use: ['style-loader', 'css-loader'],
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
};
