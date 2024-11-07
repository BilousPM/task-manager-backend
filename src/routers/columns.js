
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js'; // Waiting for auth
import {
  createColumnController,
  updateColumnController,
  deleteColumnController,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnsSchema, updateColumnsSchema } from '../validations/columns.js';
import { isValidId } from '../middlewares/isValidId.js';


const columnsRouter = Router();
columnsRouter.use('/', authenticate);

columnsRouter.post(
  '/:boardId',
  // isValidId,
  validateBody(createColumnsSchema),
  ctrlWrapper(createColumnController),
);

columnsRouter.patch(
  '/:columnId',
  // isValidId,
  validateBody(updateColumnsSchema),
  ctrlWrapper(updateColumnController),
);

columnsRouter.delete(
  '/:columnId',
  // isValidId,co
  ctrlWrapper(deleteColumnController),
);



export default columnsRouter;
