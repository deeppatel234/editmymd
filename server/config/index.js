const dotenv = require('dotenv');
const { ENV_PATH } = require('../path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({ path: ENV_PATH });

module.exports = {
  /**
   * server port
   */
  port: parseInt(process.env.PORT, 10) || 3030,

  /**
   * mongodb connection string
   */
  databaseURL: process.env.DBURI,

  /**
   * jwt web token secret key
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  /**
   * GitHub OAuth
   */
  github: {
    clientId: process.env.GITHUB_CLIENT_KEY,
    clientSecret: process.env.GITHUB_SECRET_KEY,
  },
};
