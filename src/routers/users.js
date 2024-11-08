import { Router } from 'express';
import {
  changeThemeController,
  deleteUserController,
  getCurrentUserController,
  updateUserProfileController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  userUpdateProfileSchema,
  userUpdateThemeSchema,
} from '../validations/users.js';
import {authenticate} from '../middlewares/authenticate.js';

const usersRouter = Router();

usersRouter.use('/', authenticate);

usersRouter.get('/current', ctrlWrapper(getCurrentUserController));

usersRouter.patch(
  '/profile',
  upload.single('avatar'),
  validateBody(userUpdateProfileSchema),
  ctrlWrapper(updateUserProfileController),
);

usersRouter.patch(
  '/theme',
  validateBody(userUpdateThemeSchema),
  ctrlWrapper(changeThemeController),
);

usersRouter.delete('/delete-user', deleteUserController);

export default usersRouter;
