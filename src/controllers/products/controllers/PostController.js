import HttpCodes from 'http-status-codes';
import { internalError } from '../../../helpers/helpers.js';
import ProductModel from '../../../models/productSchema.js';

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    const newProduct = new ProductModel({
      name: body.name,
      imageUrl: body.imageUrl,
      price: body.price,
      description: body.description,
      available: body.available,
      category: body.category,
    });

    try {
      await newProduct.save();

      res.status(HttpCodes.CREATED).json({
        data: null,
        message: 'Producto guardado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al guardar los datos');
    }
  }
}
