const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: { type: String, required: true },
  userId: { type: String, required: true },
  name: String,
  email: String,
  profilePicture: String,
  accessToken: String,
  accountInfo: Object,
});

userSchema.index({ type: 1, userId: 1 }, { unique: true });

const User = mongoose.model('user', userSchema);

const userSaveOrUpdate = async user => {
  return User.findOneAndUpdate(
    {
      userId: user.userId,
      type: user.type,
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
