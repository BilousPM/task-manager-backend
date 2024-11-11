import { REFRESH_TOKEN_LIVE_TIME } from '../constants/time.js';

export const setupSessionCookies = (res, session) => {
  // res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'Strict',
  //   expires: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  // });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
};
