const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const { auth } = require('../../utilities/middlewares');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const { accessToken, userId } = req.user;
  const { repo } = req.query;
  const apiOptions = {
    url: `https://api.github.com/repos/${userId}/${repo}/readme`,
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  };

  try {
    const { data } = await axios(apiOptions);

    const string = Buffer.from(data.content, 'base64').toString('utf-8');

    res.json({
      content: string,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.post('/commit', async (req, res) => {
  const { branch, content, repo, sha } = req.body;
  const { accessToken, userId } = req.user;

  const baseContent = Buffer.from(content).toString('base64');

  // const sha = crypto.createHash('sha');
  // sha.update(baseContent);
  // const hash = sha.digest('hex');
  // console.log(hash);

  const apiOptions = {
    url: `https://api.github.com/repos/${userId}/${repo}/contents/README.md`,
    method: 'put',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
    data: {
      message: 'test commit',
      content: baseContent,
      sha,
      branch,
    },
  };

  try {
    const { data } = await axios(apiOptions);

    res.json({
      content: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
  // const { repo } = req.query;
  // const apiOptions = {
  //   url: `https://api.github.com/repos/${userId}/${repo}/readme`,
  //   method: 'get',
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `token ${accessToken}`,
  //   },
  // };

  // try {
  //   const { data } = await axios(apiOptions);

  //   const string = Buffer.from(data.content, 'base64').toString('utf-8');

  //   res.json({
  //     content: string,
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //   });
  // }
});

module.exports = router;