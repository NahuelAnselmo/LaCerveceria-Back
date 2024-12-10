import express from 'express';
import { Products } from '../../controllers/products/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import {
  post_productValidationSchema,
  put_productValidationSchema,
} from '../../helpers/validationSchemas/productsValidator.js';

export const productsRouter = express.Router();

// Obtener productos
productsRouter.get('/', Products.GetController.getProducts);

// Crear un nuevo producto con validaciones
productsRouter.post(
  '/',
  validateBody(post_productValidationSchema), // Validación del cuerpo con el esquema POST
  Products.PostController.postProduct
);

// Actualizar un producto existente con validaciones
productsRouter.put(
  '/:id',
  validateBody(put_productValidationSchema), // Validación del cuerpo con el esquema PUT
  Products.PutController.putProduct
);

// Eliminar un producto
productsRouter.delete('/:id', Products.DeleteController.deleteProduct);