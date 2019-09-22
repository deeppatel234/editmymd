const github = require('./github');
const gitlab = require('./gitlab');
const token = require('./token');

const SERVICE_TYPE = {
  GITHUB: 'github',
  GITLAB: 'gitlab',
};

const SERVICE = {
  [SERVICE_TYPE.GITHUB]: github,
  [SERVICE_TYPE.GITLAB]: gitlab,
};

const getService = (type, method) => SERVICE[type][method];

module.exports = {
  SERVICE_TYPE,
  getService,
  ...token,
};
