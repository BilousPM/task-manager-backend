import createHttpError from 'http-errors';
import {
  createSession,
  deleteSession,
  findUserByEmail,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import bcrypt from 'bcrypt';
import { setupSessionCookies } from '../utils/setupSessionCookies.js';


//  ----- User Register -----
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// ----- User Login and Create Session -----
export const loginUserController = async (req,res) =>{
const user  = await findUserByEmail(req.body.email)
if (!user) throw createHttpError (401, 'Wrong credentials')

  const isEqualPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isEqualPassword) throw createHttpError(401, 'Wrong credentials');

  const session = await createSession(user._id)

 setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Saccessfully logged in!',
    data: {
      accessToken: session.accessToken,
    },
  })
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
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshSession(
    req.cookies.sessionId,
    req.cookies.sessionToken,
  );

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};
