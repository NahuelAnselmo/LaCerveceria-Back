import Joi from 'joi';

export const edit_userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional().trim(),
  email: Joi.string().email().optional().trim(),
  password: Joi.string().min(6).max(50).optional(),
});
