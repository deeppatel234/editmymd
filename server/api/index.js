const express = require('express');
const { errors } = require('celebrate');

const { isAuth, attachCurrentUser, errorHandler } = require('./middlewares');

const router = express.Router();

const user = require('./user');
const repo = require('./repo');
const branch = require('./branch');
const oauth = require('./oauth');
const file = require('./file');

router.use('/oauth_redirect', oauth);

router.use(isAuth);
router.use(attachCurrentUser);

router.use('/user', user);
router.use('/repo', repo);
router.use('/branch', branch);
router.use('/file', file);
router.use(errors());
router.use(errorHandler);

module.exports = router;
