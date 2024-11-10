import { ColumnsCollection } from '../db/models/columns.js';

// ----- Create column
export const createColumn = (title, boardId) =>
  ColumnsCollection.create({title, boardId});

export const getAllColumnsByBoardId = (boardId) =>
  ColumnsCollection.find({ boardId });


export const updateColumn = (columnId, titleColumn) =>
  ColumnsCollection.findByIdAndUpdate({_id: columnId},  titleColumn , { new: true });

export const deleteColumn = (columnId) =>
  ColumnsCollection.findByIdAndDelete(columnId);

export const deleteColumnsByBoardId = (boardId) =>
  ColumnsCollection.deleteMany({boardId});

