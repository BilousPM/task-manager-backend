// src/routers/boards.js

import { Router } from 'express';

import {
  getBoardsController,
  getBoardByIdController,
  createBoardController,
  deleteBoardController,
  upsertBoardController,
  patchBoardController,
} from '../controllers/boards.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/boards/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

import { createBoardSchema, updateBoardSchema } from '../validations/boards.js';

const router = Router();

router.use(authenticate); // аутентифікація user і  запис user в  req.user через middleware

router.get('/', ctrlWrapper(getBoardsController));
router.get('/:boardId', isValidId, ctrlWrapper(getBoardByIdController));
router.post(
  '/register',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);
router.post(
  '/',
  // isValidId,
  upload.single('background'),
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);
router.delete('/:boardId', isValidId, ctrlWrapper(deleteBoardController));
router.put(
  '/:boardId',
  isValidId,
  //upload.single('background'),
  validateBody(createBoardSchema),
  ctrlWrapper(upsertBoardController),
);
router.patch(
  '/:boardId',
  isValidId,
  upload.single('background'),
  validateBody(updateBoardSchema),
  ctrlWrapper(patchBoardController),
);
export default router;
