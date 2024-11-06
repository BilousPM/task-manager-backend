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
  '/',
  isValidId,
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

router.put(
  '/:cardId',
  isValidId,
  validateBody(createCardSchema),
  ctrlWrapper(upsertCardController),
);

router.patch(
  '/:cardId',
  isValidId,
  validateBody(updateCardSchema),
  ctrlWrapper(patchCardController),
);

router.delete('/:cardId', isValidId, ctrlWrapper(deleteCardController));

export default router;
