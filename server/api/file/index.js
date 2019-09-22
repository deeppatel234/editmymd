const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getService } = require('../../service');

const router = express.Router();

router.get(
  '/',
  celebrate({
    query: {
      id: Joi.number(),
      repo: Joi.string().required(),
      path: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { type, accessToken, userId } = req.user;
    const { repo, path, branch, id } = req.query;

    try {
      res.json(
        await getService(type, 'getFileContent')(accessToken, {
          repo,
          path,
          branch,
          id,
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
      id: Joi.number(),
      repo: Joi.string().required(),
      path: Joi.string().required(),
      branch: Joi.string().required(),
      message: Joi.string().required(),
      content: Joi.string().required(),
      sha: Joi.string(),
      isNewFile: Joi.boolean(),
    },
  }),
  async (req, res) => {
    const {
      repo,
      path,
      branch,
      message,
      content,
      sha,
      id,
      isNewFile,
    } = req.body;
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
          id,
          isNewFile,
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
