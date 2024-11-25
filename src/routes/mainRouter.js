/* eslint-disable prettier/prettier */
import express from 'express';

import { contactRouter } from './routers/contactRouters.js';
import { productsRouter } from './routers/productsRouter.js';
import { userRouter } from './routers/userRouter.js';
import { authRouter } from './routers/authRouter.js';
import { orderRouter } from './routers/orderRoutes.js';


export const mainRouter = express.Router();

mainRouter.use('/contact', contactRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/orders', orderRouter);
