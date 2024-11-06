import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { boardId } = req.params;
  if (!isValidObjectId(boardId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
