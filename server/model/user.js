const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: String,
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  profilePicture: String,
  accessToken: String,
  accountInfo: Object,
});

const User = mongoose.model('user', userSchema);

const userSaveOrUpdate = async user => {
  return User.findOneAndUpdate(
    {
      userId: user.userId,
    },
    user,
    { new: true, upsert: true },
  );
};

const getUser = id => User.findById(id);

module.exports = {
  getUser,
  userSaveOrUpdate,
};
