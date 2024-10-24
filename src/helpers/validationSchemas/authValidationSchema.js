import Joi from 'joi';

export const post_loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe tener un formato válido',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
  }),
});

export const post_userValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'El nombre es obligatorio',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe tener un formato válido',
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
    .required()
    .messages({
      'string.empty': 'La contraseña es obligatoria',
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'string.pattern.base': 'La contraseña debe tener al menos una mayúscula, una minúscula y un dígito',
    }),
});
