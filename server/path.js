const path = require('path');

const DIST_PATH = path.join(__dirname, '../', 'dist');
const DIST_INDEX_PATH = path.join(DIST_PATH, 'index.html');
const ENV_PATH = path.join(__dirname, '../', '.env');

module.exports = {
  DIST_PATH,
  DIST_INDEX_PATH,
  ENV_PATH,
};
