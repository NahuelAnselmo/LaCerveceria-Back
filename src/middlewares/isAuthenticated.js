import HttpCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const { headers } = req;

  const authorizationHeader = headers.authorization;

  if (!authorizationHeader) {
    res.status(HttpCodes.UNAUTHORIZED).json({
      data: null,
      message: 'No se encontró un token en la petición',
    });
    return;
  }

  const tokenParts = authorizationHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    res.status(HttpCodes.UNAUTHORIZED).json({
      data: null,
      message: 'Formato de token inválido',
    });
    return;
  }

  const token = tokenParts[1];

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.user;
    next();
  } catch (_) {
    res.status(HttpCodes.UNAUTHORIZED).json({
      data: null,
      message: 'Token inválido',
    });
  }
};
