const mongoose = require('mongoose');
const { ACCOUNT_TYPE } = require('../../const');

const userSchema = new mongoose.Schema({
  type: String,
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  profilePicture: String,
  accessToken: String,
  git: Object,
});

const User = mongoose.model('user', userSchema);

const prepareGithubUserData = user => {
  return {
    name: user.name,
    email: user.email,
    userId: user.login,
    profilePicture: user.avatar_url,
    git: user,
  };
};

const saveOrUpdate = async (type, data, accessToken) => {
  let user = { type, accessToken };

  if (type === ACCOUNT_TYPE.GITHUB) {
    user = { ...user, ...prepareGithubUserData(data) };
  }

  const savedUser = await User.findOneAndUpdate(
    {
      userId: user.userId,
    },
    user,
    { upsert: true },
  );

  return savedUser;
};

const getUser = id => {
  return User.findById(id);
};

module.exports = {
  getUser,
  userSaveOrUpdate: saveOrUpdate,
};
