import Joi from 'joi';

export const post_productValidationSchema = Joi.object({
  name: Joi.string().trim().max(30).required().messages({
    'string.max': "El campo 'name' debe tener como mucho 30 caracteres",
    'any.required': "El campo 'name' es requerido",
    '*': "Revisa el campo 'name'",
  }),
  imageUrl: Joi.string().trim().uri().required().messages({
    'string.uri': "El campo 'imageUrl' debe ser una URL valida",
    'any.required': "El campo 'imageUrl' es requerido",
    '*': "Revisa el campo 'imageUrl'",
  }),
  price: Joi.string()
    .pattern(/^\d+(\.\d{2})?$/)
    .required()
    .custom((value, helpers) => {
      const numericValue = parseFloat(value);
      if (numericValue < 0.01 || numericValue > 1000000) {
        return helpers.message("El campo 'price' debe estar entre 0.01 y 1000");
      }
      return value;
    })
    .messages({
      'string.pattern.base':
        "El campo 'price' debe ser un número con dos decimales",
      'any.required': "El campo 'price' es requerido",
      '*': "Revisa el campo 'price'",
    }),
  description: Joi.string().trim().min(3).max(500).required().messages({
    'string.min': "El campo 'description' debe tener como mínimo 3 caracteres",
    'string.max': "El campo 'description' debe tener como mucho 500 caracteres",
    'any.required': "El campo 'description' es requerido",
    '*': "Revisa el campo 'description'",
  }),
  available: Joi.boolean().required().messages({
    'any.required': "El campo 'available' es requerido",
    '*': "Revisa el campo 'available'",
  }),
  category: Joi.string()
    .trim()
    .valid('entrantes', 'burgers', 'tragos', 'bebidas', 'cervezas')
    .required()
    .messages({
      'any.only': "El campo 'category' debe ser uno de los valores permitidos",
      'any.required': "El campo 'category' es requerido",
      '*': "Revisa el campo 'category'",
    }),
});

export const put_productValidationSchema = Joi.object({
  name: Joi.string().trim().max(30).messages({
    'string.max': "El campo 'name' debe tener como mucho 30 caracteres",
    '*': "Revisa el campo 'name'",
  }),
  imageUrl: Joi.string().trim().uri().messages({
    'string.uri': "El campo 'imageUrl' debe ser una URL valida",
    '*': "Revisa el campo 'imageUrl'",
  }),
  price: Joi.string()
    .pattern(/^\d+(\.\d{2})?$/)

    .custom((value, helpers) => {
      const numericValue = parseFloat(value);
      if (numericValue < 0.01 || numericValue > 1000000) {
        return helpers.message("El campo 'price' debe estar entre 0.01 y 1000");
      }
      return value;
    })
    .messages({
      'string.pattern.base':
        "El campo 'price' debe ser un número con dos decimales",
      '*': "Revisa el campo 'price'",
    }),
  description: Joi.string().trim().min(3).max(500).messages({
    'string.min': "El campo 'description' debe tener como mínimo 3 caracteres",
    'string.max': "El campo 'description' debe tener como mucho 500 caracteres",
    '*': "Revisa el campo 'description'",
  }),
  available: Joi.boolean().messages({
    '*': "Revisa el campo 'available'",
  }),
  category: Joi.string()
    .trim()
    .valid('entrantes', 'burgers', 'tragos', 'bebidas', 'cervezas')
    .messages({
      'any.only': "El campo 'category' debe ser uno de los valores permitidos",
      '*': "Revisa el campo 'category'",
    }),
})
  .or(
    'name',
    'imageUrl',
    'price',
    'description',
    'available',

    'category',
  )
  .messages({
    'object.missing':
      'Debes proporcionar al menos un campo para actualizar el producto',
  });
