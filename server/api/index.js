const express = require('express');
const { errors } = require('celebrate');

const { isAuth, attachCurrentUser } = require('./middlewares');

const router = express.Router();

const user = require('./user');
const repo = require('./repo');
const branch = require('./branch');
const oauth = require('./oauth');

router.use('/oauth_redirect', oauth);

router.use(isAuth);
router.use(attachCurrentUser);

router.use('/user', user);
router.use('/repo', repo);
router.use('/branch', branch);
router.use(errors());

module.exports = router;
