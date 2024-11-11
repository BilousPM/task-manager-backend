import createHttpError from 'http-errors';
import { deleteUser, updateUserProfile } from '../services/users.js';
import bcrypt from 'bcrypt';
import { findUserById } from '../services/auth.js';
import { getAllBoards} from '../services/boards.js';
import { getAllColumnsByBoardId } from '../services/columns.js';
import { getCardsByColumnId } from '../services/card.js';
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
      avatarURL: user.avatarUrl,
      theme: user.theme,
    },boards, columns: allBoardsColumns, cards},
  });
};

// ----- Update User Profile -----
export const updateUserProfileController = async (req, res) => {
  const data = req.body;
  const avatar = req.file;
  const { _id } = req.user;

  if (!_id) {
    throw createHttpError(401, 'Unauthorized error');
  }


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

  if (!_id) {
    throw createHttpError(401, 'Unauthorized user');
  }
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

