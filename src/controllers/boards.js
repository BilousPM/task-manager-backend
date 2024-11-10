// src/controllers/boards.js

import {
  getAllBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  updateBoard,
} from '../services/boards.js';
import createHttpError from 'http-errors';
import { deleteColumnsByBoardId, getAllColumnsByBoardId } from '../services/columns.js';
import { deleteCardsById, getCardsByColumnId } from '../services/card.js';

// ----- Create Board -----
export const createBoardController = async (req, res, next) => {
  const board = await createBoard(req.body, req.user);

  res.status(201).json({
    status: 201,
    message: `Successfully created a board!`,
    data: board,
  });
};

// ----- Get Board By Id -----
export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;

  const board = await getBoardById(boardId);
  const columns = await getAllColumnsByBoardId(boardId);
const columnsAll = [];

for(const column of columns){
  const {_id, title, boardId} = column;
  const cardsArray = await getCardsByColumnId(column._id);
  const colunmInfo = {};
colunmInfo._id = _id;
colunmInfo.title = title;
colunmInfo.boardId = boardId;
colunmInfo.cards = cardsArray;
columnsAll.push(colunmInfo);
}

  if (!board) {
    throw createHttpError(404, 'Board not  found');
  }

  res.json({
    status: 200,
    message: `Successfully found board with id ${boardId}!`,
    data: {board, columnsAll},
  });

};

// ----- Get All Boards By User Id -----
export const getBoardsController = async (req, res, next) => {
  const owner= req.user._id;
  const boards = await getAllBoards(owner);

  res.json({
    status: 200,
    message: 'Successfully found boards!',
    data:{ boards}
  });
};

// ----- Update Board -----
export const updateBoardController = async (req, res, next) => {
  const { boardId } = req.params;

  const result = await updateBoard(boardId, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, `Board with Id ${boardId} not found`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated a board with Id: ${boardId}!`,
    data: result.board,
  });
};

// ----- Delete Board With All Informations -----
export const deleteBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const columns = await getAllColumnsByBoardId(boardId);
  const columnsId = columns.map(column => column._id);

  for(const item of columnsId)
    {
      await deleteCardsById(item);
    };
    await deleteColumnsByBoardId(boardId);
    await deleteBoard(boardId);

  res.status(204).send();
};




// ====== Контроллер не використовується ========
// export const upsertBoardController = async (req, res, next) => {
//   const { boardId } = req.params;
//   const result = await updateBoard(boardId, req.body, { upsert: true });
//   if (!result) {
//     next(createHttpError(404, `Board with Id ${boardId}  not found !`));
//     return;
//   }
//   const status = result.isNew ? 201 : 200;
//   res.status(status).json({
//     status,
//     message: `Successfully update a board Id ${boardId} !`,
//     data: result.board,
//   });
// };


// =========================== Контроллери що були зміннені ================

// export const createBoardController = async (req, res, next) => {
//   const photo = req.file;
//   let photoUrl = '';
//   if (photo) {
//     if (env('ENABLE_CLOUDINARY') === 'true') {
//       photoUrl = await saveFileToCloudinary(photo);
//     } else {
//       photoUrl = await saveFileToUploadDir(photo);
//     }
//   }

//   const board = await createBoard(req.body, req.user, photoUrl);
//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a board!`,
//     data: board,
//   });
// };


// export const getBoardByIdController = async (req, res) => {
//   const { boardId } = req.params;
//   const user = req.user._id;
//   try {
//     console.log('user:', user);
//      console.log('board tipe:', typeof boardId);

//     const board = await getBoardById(boardId, user);
//     const columns = await getAllColumnsByBoardId(boardId, user);
//     const cards = await getAllCardsByBoardId(boardId, user);

//     if (!board) {
//       throw createHttpError(404, 'Board not  found');
//     }

//     res.json({
//       status: 200,
//       message: `Successfully found board with id ${boardId}!`,
//       board: board,
//       columns: columns,
//       cards: cards,
//     });
//   } catch (err) {
//     throw createHttpError(404, `Board with Id: ${boardId} not found`);
//   }
// };

// export const patchBoardController = async (req, res, next) => {
//   const { boardId } = req.params;
//   const photo = req.file;
//   let photoUrl;
//   if (photo) {
//     if (env('ENABLE_CLOUDINARY') === 'true') {
//       photoUrl = await saveFileToCloudinary(photo);
//     } else {
//       photoUrl = await saveFileToUploadDir(photo);
//     }
//   }

//   const result = await updateBoard(boardId, {
//     ...req.body,
//     background: photoUrl,
//   });

//   if (!result) {
//     next(createHttpError(404, `Board with Id ${boardId} not found`));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a board Id: ${boardId}!`,
//     data: result.board,
//   });
// };


// export const getBoardByIdController = async (req, res) => {
//     const { boardId } = req.params;

//     const board = await getBoardById(boardId);
//     const columns = await getAllColumnsByBoardId(boardId);

//     const columnsId = columns.map(column => column._id);
//     const cards = [];

// for(const item of columnsId)
//   {
//     const cardsArray = await getCardsByColumnId(item);
//     cards.push(...cardsArray);

//   };

//     if (!board) {
//       throw createHttpError(404, 'Board not  found');
//     }

//     res.json({
//       status: 200,
//       message: `Successfully found board with id ${boardId}!`,
//       data: {board, columns: [...columns],cards: [...cards]},
//     });

// };
