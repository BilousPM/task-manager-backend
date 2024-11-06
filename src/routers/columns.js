import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js'; // Waiting for auth
import {
  createColumnController,
  updateColumnController,
  deleteColumnController,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnsSchema } from '../validations/columns.js';
import { isValidId } from '../middlewares/isValidId.js';

const columnsRouter = Router();

columnsRouter.use('/', authenticate);

columnsRouter.post(
  '/:boardId',
  // isValidId,
  validateBody(createColumnsSchema),
  ctrlWrapper(createColumnController),
);

columnsRouter.put(
  '/',
  // isValidId,
  validateBody(createColumnsSchema),
  ctrlWrapper(updateColumnController),
);

columnsRouter.post('/', isValidId, ctrlWrapper(deleteColumnController));
export default columnsRouter;
