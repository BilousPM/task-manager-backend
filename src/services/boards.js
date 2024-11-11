import { BoardsCollection } from '../db/models/board.js';
import { ColumnsCollection } from '../db/models/columns.js';
import { CardsCollection } from '../db/models/card.js';

// ----- Create Board -----
export const createBoard = (payload, user) => BoardsCollection.create({
    ...payload,
    owner: user._id,
  });

  // ----- Get Board By Id -----
  export const getBoardById = (boardId) => BoardsCollection.findById(boardId);

// ----- Get All Boards By User Id -----
export const getAllBoards = (owner) =>  BoardsCollection.find({ owner});


// ----- Get All Columns By BoardId -----
export const getAllColumnsByBoardId = async (boardId, user) => {
  const columns = await ColumnsCollection.find({
    boardId: boardId,
    userId: user,
  });
  return columns;
};

// ----- Get All Cards By BoardId -----
export const getAllCardsByBoardId = async (boardId, user) => {
  const cards = await CardsCollection.find({
    boardId: boardId,
    userId: user,
  });
  return cards;
};



export const updateBoard = async (boardId, payload, options = {}) => {
  const rawResult = await BoardsCollection.findOneAndUpdate(
    { _id: boardId },
 { ...payload},
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    board: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteBoard = async (boardId) => {
  const board = await BoardsCollection.findOneAndDelete({
    _id: boardId,
  });

  return board;
};
