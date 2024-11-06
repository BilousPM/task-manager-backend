import { Router } from 'express';
import authRouter from './auth.js';
import cardsRouter from './card.js';
import supportRouter from './support.js';
import usersRouter from './users.js';
import boardsRouter from './boards.js';
import columnsRouter from './columns.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', usersRouter);
router.use('/boards', boardsRouter);
router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);
router.use('/support', supportRouter);
//import boardsRouter from './boards.js';
//const router = Router();

//router.use('/auth', authRouter);
//router.use('/boards', boardsRouter);

export default router;
