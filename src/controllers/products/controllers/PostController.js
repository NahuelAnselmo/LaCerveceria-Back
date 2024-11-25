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
      stock: body.stock,
      description: body.description,
      available: body.available,
      category: body.category,
    });

    try {
      const savedProduct = await newProduct.save(); // Guarda el producto y obtén el objeto resultante

      res.status(HttpCodes.CREATED).json({
        data: savedProduct, // Incluye el producto creado en la respuesta
        message: 'Producto guardado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al guardar los datos');
    }
  }
}