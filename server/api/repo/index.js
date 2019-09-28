const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getService } = require('../../service');
const { asyncError } = require('../../utils/errors');

const router = express.Router();

router.get(
  '/',
  asyncError(async (req, res) => {
    const { type, ...userInfo } = req.user;
    res.json(await getService(type, 'repositoriesList')(userInfo));
  }),
);

router.get(
  '/search',
  celebrate({
    query: {
      query: Joi.string().required(),
    },
  }),
  asyncError(async (req, res) => {
    const { type, ...userInfo } = req.user;
    const { query } = req.query;

    res.json(
      await getService(type, 'searchRepositories')(userInfo, {
        query,
      }),
    );
  }),
);

module.exports = router;
