import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createCardController,
  deleteCardController,
  patchCardController,
  upsertCardController,
} from '../controllers/card.js';
import { authenticate } from '../middlewares/authenticate.js';

import { createCardSchema, updateCardSchema } from '../validations/card.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.use(authenticate);

router.post(
  '/:boardId',
  isValidId,
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

router.put(
  '/:boardId',
  isValidId,
  validateBody(createCardSchema),
  ctrlWrapper(upsertCardController),
);

router.patch(
  '/:boardId',
  isValidId,
  validateBody(updateCardSchema),
  ctrlWrapper(patchCardController),
);

router.delete('/:boardId', isValidId, ctrlWrapper(deleteCardController));

export default router;