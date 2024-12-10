import { internalError } from '../../../helpers/helpers.js';
import ProductModel from '../../../models/productSchema.js';

export class GetController {
  static async getProducts(_, res) {
    try {
      const data = await ProductModel.find({
        isActive: true,
      });

      const filteredData = data.map((product) => {
        return {
          id: product._doc._id,
          name: product._doc.name,
          imageUrl: product._doc.imageUrl,
          price: product._doc.price,
          description: product._doc.description,
          available: product._doc.available,
          category: product._doc.category,
        };
      });

      res.json({
        data: filteredData,
        message: 'Lista de productos encontrada correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al encontrar los datos');
    }
  }
}
