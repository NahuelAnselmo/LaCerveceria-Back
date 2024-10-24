/* eslint-disable prettier/prettier */
import express from 'express';
import { Auth } from '../../controllers/auth/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { post_loginValidationSchema } from '../../helpers/validationSchemas/authValidationSchema.js';
import { post_userValidationSchema } from '../../helpers/validationSchemas/usersValidationSchema.js';

export const authRouter = express.Router();

// Ruta de login
authRouter.post(
  '/login',
  validateBody(post_loginValidationSchema), // Pasar el esquema directamente al middleware
  Auth.PostController.postLogin,
);

// Ruta de registro
authRouter.post(
  '/register',
  validateBody(post_userValidationSchema), // Pasar el esquema directamente al middleware
  Auth.PostController.register,
);

// Ruta para cambiar la contraseña (mejor usar PUT)
authRouter.put(
  '/change-password',
  validateBody(post_loginValidationSchema), // Cambia por el esquema adecuado si es diferente
  Auth.PostController.changePassword,
);
