import HttpCodes from 'http-status-codes';
import { internalError } from '../../../helpers/helpers.js';
import ProductModel from '../../../models/productSchema.js';

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    try {
      // Validate if required fields are present (adjust according to requirements)
      if (!body || Object.keys(body).length === 0) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          data: null,
          message: 'Datos de actualización no proporcionados',
        });
      }

      // Perform the update operation
      const action = await ProductModel.updateOne({ _id: id }, body);

      // Check if the product was found and updated
      if (action.matchedCount === 0) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El producto indicado no fue encontrado',
        });
      }

      // Fetch the updated product data and return it in the response
      const updatedProduct = await ProductModel.findById(id);
      res.status(HttpCodes.OK).json({
        data: updatedProduct,
        message: 'Producto actualizado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al actualizar los datos');
    }
  }
}
