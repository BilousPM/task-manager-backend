import { OAuth2Client } from 'google-auth-library';
import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';
import { MONGO_DB_VARS } from '../constants/index.js';
import createHttpError from 'http-errors';

const googleConfigPath = path.join(process.cwd(), 'google.json');

const googleOauthParams = JSON.parse(
  fs.readFileSync(googleConfigPath).toString(),
);

const oauthClient = new OAuth2Client({
  projectId: googleOauthParams.web.project_id,
  clientId: env(MONGO_DB_VARS.GOOGLE_OAUTH_CLIENT_ID),
  clientSecret: env(MONGO_DB_VARS.GOOGLE_OAUTH_SECTRET),
  redirectUri: env(MONGO_DB_VARS.GOOGLE_OAUTH_REDIRECT_URI),
});

export const generateOauthLink = () => {
  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
};

export const verifyCode = async (code) => {

// const clientId ="1078170617566-gh1hv176iuiikt8hvfv8n3c662j6vn2q.apps.googleusercontent.com";

  try {
    // const { tokens } = await oauthClient.getToken(code);
    // const idToken = tokens.id_token;
    // const ticket = await oauthClient.verifyIdToken({ idToken });

    const ticket = await oauthClient.verifyIdToken({
      idToken: code});

    // const ticket = await oauthClient.verifyIdToken(code);


    return ticket.payload;
  } catch (err) {
    if (err.status === 400) {
      throw createHttpError(err.status, 'Token is invalid');
    }
    throw createHttpError(500, 'Something is wrong with Google Oauth!');
  }
};
