const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DIST_DIR = path.resolve(__dirname, '../dist');
const SRC_DIR = path.resolve(__dirname, '../src');
const COMPONENTS = path.resolve(SRC_DIR, 'components');
const SERVICES = path.resolve(SRC_DIR, 'services');
const PAGES = path.resolve(SRC_DIR, 'pages');
const STATE = path.resolve(SRC_DIR, 'state');
const UTILITIES = path.resolve(SRC_DIR, 'utilities');

module.exports = {
  PUBLIC_DIR,
  DIST_DIR,
  SRC_DIR,
  COMPONENTS,
  SERVICES,
  PAGES,
  STATE,
  UTILITIES,
};
