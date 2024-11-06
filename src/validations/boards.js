// src/validation/boards.js

import Joi from 'joi';

// export const createBoardSchema = Joi.object({
//   title: Joi.string().min(3).max(30).required().messages({
//     'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
//     'string.min': 'Username should have at least {#limit} characters',
//     'string.max': 'Username should have at most {#limit} characters',
//     'any.required': 'Username is required',
//   }),
// });
export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  background: Joi.string(),
  //icon: Joi.string(),
  filter: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30),
});

const dataToValidate = {
  title: 'Project offise',
};

const validationResult = createBoardSchema.validate(dataToValidate, {
  abortEarly: false,
});
if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
