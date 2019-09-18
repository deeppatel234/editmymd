const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getService } = require('../../service');

const router = express.Router();

router.get(
  '/',
  celebrate({
    query: {
      repo: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { accessToken, type, userId } = req.user;
    const { repo } = req.query;

    try {
      res.json(
        await getService(type, 'listBranches')(accessToken, {
          owner: userId,
          repo,
        }),
      );
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
);

router.get(
  '/tree',
  celebrate({
    query: {
      branch: Joi.string().required(),
      repo: Joi.string().required(),
      sha: Joi.string(),
    },
  }),
  async (req, res) => {
    const { accessToken, type, userId } = req.user;
    const { branch, repo, sha } = req.query;

    try {
      res.json(
        await getService(type, 'getMDFilePaths')(accessToken, {
          owner: userId,
          repo,
          branch,
          sha,
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
