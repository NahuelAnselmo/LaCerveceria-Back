import { createOrder, getOrders } from './controllers/orderController.js';

export const Orders = {
  GetController: {
    getOrders,
  },
  PostController: {
    createOrder,
  },
};
