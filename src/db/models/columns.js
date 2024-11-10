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
