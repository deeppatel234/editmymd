const express = require('express');
const axios = require('axios');

const { auth } = require('../../utilities/middlewares');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const { accessToken } = req.user;
  const apiOptions = {
    url: 'https://api.github.com/user/repos',
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  };

  try {
    const { data } = await axios(apiOptions);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
