import express from 'express';

import { users } from '../../controllers/users/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

import { post_userValidationSchema } from '../../helpers/validationSchemas/usersValidationSchema.js';

export const userRouter = express.Router();

userRouter.get('/', isAuthenticated, isAdmin, users.GetController.getUsers);

userRouter.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userValidationSchema),
  users.PostController.postUser,
);
