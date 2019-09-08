const express = require('express');

const router = express.Router();

const user = require('./user');
const repo = require('./repo');
const readmd = require('./readmd');

router.use('/user', user);
router.use('/repo', repo);
router.use('/readmd', readmd);

module.exports = router;
