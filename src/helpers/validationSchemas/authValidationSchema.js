import Joi from 'joi';

export const post_loginValidationSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    'any.required': 'El campo Email es requerido',
    '*': 'El campo Email tiene algún error',
  }),
  password: Joi.string().trim().min(3).required().messages({
    'string.min': "El campo 'password' debe tener al menos 3 caracteres",
    'any.required': "El campo 'password' es requerido",
    '*': "Revisa el campo 'password'",
  }),
});
