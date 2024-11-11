import { randomBytes } from 'crypto';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/time.js';
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';
import { verifyCode } from '../utils/googleOauth.js';
import bcrypt from 'bcrypt';
// ----- Find User By Email -----
export const findUserByEmail = (email) => UserCollection.findOne({ email });

// ----- Find User By Id -----
export const findUserById = (userId) => UserCollection.findById(userId);

// ----- User Register -----
export const registerUser = (registrationData, password) =>
  UserCollection.create({
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

// ----- Verify Google Oauth -----
export const verifyGoogleOauth = async (code) => {
  const { email, name, picture } = await verifyCode(code);

  let user = await UserCollection.findOne({ email });

  if (!user) {
    const password = await bcrypt.hash(randomBytes(40), 10);
    user = await UserCollection.create({
      name,
      email,
      avatarURL: picture,
      password,
    });
  }
  await SessionCollection.deleteOne({
    userId: user._id,
  });

  const session = await createSession(user._id);
  return session;
};
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


// Google Oauth befor changes
// export const getGoogleOauthLink = (req, res) => {
//   return generateOauthLink();
// };

// export const verifyGoogleOauth = async (code) => {
//   const { email, name, picture } = await verifyCode(code);

//   let user = await UserCollection.findOne({ email });

//   if (!user) {
//     const password = await bcrypt.hash(randomBytes(40), 10);
//     user = await UserCollection.create({
//       name,
//       email,
//       avatarURL: picture,
//       password,
//     });
//   }
//   await SessionCollection.deleteOne({
//     userId: user._id,
//   });

//   const session = await createSession(user._id);
//   return session;
