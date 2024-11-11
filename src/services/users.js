import { UserCollection } from '../db/models/user.js';

// ----- Update User Profile -----
export const updateUserProfile = (_id, updateFields) => UserCollection.findByIdAndUpdate(_id, updateFields, {
  new: true,
});

// ----- Delete User -----
export const deleteUser = async (req, res) => {
  const { _id } = req.user;
 return await UserCollection.findOneAndDelete({ _id });
};
