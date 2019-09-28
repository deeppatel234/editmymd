const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getService } = require('../../service');
const { asyncError } = require('../../utils/errors');

const router = express.Router();

router.get(
  '/info',
  celebrate({
    query: {
      repoId: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  asyncError(async (req, res) => {
    const { type, ...userInfo } = req.user;
    const { repoId, branch } = req.query;

    res.json(
      await getService(type, 'branchInfo')(userInfo, {
        repoId,
        branch,
      }),
    );
  }),
);

router.get(
  '/tree',
  celebrate({
    query: {
      repoId: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  asyncError(async (req, res) => {
    const { type, ...userInfo } = req.user;
    const { branch, repoId } = req.query;

    res.json(
      await getService(type, 'branchTree')(userInfo, {
        repoId,
        branch,
      }),
    );
  }),
);

module.exports = router;
