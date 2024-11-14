/* eslint-disable prettier/prettier */
import express from 'express';
import { Auth } from '../../controllers/auth/index.js';
import { isAdmin } from '../../middlewares/isAdmin.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'; // Middleware de autenticación
import { post_loginValidationSchema } from '../../helpers/validationSchemas/authValidationSchema.js';
import { post_userValidationSchema } from '../../helpers/validationSchemas/usersValidationSchema.js';
import { edit_userValidationSchema } from '../../helpers/validationSchemas/editUserValidationSchema.js';

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

// Ruta para editar usuario (protegida)
authRouter.put(
  '/edit/:id',
  isAuthenticated, // Asegura que el usuario esté autenticado
  validateBody(edit_userValidationSchema), // Valida los campos enviados en el cuerpo
  Auth.PostController.editUser,
);

// Ruta protegida solo para administradores
authRouter.post(
  '/admin-only-action',
  isAuthenticated, // Verifica que el usuario esté autenticado
  isAdmin, // Verifica que el usuario sea un administrador
  (req, res) => {
    res.status(200).json({
      message: 'Esta es una ruta protegida solo para administradores.',
    });
  }
);
