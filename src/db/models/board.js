import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set the board's title"],
    },
    icon: { type: String, required: false },

    background: {
      min: { type: String },
      desktop: { type: String },
      tablet: { type: String },
      mobile: { type: String },
    },
    // filter: {
    //   type: String,
    //   enum: ['default', 'without', 'low', 'medium', 'high'],
    //   default: 'default',
    // },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

export const BoardsCollection = model('boards', boardsSchema);
