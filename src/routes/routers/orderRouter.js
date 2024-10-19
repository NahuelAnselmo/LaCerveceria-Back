// routers/orderRouter.js
import express from 'express';
import { processOrder } from '../../controllers/orderController/orderController.js'; // Asegúrate de la ruta correcta

const orderRouter = express.Router();

// Ruta para reducir el stock
orderRouter.post('/reduce-stock', processOrder);

export { orderRouter };
