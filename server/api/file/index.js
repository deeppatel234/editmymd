const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { APIError } = require('../../utils/errors');
const { getService } = require('../../service');
const { asyncError } = require('../../utils/errors');

const router = express.Router();

router.get(
  '/',
  celebrate({
    query: {
      repoId: Joi.string().required(),
      path: Joi.string().required(),
      branch: Joi.string().required(),
    },
  }),
  asyncError(async (req, res) => {
    const { type, ...userInfo } = req.user;
    const { path, branch, repoId } = req.query;

    if (!path.endsWith('.md')) {
      throw new APIError(
        'file should be a markdown (.md) file',
        500,
        'Invalid File',
      );
    }

    res.json(
      await getService(type, 'fileContent')(userInfo, {
        repoId,
        path,
        branch,
      }),
    );
  }),
);

router.put(
  '/commit',
  celebrate({
    body: {
      repoId: Joi.string().required(),
      path: Joi.string().required(),
      branch: Joi.string().required(),
      message: Joi.string().required(),
      content: Joi.string().required(),
      isNewFile: Joi.boolean().required(),
      sha: Joi.string(),
    },
  }),
  asyncError(async (req, res) => {
    const { type, ...userInfo } = req.user;
    const { repoId, path, branch, message, content, sha, isNewFile } = req.body;

    if (!path.endsWith('.md')) {
      throw new APIError(
        'file should be a markdown (.md) file',
        500,
        'Invalid File',
      );
    }

    res.json(
      await getService(type, 'commitFileContent')(userInfo, {
        repoId,
        path,
        branch,
        message,
        content,
        sha,
        isNewFile,
      }),
    );
  }),
);

module.exports = router;
