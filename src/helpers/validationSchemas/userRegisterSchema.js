import Joi from 'joi';

// Validación para registro
export const userRegisterSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'El nombre debe ser un texto',
    'any.required': 'El campo "username" es requerido',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Debe ser un email válido',
    'any.required': 'El campo "email" es requerido',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'any.required': 'El campo "password" es requerido',
  }),
});

export default userRegisterSchema; // Exportar por defecto si lo necesitas
