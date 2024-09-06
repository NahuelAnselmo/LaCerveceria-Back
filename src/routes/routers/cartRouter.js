import express from 'express';
import {
  getCartByTable,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
} from '../../controllers/carrito/controllers/cartController.js';

export const cartRouter = express.Router();

cartRouter.get('/:tableNumber', getCartByTable);
cartRouter.post('/add', addItemToCart);
cartRouter.put('/update', updateItemQuantity);
cartRouter.delete('/remove', removeItemFromCart);
