const express = require('express');
const { userSaveOrUpdate } = require('../api/user/modal');

const { getAccessToken, getUserDetails } = require('./github');
const { ACCOUNT_TYPE } = require('../const');

const router = express.Router();

router.use(async (req, res) => {
  const { code } = req.query;
  try {
    const accessToken = await getAccessToken(code);
    const user = await getUserDetails(accessToken);

    const { _id } = await userSaveOrUpdate(
      ACCOUNT_TYPE.GITHUB,
      user,
      accessToken,
    );

    res.redirect(`/login-success/?token=${_id}`);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
