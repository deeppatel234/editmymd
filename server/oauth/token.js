const { getUser } = require('../api/user/modal');

const verifyAccessToken = async token => {
  try {
    const user = await getUser(token);
    if (user) {
      return {
        user,
        isValid: true,
      };
    }
    return {
      isValid: false,
    }
  } catch (err) {
    return {
      isValid: false,
    };
  }
};

module.exports = {
  verifyAccessToken,
};
