
import { CLOUDINARY } from '../constants/index.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';
import { env } from './env.js';
import { saveFileToCloudinary } from './saveImageToCloudinary.js';

export const saveImage = async (file) => {
  if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
    return await saveFileToCloudinary(file);
  } else {
    return await saveFileToUploadDir(file);
  }
};
