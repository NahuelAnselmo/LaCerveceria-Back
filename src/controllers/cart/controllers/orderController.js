import Order from '../../../models/orderSchema.js';

// Obtener todos los pedidos
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error });
  }
};

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { tableNumber, items, totalAmount, comment } = req.body;

    if (!tableNumber || !items || !totalAmount) {
      return res.status(400).json({ message: 'Datos incompletos para el pedido.' });
    }

    const newOrder = new Order({
      tableNumber,
      items,
      totalAmount,
      comment,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
};
