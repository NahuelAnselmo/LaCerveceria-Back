import express from 'express';
import { Auth } from '../../controllers/auth/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { post_loginValidationSchema } from '../../helpers/validationSchemas/authValidationSchema.js';
import { post_userValidationSchema } from '../../helpers/validationSchemas/usersValidationSchema.js';

export const authRouter = express.Router();

authRouter.post(
  '/login',
  (req, res, next) => validateBody(req, res, next, post_loginValidationSchema),
  Auth.PostController.postLogin,
);

authRouter.post(
  '/register',
  (req, res, next) => validateBody(req, res, next, post_userValidationSchema),
  Auth.PostController.register,
);

authRouter.post(
  '/change-password',
  (req, res, next) => validateBody(req, res, next, post_loginValidationSchema),
  Auth.PostController.changePassword,
);
