import { model, Schema } from 'mongoose';

const cardsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Without priority'],
      required: true,
      default: 'Without priority',
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'column',
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'boards',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CardsCollection = model('cards', cardsSchema);
