import { Router } from 'express';
// import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createCardController,
  deleteCardController,
  patchCardController,
} from '../controllers/card.js';
import { authenticate } from '../middlewares/authenticate.js';

import { createCardSchema, replaceColumnSchema, updateCardSchema } from '../validations/card.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.use('/', authenticate);

router.post(
  '/:columnId',
  // isValidId,
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

router.patch(
  '/:cardId',
  // isValidId,
  validateBody(updateCardSchema),
  ctrlWrapper(patchCardController),
);

router.patch(
  '/replace/:cardId',
  // isValidId,
  validateBody(replaceColumnSchema),
  ctrlWrapper(patchCardController),
);

router.delete('/:cardId',
  //  isValidId,
  ctrlWrapper(deleteCardController));

// router.put(
//   '/:cardId',
//   isValidId,
//   validateBody(createCardSchema),
//   ctrlWrapper(upsertCardController),
// );


export default router;
