import express from 'express';
import { Products } from '../../controllers/products/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import {
  post_productValidationSchema,
  put_productValidationSchema,
} from '../../helpers/validationSchemas/productsValidator.js';

export const productsRouter = express.Router();

productsRouter.get('/', Products.GetController.getProducts);
productsRouter.post(
  '/',
  (req, res, next) =>
    validateBody(req, res, next, post_productValidationSchema),
  Products.PostController.postProduct,
);
productsRouter.put(
  '/:id',
  (req, res, next) => validateBody(req, res, next, put_productValidationSchema),
  Products.PutController.putProduct,
);
productsRouter.delete('/:id', Products.DeleteController.deleteProduct);
