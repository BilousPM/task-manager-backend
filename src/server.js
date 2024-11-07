import express from 'express';
import cors from 'cors';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
// import pino from 'pino-http';

const PORT = Number(env(ENV_VARS.PORT, 7000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use('/api-docs', swaggerDocs());


  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World',
    });
  });

  app.use(router);

  app.use('*', notFoundHandler);
  app.use('*', errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
