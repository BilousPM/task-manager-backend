import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set the board's title"],
    },
    icon: { type: String,
      default: "default"
    },

    background: { type: String,
      default: "default"
    },


    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

export const BoardsCollection = model('boards', boardsSchema);

// background: {
//   min: { type: String },
//   desktop: { type: String },
//   tablet: { type: String },
//   mobile: { type: String },
// },
