const github = require('./github');

const SERVICE_TYPE = {
  GITHUB: 'github',
};

const SERVICE = {
  [SERVICE_TYPE.GITHUB]: github,
};

const getService = (type, method) => SERVICE[type][method];

module.exports = {
  SERVICE_TYPE,
  getService,
};
