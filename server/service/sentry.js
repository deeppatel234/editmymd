const Sentry = require('@sentry/node');
const { ExtraErrorData } = require('@sentry/integrations');

const config = require('../config');

Sentry.init({
  dsn: config.sentryURL,
  integrations: [new ExtraErrorData()],
});

module.exports = Sentry;
