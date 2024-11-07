import Joi from 'joi';

export const createColumnsSchema = Joi.object({
 title: Joi.string().min(3).max(30).required(),
  });

  export const updateColumnsSchema = Joi.object({
    title: Joi.string().min(3).max(30)
     });
