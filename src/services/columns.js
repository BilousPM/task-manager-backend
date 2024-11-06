import { ColumnsCollection } from '../db/models/columns.js';

export const createColumn = (title, userId, boardId) =>
  ColumnsCollection.create({ title, userId, boardId });

export const getAllColumnsByBoardId = (boardId) =>
  ColumnsCollection.find({ boardId: boardId });

export const updateColumn = (columnId, title) =>
  ColumnsCollection.findByIdAndUpdate(columnId, { title }, { new: true });

export const deleteColumn = (columnId) =>
  ColumnsCollection.findByIdAndDelete(columnId);
