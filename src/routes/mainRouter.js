import express from 'express';

import { contactRouter } from './routers/contactRouters.js';
import { productsRouter } from './routers/productsRouter.js';
import { userRouter } from './routers/userRouter.js';
import { authRouter } from './routers/authRouter.js';
import { cartRouter } from './routers/cartRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/contact', contactRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/cart', cartRouter);
