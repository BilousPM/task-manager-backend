
/* import { model, Schema } from 'mongoose';

const columnsSchema = new Schema(
  {
    titleColumn: { type: String, required: true },
    columnId: {type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true, versionKey: false },
);

export const ColumnsCollection = model('columns', columnsSchema);
 */
//import { required } from 'joi';

import { model, Schema } from 'mongoose';

const columnsSchema = new Schema(
  {
    title: { type: String, required: true },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'boards',
    },

  },
  { timestamps: true, versionKey: false },
);

export const ColumnsCollection = model('columns', columnsSchema);
