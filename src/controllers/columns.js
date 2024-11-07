
import createHttpError from 'http-errors';
import {
  createColumn,
  updateColumn,
  deleteColumn,
} from '../services/columns.js';
import { deleteCardsById } from '../services/card.js';

// ----- Create Column -----
export const createColumnController = async (req, res) => {
  const {title}  = req.body;
  const { boardId } = req.params;
  const column = await createColumn(title, boardId);

  res.status(201).json({
    status: 201,
    messsage: 'Column created successfully',
    data: column,
  });
};

// ----- Update Column -----
export const updateColumnController = async (req, res) => {
  const titleColumn  = req.body;
  const  {columnId } = req.params;
  const column = await updateColumn(columnId, titleColumn);

  if (!column) {
        throw createHttpError(404, 'Not found');
  }

  res.status(201).json({
    status: 201,
    message: 'Column updated successfully',
    data: column,
  });
};

// ----- Delete Column By Id
export const deleteColumnController = async (req, res) => {
  const { columnId } = req.params;
  await deleteCardsById(columnId);
  await deleteColumn(columnId);

  res.status(204).json({
    status:204,
    message: 'Column deleted successfully',
  });
};

// import { boardSchema } from '../../models/board/'; // Waiting for creation of the Board model
// import mongoose from 'mongoose';
// import { HttpError } from 'http-errors';
// import ctrlWrapper from '../utils/ctrlWrapper';

// import { createColumn } from "../services/columns.js";


// export const createColumnController = async (req,res)=>{
// const {titleColumns} = (req.body);
// const userId = req.user._id;
// const { boardId } = req.params;
// const column = await createColumn(titleColumns,userId, boardId);

// console.log(column);

// res.status(201).json({
//   status: 201,
//   messsage: 'Column created saccessfully',
//   data:column
// });

// };
// const addColumnInBoard = async (req, res, next) => {
//   const { _id } = req.user;
//   const { boardId } = req.params;

//   const newObjectId = new mongoose.Types.ObjectId();

//   const result = await boardSchema.findOneAndUpdate(
//     {
//       _id: boardId,
//       owner: _id,
//     },
//     { $push: { columns: { _id: newObjectId, owner: boardId, ...req.body } } },
//     { new: true, select: '-createdAt -updatedAt' },
//   );

//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }

//   res.status(201).json(result);
// };

// const deleteColumn = async (req, res, next) => {
//   const { _id } = req.user;
//   const { owner, _id: columnId } = req.body;

//   const result = await boardSchema.findOneAndUpdate(
//     {
//       _id: owner,
//       owner: _id,
//     },
//     { $pull: { columns: { _id: columnId } } },
//     { new: true },
//   );

//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }

//   res.status(200).json({
//     message: 'Column deleted saccessfully',
//   });
// };

// const getColumns = async (req, res) => {
//   const { _id } = req.user;
//   const { boardId } = req.params;

//   const { columns } = await boardSchema.findOne({ _id: boardId, owner: _id });

//   const result = columns.map((column) => ({
//     title: column.title,
//     _id: column._id,
//     owner: column.owner,
//   }));

//   res.json(result);
// };

// const updateColumn = async (req, res, next) => {
//   const { _id } = req.user;
//   const { title, owner, _id: columnId } = req.body;

//   const { columns } = await boardSchema.findOne({
//     _id: owner,
//     owner: _id,
//   });

//   if (!columns) {
//     throw HttpError(400, `${owner} is not valid id`);
//   }

//   const index = columns.findIndex((column) => column.id === columnId);

//   if (index === -1) {
//     throw HttpError(400, `${columnId} is not valid id`);
//   }

//   const updateBoard = await boardSchema.updateOne(
//     { _id: owner, owner: _id },
//     { $set: { [`columns.${index}.title`]: title } },
//   );

//   if (updateBoard.modifiedCount === 0) {
//     throw HttpError(404);
//   }

//   const boardGetColumn = await boardSchema.findOne({ _id: owner, owner: _id });

//   res.json(boardGetColumn.columns[index]);
// };

// module.exports = {
//   addColumnInBoard: ctrlWrapper(addColumnInBoard),
//   getColumns: ctrlWrapper(getColumns),
//   updateColumn: ctrlWrapper(updateColumn),
//   deleteColumn: ctrlWrapper(deleteColumn),
// };



// =========================== Контроллери що були зміннені ================
// export const createColumnController = async (req, res) => {
//   const { titleColumns } = req.body;
//   const userId = req.user._id;
//   const { boardId } = req.params;
//   const column = await createColumn(titleColumns, userId, boardId);

//   console.log(column);

//   res.status(201).json({
//     status: 201,
//     messsage: 'Column created successfully',
//     data: column,
//   });
// };

