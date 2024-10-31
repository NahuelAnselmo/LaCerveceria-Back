/* eslint-disable prettier/prettier */
import HttpCodes from 'http-status-codes';

export const validateBody = (validationSchema) => (req, res, next) => {
  const { body } = req;

  // Si el usuario es administrador y está autenticado, saltar la validación del cuerpo
  if (req.user && req.user.isAdmin) {
    return next();
  }

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
