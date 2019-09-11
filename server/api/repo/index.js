const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { isAuth } = require('../middlewares');
const { getService } = require('../../service');

const router = express.Router();

router.use(isAuth);

router.get('/', async (req, res) => {
  const { accessToken, type } = req.user;

  try {
    res.json(await getService(type, 'getRepositories')(accessToken));
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.get(
  '/search',
  celebrate({
    query: {
      query: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { accessToken, type, userId } = req.user;
    const { query } = req.query;

    try {
      res.json(
        await getService(type, 'searchRepositories')(accessToken, {
          query,
          username: userId,
        }),
      );
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
);

module.exports = router;
