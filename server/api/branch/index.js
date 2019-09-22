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
  '/info',
  celebrate({
    query: {
      id: Joi.number(),
      repo: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { accessToken, type, userId } = req.user;
    const { repo, branch, id } = req.query;

    try {
      res.json(
        await getService(type, 'getBranchInfo')(accessToken, {
          owner: userId,
          repo,
          branch,
          id,
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
      id: Joi.number(),
      branch: Joi.string().required(),
      repo: Joi.string().required(),
      sha: Joi.string(),
    },
  }),
  async (req, res) => {
    const { accessToken, type, userId } = req.user;
    const { branch, repo, sha, id } = req.query;

    try {
      res.json(
        await getService(type, 'getMDFilePaths')(accessToken, {
          owner: userId,
          repo,
          branch,
          sha,
          id,
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
