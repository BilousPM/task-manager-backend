import { UserCollection } from '../db/models/user.js';

// ----- Update user Profile -----
export const updateUserProfile = (_id, updateFields) => UserCollection.findByIdAndUpdate(_id, updateFields, {
  new: true,
});

export const deleteUser = async (req, res) => {
  const { _id } = req.user;
  await UserCollection.findOneAndDelete({ _id });
};
