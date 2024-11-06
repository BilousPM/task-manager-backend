import { Schema, model } from 'mongoose';
// import { User } from './user.js';

const sessionSchema = new Schema(
  {
    // userId: { type: Schema.ObjectId, required: true, ref: User },
    userId: { type: Schema.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SessionCollection = model('session', sessionSchema);
