import { randomBytes } from 'crypto';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/time.js';
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';

// ----- Find User By Email -----
export const findUserByEmail = (email) => UserCollection.findOne({ email });

// ----- Find User By Id -----
export const findUserById = (userId) => UserCollection.findById(userId);

// ----- User Register -----
export const registerUser = (registrationData, password) => UserCollection.create({
  ...registrationData,
  password,
});

// ----- Update User -----
export const updateUser = (userData) => UserCollection.findOneAndUpdate();

// ----- Create Session -----
export const createSession = async (userId) => {
  await SessionCollection.deleteOne({ userId });

  return await SessionCollection.create({
    userId,
    accessToken: randomBytes(16).toString('base64'),
    refreshToken: randomBytes(16).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
};

// ----- Delete Session
export const deleteSession = (sessionId) =>
  SessionCollection.deleteOne({ _id: sessionId });

// ----- Refresh session -----
// export const refreshSession = async (sessionId, sessionToken) => {
//   const session = await SessionCollection.findOne({
//     _id: sessionId,
//     refreshToken: sessionToken,
//   });

//   if (!session) {
//     throw createHttpError(401, 'Session not found');
//   }

//   const now = new Date();

//   if (session.refreshTokenValidUntil < now) {
//     throw createHttpError(401, 'Refresh token expired');
//   }

//   await SessionCollection.deleteOne({
//     _id: sessionId,
//     refreshToken: sessionToken,
//   });

//   const newSession = await SessionCollection.create({
//     userId: session.userId,
//     ...createSession(),
//   });
//   return newSession;
// };
