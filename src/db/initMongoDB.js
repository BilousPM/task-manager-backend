import mongoose from 'mongoose';

import { env } from '../utils/env.js';
import { MONGO_DB_VARS } from '../constants/index.js';

export const initMongoConnection = async () => {
  try {
    const user = env(MONGO_DB_VARS.MONGODB_USER);
    const password = env(MONGO_DB_VARS.MONGODB_PASSWORD);
    const url = env(MONGO_DB_VARS.MONGODB_URL);
    const db = env(MONGO_DB_VARS.MONGODB_DB);

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection succecfully established !');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};


