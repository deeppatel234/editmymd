const express = require('express');

const { auth } = require('../../utilities/middlewares');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
