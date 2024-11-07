import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { sendSupportMessageController } from '../controllers/support.js';
import { validateBody } from '../middlewares/validateBody.js';
import { supportSchema } from '../validations/support.js';
import { authenticate } from '../middlewares/authenticate.js';

const supportRouter = Router();

supportRouter.use('/', authenticate);

supportRouter.post(
  '/send-message',
  ctrlWrapper(sendSupportMessageController),
  validateBody(supportSchema),
);

export default supportRouter;
