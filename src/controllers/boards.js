// src/controllers/boards.js

import {
  getAllBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  updateBoard,
  getAllColumnsByBoardId,
  getAllCardsByBoardId,
} from '../services/boards.js';
import createHttpError from 'http-errors';
//import { parsePaginationParams } from '../utils/boards/parsePaginationParams.js';
//import { parseSortParams } from '../utils/boards/parseSortParams.js';
//import { parseFilterParams } from '../utils/boards/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/boards/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/boards/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getBoardsController = async (req, res, next) => {
  const user = req.user._id;
  const boards = await getAllBoards(user);

  res.json({
    status: 200,
    message: 'Successfully found boards!',
    data: boards,
  });
};

export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const user = req.user._id;
  try {
    // console.log('user:', user);
    //  console.log('board tipe:', typeof boardId);

    const board = await getBoardById(boardId, user);
    const columns = await getAllColumnsByBoardId(boardId, user);
    const cards = await getAllCardsByBoardId(boardId, user);

    if (!board) {
      throw createHttpError(404, 'Board not  found');
    }

    res.json({
      status: 200,
      message: `Successfully found board with id ${boardId}!`,
      board: board,
      columns: columns,
      cards: cards,
    });
  } catch (err) {
    throw createHttpError(404, `Board with Id: ${boardId} not found`);
  }
};

export const createBoardController = async (req, res, next) => {
  const photo = req.file;
  let photoUrl = '';
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const board = await createBoard(req.body, req.user, photoUrl);
  res.status(201).json({
    status: 201,
    message: `Successfully created a board!`,
    data: board,
  });
};

export const deleteBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const { userId } = req.user;
  const board = await deleteBoard(boardId, userId);
  if (!board) {
    next(createHttpError(404, `Board with Id  ${boardId} not found in db!`));
    return;
  }
  res.status(204).send();
};

export const upsertBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const result = await updateBoard(boardId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, `Board with Id ${boardId}  not found !`));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully update a board Id ${boardId} !`,
    data: result.board,
  });
};

export const patchBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateBoard(boardId, {
    ...req.body,
    background: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, `Board with Id ${boardId} not found`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a board Id: ${boardId}!`,
    data: result.board,
  });
};
