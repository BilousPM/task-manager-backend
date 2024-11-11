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
const user = req.user;

if(!user){
 throw createHttpError(401, 'Access token expired');
}

const board = await createBoard(req.body, user);

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
  const {_id, title, boardId,createdAt,updatedAt} = column;
  const cardsArray = await getCardsByColumnId(column._id);
  const colunmInfo = {};
colunmInfo._id = _id;
colunmInfo.title = title;
colunmInfo.boardId = boardId;
colunmInfo.createdAt = createdAt;
colunmInfo.updatedAt = updatedAt;
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

