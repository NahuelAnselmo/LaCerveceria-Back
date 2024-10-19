// controllers/orderController.js
import Product from '../../models/productSchema.js'; // Cambia la importación a la sintaxis de ES Modules

export const processOrder = async (req, res) => {
  const { cartItems } = req.body;

  try {
    const updatePromises = cartItems.map(async (item) => {
      const product = await Product.findById(item.id);
      if (!product) {
        throw new Error(`Producto con ID ${item.id} no encontrado`);
      }

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        return product.save();
      }

      throw new Error(`No hay suficiente stock para ${product.name}`);
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Pedido confirmado y stock actualizado' });
  } catch (error) {
    if (error.message.includes('no encontrado')) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message || 'Error procesando el pedido' });
  }
};
