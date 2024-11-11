import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  background: Joi.string(),
  icon: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  background: Joi.string(),
  icon: Joi.string(),
});

// const dataToValidate = {
//   title: 'Project offise',
// };

// const validationResult = createBoardSchema.validate(dataToValidate, {
//   abortEarly: false,
// });
// if (validationResult.error) {
//   console.error(validationResult.error.message);
// } else {
//   console.log('Data is valid!');
// }
