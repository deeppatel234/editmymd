const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { auth } = require('../../utilities/middlewares');
const { getService } = require('../../service');

const router = express.Router();

router.use(auth);

router.get(
  '/tree',
  celebrate({
    query: {
      branch: Joi.string().required(),
      repo: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { accessToken, type, userId } = req.user;
    const { branch, repo } = req.query;

    try {
      res.json(
        await getService(type, 'getReadMDPaths')(accessToken, {
          owner: userId,
          repo,
          branch,
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
