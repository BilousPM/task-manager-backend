import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  // refreshUserSessionController,
  registerUserController,
  requestGoogleOauthUrlController,
  verifyGoogleOauthControler,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validations/auth.js';
import { verifyGoogleOauthValidationSchema } from '../validations/verifyGoogleOauthValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post(
  '/request-google-oauth-link',
  ctrlWrapper(requestGoogleOauthUrlController),
);
authRouter.post(
  '/verify-oauth',
  validateBody(verifyGoogleOauthValidationSchema),
  ctrlWrapper(verifyGoogleOauthControler),
);

// authRouter.post('/refresh-session', ctrlWrapper(refreshUserSessionController));

export default authRouter;
