const express = require('express');
const { errors } = require('celebrate');

const router = express.Router();

const user = require('./user');
const repo = require('./repo');
const branch = require('./branch');
const oauth = require('./oauth');

router.use('/user', user);
router.use('/repo', repo);
router.use('/branch', branch);
router.use('/oauth_redirect', oauth);
router.use(errors());

module.exports = router;
