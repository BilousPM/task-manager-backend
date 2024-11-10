// import fs from 'fs/promises';
import createHttpError from 'http-errors';
import { deleteUser, updateUserProfile } from '../services/users.js';
// import { saveImageToCloudinary } from '../utils/saveImageToCloudinary.js';
// import { parse } from 'path';
import bcrypt from 'bcrypt';

import { findUserById } from '../services/auth.js';
import { getAllBoards} from '../services/boards.js';
import { getAllColumnsByBoardId } from '../services/columns.js';
import { getCardsByColumnId } from '../services/card.js';
import { saveImage } from '../utils/saveImage.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveImageToCloudinary.js';




//----- Get All Carent Users's Informations -----
export const getCurrentUserController = async (req, res) => {
const userId = req.user._id;
  const user = await findUserById(userId);

  if (!user) {
    throw createHttpError(401, 'User unauthorized');
  }

  const boards = await getAllBoards(userId);
  const boardsId = boards.map(item => item._id);
  const allBoardsColumns = [];

  for(const id of boardsId){
    allBoardsColumns.push(... await getAllColumnsByBoardId(id));
  }

  const allColumsId = allBoardsColumns.map(item => item._id);
  const cards = [];
  for(const item of allColumsId)
    {
      const cardsArray = await getCardsByColumnId(item);
      cards.push(...cardsArray);

    };

  res.status(200).json({
    status: 200,
    message: ` Successfully found user with id ${userId} !`,
    data: {user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      theme: user.theme,
    },boards, columns: allBoardsColumns, cards},
  });
};

// ----- Update User Profile -----
export const updateUserProfileController = async (req, res) => {
  const data = req.body;
  const avatar = req.file;
  const { _id } = req.user;

  let avatarUrl;
  if (avatar) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(avatar);
    } else {
      avatarUrl = await saveFileToUploadDir(avatar);
    }
  }

  const newPassword = {};
  if (data.password) {
   newPassword.password = await bcrypt.hash(data.password, 10);


  }

    const updateUser = await updateUserProfile(_id,{...data, ...newPassword, avatarUrl});

    if (!updateUser) {
      throw createHttpError(404, `User not found`);
    }

    res.json({
      status:200,
      message: 'Profile updated successfully',
      date: updateUser
    });

};

// ----- Change Thema -----
export const changeThemeController = async(req, res) => {
  const { _id } = req.user;
  const theme = req.body;

    const user = await updateUserProfile(_id, theme, {
      new: true,
    });

    if (!user) {
      throw createHttpError(404, `User not found`);
    }

    res.json({
      status:200,
      message: 'Theme changed successfully',
      date: theme
    });
};

// ----- Delete User ----- (not yet used)
export const deleteUserController = async (req, res) => {
  const user = await deleteUser(req.body);
  if (!user) {
    throw createHttpError(404, `User not found`);
  }

  res.status(204).json({ message: 'Successful operation' });
};


// ----- Get Carent Users Without Boars
// export const getCurrentUserController = async (req, res) => {
// const userId = req.user._id;
//   const user = await findUserById(userId);

//   if (!user) {
//     throw createHttpError(401, 'User unauthorized');
//   }


//   res.status(200).json({
//     status: 200,
//     message: ` Successfully found user with id ${userId} !`,
//     data: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       avatarURL: user.avatarURL,
//       theme: user.theme,
//     }
//   });
// };

// export const updateUserProfileController = async (req, res) => {
//   const data = req.body;
//   const avatar = req.file;
//   console.log(data);
//   console.log(avatar);
//   const { _id } = req.user;
//   const { name, email, password, } = req.body;




//   const updateFields = {};

//   if (name) updateFields.name = name;
//   if (email) updateFields.email = email;
//   if (password) {
//     updateFields.password = await bcrypt.hash(password, 10);
//   }

//     const user = await updateUserProfile(_id, updateFields, {
//       new: true,
//     });

//     if (!user) {
//       throw createHttpError(404, `User not found`);
//     }

//     res.json({
//       status:200,
//       message: 'Profile updated successfully',
//       date:{name: user.name,
//         email: user.email,
//         password: password}
//     });

// };

// export const patchAvatarController = async (req, res) => {
//   const { _id } = req.user;
//   const { path, originalname } = req.file;

//   const { name: fileName } = parse(originalname);

//   const options = {
//     public_id: `${_id}_${fileName}`,
//     unique_filename: false,
//     overwrite: true,
//     folder: 'avatars',
//     transformation: [{ height: 100, width: 100, crop: 'scale' }],
//   };

//   try {
//     const { url } = await saveImageToCloudinary.uploader.upload(path, options);

//     const user = await UserCollection.findOneAndUpdate(
//       { _id },
//       { avatarURL: url },
//       { new: true },
//     );

//     if (!user) {
//       throw createHttpError(404, `User find`);
//     }

//     if (path) {
//       await fs.unlink(path);
//     }

//     res.json({
//       message: 'Operation is successfully',
//       avatarURL: user.avatarURL,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const patchProfileController = async (req, res) => {
//   const { _id } = req.user;
//   const { name, email, password } = req.body;

//   const updateFields = {};

//   if (name) updateFields.name = name;
//   if (email) updateFields.email = email;
//   if (password) {
//     updateFields.password = await bcrypt.hash(password, 10);
//   }

//   try {
//     const user = await UserCollection.findByIdAndUpdate(_id, updateFields, {
//       new: true,
//     });

//     if (!user) {
//       throw createHttpError(404, `User not found`);
//     }

//     res.json({
//       message: 'Profile updated successfully',
//       name: user.name,
//       email: user.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
