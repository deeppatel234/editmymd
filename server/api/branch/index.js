const express = require('express');

const { auth } = require('../../utilities/middlewares');
const { getService } = require('../../service');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const { accessToken, type } = req.user;

  try {
    const repos = await getService(type, 'getRepositories')(accessToken);
    res.json(repos);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
