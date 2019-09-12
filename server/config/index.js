const dotenv = require('dotenv');
const { ENV_PATH } = require('../path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: ENV_PATH });
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3030,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.DBURI,

  /**
   * Your secret sauce
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
