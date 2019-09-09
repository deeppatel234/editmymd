const express = require('express');
const _pick = require('lodash/pick');

const { auth } = require('../../utilities/middlewares');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  res.json(
    _pick(req.user, [
      'email',
      'name',
      'profilePicture',
      'type',
      'userId',
      '_id',
    ]),
  );
});

module.exports = router;
