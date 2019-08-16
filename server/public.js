const express = require('express');
const path = require('path');
const fs = require('fs');

const { DIST_INDEX_PATH, DIST_PATH } = require('./path');

const router = express.Router();

router.get('*.js', (req, res, next) => {
  const gzFile = `${req.url}.gz`;
  if (fs.existsSync(path.join(DIST_PATH, gzFile))) {
    req.url = gzFile;
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
  }
  next();
});

// Use Static Paths
router.use(express.static(DIST_PATH));

router.use((req, res) => res.sendFile(DIST_INDEX_PATH));

module.exports = router;
