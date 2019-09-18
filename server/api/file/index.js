const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getService } = require('../../service');

const router = express.Router();

router.get(
  '/',
  celebrate({
    query: {
      repo: Joi.string().required(),
      path: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { type, accessToken, userId } = req.user;
    const { repo, path, branch } = req.query;

    try {
      res.json(
        await getService(type, 'getFileContent')(accessToken, {
          repo,
          path,
          branch,
          owner: userId,
        }),
      );
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
);

router.put(
  '/commit',
  celebrate({
    body: {
      repo: Joi.string().required(),
      path: Joi.string().required(),
      branch: Joi.string().required(),
      message: Joi.string().required(),
      content: Joi.string().required(),
      sha: Joi.string(),
    },
  }),
  async (req, res) => {
    const { repo, path, branch, message, content, sha } = req.body;
    const { type, accessToken, userId } = req.user;

    try {
      res.json(
        await getService(type, 'commitFileContent')(accessToken, {
          repo,
          path,
          branch,
          owner: userId,
          message,
          content,
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
