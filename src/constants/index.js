import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
};

export const MONGO_DB_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
  CLOUDINARY_CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  GOOGLE_OAUTH_CLIENT_ID: 'GOOGLE_OAUTH_CLIENT_ID',
  GOOGLE_OAUTH_SECTRET: 'GOOGLE_OAUTH_SECTRET',
  GOOGLE_OAUTH_REDIRECT_URI: 'GOOGLE_OAUTH_REDIRECT_URI',
};

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// export const SORT_ORDER = {
//   ASC: 'asc',
//   DESC: 'desc',
// };
