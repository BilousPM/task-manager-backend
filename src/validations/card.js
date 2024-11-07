import Joi from 'joi';

export const createCardSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().required(),
  deadline: Joi.string(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Without priority'),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(3).max(20),
  description: Joi.string(),
  deadline: Joi.string(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Without priority'),
});

export const replaceColumnSchema = Joi.object({
  columnId: Joi.string().required(),
});


// export const createCardSchema = Joi.object({
//   title: Joi.string().min(3).max(20).required().messages({
//     'string.base': 'Title should be a string',
//     'string.min': 'Title should have at least {#limit} characters',
//     'string.max': 'Title should have at most {#limit} characters',
//     'any.required': 'Title is required',
//   }),
//   description: Joi.string().required(),
//   deadline: Joi.string(),
//   priority: Joi.string().valid('Low', 'Medium', 'High', 'Without priority'),
// });
