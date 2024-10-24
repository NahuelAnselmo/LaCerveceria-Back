/* eslint-disable prettier/prettier */
import HttpCodes from 'http-status-codes';

export const validateBody = (validationSchema) => (req, res, next) => {
  const { body } = req;

  if (!validationSchema) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: 'Error interno: el esquema de validación es indefinido',
    });
  }

  const { error } = validationSchema.validate(body, { abortEarly: false });

  if (error) {
    return res.status(HttpCodes.BAD_REQUEST).json({
      data: null,
      message: 'Ocurrió un error al validar los campos',
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
};
