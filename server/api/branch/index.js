const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getService } = require('../../service');
const { asyncError } = require('../../utils');

const router = express.Router();

router.get(
  '/info',
  celebrate({
    query: {
      repoId: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  asyncError(
    async (req, res) => {
      const { type, ...userInfo } = req.user;
      const { repoId, branch } = req.query;

      res.json(
        await getService(type, 'branchInfo')(userInfo, {
          repoId,
          branch,
        }),
      );
    },
    {
      message: 'unable to get branch info',
    },
  ),
);

router.get(
  '/tree',
  celebrate({
    query: {
      repoId: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  asyncError(
    async (req, res) => {
      const { type, ...userInfo } = req.user;
      const { branch, repoId } = req.query;

      res.json(
        await getService(type, 'branchTree')(userInfo, {
          repoId,
          branch,
        }),
      );
    },
    {
      message: 'unable to fetch file paths',
    },
  ),
);

module.exports = router;
