import express from 'express';
import { Orders } from '../../controllers/cart/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { post_orderValidationSchema } from '../../helpers/validationSchemas/orderValidator.js';

export const orderRouter = express.Router();

// Ruta para obtener todos los pedidos
orderRouter.get('/', Orders.GetController.getOrders);

// Ruta para crear un nuevo pedido
orderRouter.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_orderValidationSchema),
  Orders.PostController.createOrder,
);
