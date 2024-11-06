import {
  createColumn,
  updateColumn,
  deleteColumn,
} from '../services/columns.js';

export const createColumnController = async (req, res) => {
  const { titleColumns } = req.body;
  const userId = req.user._id;
  const { boardId } = req.params;
  const column = await createColumn(titleColumns, userId, boardId);

  console.log(column);

  res.status(201).json({
    status: 201,
    messsage: 'Column created successfully',
    data: column,
  });
};

export const updateColumnController = async (req, res) => {
  const { titleColumn } = req.body;
  const { columnId } = req.params;
  const column = await updateColumn(columnId, titleColumn);
  res.status(200).json({
    status: 200,
    message: 'Column updated successfully',
    data: column,
  });
};

export const deleteColumnController = async (req, res) => {
  const { columnId } = req.params;
  await deleteColumn(columnId);
  res.status(200).json({
    message: 'Column deleted successfully',
  });
};
