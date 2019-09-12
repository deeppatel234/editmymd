const { getUser } = require('../../model/user');

const attachCurrentUser = async (req, res, next) => {
  try {
    const user = await getUser(req.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'user not found',
    });
  }
};

module.exports = attachCurrentUser;
