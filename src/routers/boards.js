import { Router } from 'express';

import {
  getBoardsController,
  getBoardByIdController,
  createBoardController,
  updateBoardController,
  deleteBoardController,
} from '../controllers/boards.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { createBoardSchema, updateBoardSchema } from '../validations/boards.js';
import { isValidId } from '../middlewares/isValidId.js';

const boardsRouter = Router();

boardsRouter.use('/',authenticate);
boardsRouter.use('/:boardId',isValidId('boardId'));

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController)
);

boardsRouter.get('/',
  ctrlWrapper(getBoardsController)
);

boardsRouter.get('/:boardId',
  ctrlWrapper(getBoardByIdController)
);


boardsRouter.patch(
  '/:boardId',
  validateBody(updateBoardSchema),
  ctrlWrapper(updateBoardController),
);

boardsRouter.delete('/:boardId',
    ctrlWrapper(deleteBoardController));


    export default boardsRouter;


    // boardsRouter.put(
    //   '/:boardId',
    //   // isValidId,
    //   //upload.single('background'),
    //   validateBody(createBoardSchema),
    //   ctrlWrapper(upsertBoardController),
    // );


  // boardsRouter.post(
  //   '/register',
  //   validateBody(createBoardSchema),
  //   ctrlWrapper(createBoardController),
  // );



// =========== Змінені роути =======

// boardsRouter.post(
//   '/',
//   isValidId,
//   upload.single('background'),
//   validateBody(createBoardSchema),
//   ctrlWrapper(createBoardController),
// );

// boardsRouter.patch(
//   '/:boardId',
//   isValidId,
//   upload.single('background'),
//   validateBody(updateBoardSchema),
//   ctrlWrapper(patchBoardController),
// );
