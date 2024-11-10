import createHttpError from 'http-errors';
import {
  createSession,
  deleteSession,
  findUserByEmail,
  // refreshSession,
  registerUser,
} from '../services/auth.js';
import bcrypt from 'bcrypt';
import { setupSessionCookies } from '../utils/setupSessionCookies.js';

//  ----- User Register -----
export const registerUserController = async (req, res) => {
  const user  = await findUserByEmail(req.body.email);

  if (user) throw createHttpError(409, 'This email address already exists in the database and cannot be reused.');

  const password = await bcrypt.hash(req.body.password, 10);
  const newUser = await registerUser(req.body, password);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

// ----- User Login and Create Session -----
export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) throw createHttpError(401, 'Wrong credentials');

  const isEqualPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isEqualPassword) throw createHttpError(401, 'Wrong credentials');

  const session = await createSession(user._id);
  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Saccessfully logged in!',
    data: {
      accessToken: session.accessToken,
      user
    },
  });
};

//  ----- User Logout -----
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await deleteSession(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// ----- Refresh Session -----
// export const refreshUserSessionController = async (req, res) => {
//   try {
//     const session = await refreshSession(
//       req.cookies.sessionId,
//       req.cookies.sessionToken,
//     );

//     setupSessionCookies(res, session);

//     res.json({
//       status: 200,
//       message: 'Successfully refreshed a session!',
//       data: { accessToken: session.accessToken },
//     });
//   } catch (error) {
//     console.error('Error refreshing session:', error.message);
//     res.status(error.status || 500).json({
//       status: error.status || 500,
//       message: 'Failed to refresh session',
//       data: { message: error.message },
//     });
//   }
// };
