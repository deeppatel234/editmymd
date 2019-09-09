const express = require('express');
const { userSaveOrUpdate } = require('../../model/user');
const { getService } = require('../../service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { code, state } = req.query;

  try {
    const accessToken = await getService(state, 'getAccessToken')(code);
    const user = await getService(state, 'getUser')(accessToken);
    const { _id } = await userSaveOrUpdate(user);

    res.redirect(`/oauth/${_id}`);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;