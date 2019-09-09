const express = require('express');

const { auth } = require('../../utilities/middlewares');
const { getService } = require('../../service');

const router = express.Router();

router.use(auth);

router.get('/tree', async (req, res) => {
  const { accessToken, type, userId } = req.user;
  const { branch = 'master', repo } = req.query;

  try {
    const branchInfo = await getService(type, 'getBranchInfo')(accessToken, {
      owner: userId,
      repo,
      branch,
    });
    if (!branchInfo) {
      throw new Error('branch not found');
    }
    const { tree } = await getService(type, 'getBranchTree')(accessToken, {
      owner: userId,
      repo,
      treeHash: branchInfo.commit.sha,
    });
    res.json(tree.filter(t => t.path.includes('README.md')));
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
