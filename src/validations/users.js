import Joi from 'joi';

export const userUpdateProfileSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
});

export const userUpdateThemeSchema = Joi.object({
  theme: Joi.string().valid('dark', 'light', 'violet').required(),
});
