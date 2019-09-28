const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { userSaveOrUpdate } = require('../../model/user');
const { getService, generateToken } = require('../../service');
const { asyncError } = require('../../utils/errors');

const router = express.Router();

router.get(
  '/',
  celebrate({
    query: {
      code: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  asyncError(async (req, res) => {
    const { code, state } = req.query;

    const accessToken = await getService(state, 'generateAccessToken')(code);
    const user = await getService(state, 'user')(accessToken);
    const { _id } = await userSaveOrUpdate(user);
    const token = generateToken(_id.toString());

    res.redirect(`/oauth/${token}`);
  }),
);

module.exports = router;
