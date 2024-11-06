import Joi from 'joi';

export const createColumnsSchema = Joi.object({
  titleColumns: Joi.string().min(3).max(30).required(),
  });
