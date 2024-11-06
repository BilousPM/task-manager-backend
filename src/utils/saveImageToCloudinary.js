import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { MONGO_DB_VARS } from '../constants/index.js';

cloudinary.config({
  cloud_name: env(MONGO_DB_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: env(MONGO_DB_VARS.CLOUDINARY_API_KEY),
  api_secret: env(MONGO_DB_VARS.CLOUDINARY_API_SECRET),
});

export const saveImageToCloudinary = async (file) => {
  const res = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return res.secure_url;
};
