import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper';
import { authenticate, validateBody } from '../../middlewares'; // Waiting for auth
import { boardSchema } from '../../models/board/'; // Waiting for boardSchema

const router = express.Router();

router.post(
  '/:boardId',
  validateBody(boardSchema.addColumn),
  authenticate,
  ctrlWrapper.addColumnInBoard,
);

router.get('/:boardId', authenticate, ctrlWrapper.getColumns);

router.put('/', authenticate, ctrlWrapper.updateColumn);

router.delete('/', authenticate, ctrlWrapper.deleteColumn);

module.exports = router;
