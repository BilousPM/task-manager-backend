import { ColumnsCollection } from '../db/models/columns.js';

export const createColumn = (titleColumn, userId, boardId) =>
  ColumnsCollection.create({ titleColumn, userId, boardId });

export const getAllColumnsByBoardId = (boardId) =>
  ColumnsCollection.find({ boardId: boardId });


export const updateColumn = (columnId, titleColumn) =>
  ColumnsCollection.findByIdAndUpdate(columnId, { titleColumn }, { new: true });

export const deleteColumn = (columnId) =>
  ColumnsCollection.findByIdAndDelete(columnId);


