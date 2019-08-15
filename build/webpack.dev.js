const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const { PUBLIC_DIR, DIST_DIR } = require('./paths');

const PORT = 8090;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${DIST_DIR}/index.html`,
      template: `${PUBLIC_DIR}/index.html`,
    }),
  ],
});
