import HttpCodes from 'http-status-codes';
import CartModel from '../../../models/cartSchema.js';

// Obtener el carrito de un usuario por ID de la mesa
export const getCartByTable = async (req, res) => {
  const { tableNumber } = req.params;

  try {
    const cart = await CartModel.findOne({ tableNumber });

    if (!cart) {
      return res.status(HttpCodes.NOT_FOUND).json({
        data: null,
        message: 'Carrito no encontrado',
      });
    }

    return res.json({
      data: cart,
      message: 'Carrito obtenido correctamente',
    });
  } catch (error) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: 'Ocurrió un error al obtener el carrito',
    });
  }
};

// Añadir un ítem al carrito
export const addItemToCart = async (req, res) => {
  const { tableNumber, item, quantity } = req.body;

  try {
    let cart = await CartModel.findOne({ tableNumber });

    if (!cart) {
      cart = new CartModel({ tableNumber, items: [{ ...item, quantity }] });
    } else {
      const existingItem = cart.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ ...item, quantity });
      }
    }

    await cart.save();

    return res.status(HttpCodes.OK).json({
      data: cart,
      message: 'Ítem añadido al carrito',
    });
  } catch (error) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: 'Ocurrió un error al añadir el ítem al carrito',
    });
  }
};

// Actualizar la cantidad de un ítem en el carrito
export const updateItemQuantity = async (req, res) => {
  const { tableNumber, itemId, quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ tableNumber });

    if (!cart) {
      return res.status(HttpCodes.NOT_FOUND).json({
        data: null,
        message: 'Carrito no encontrado',
      });
    }

    const item = cart.items.find((i) => i.id === itemId);

    if (!item) {
      return res.status(HttpCodes.NOT_FOUND).json({
        data: null,
        message: 'Ítem no encontrado en el carrito',
      });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter((i) => i.id !== itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    return res.status(HttpCodes.OK).json({
      data: cart,
      message: 'Cantidad del ítem actualizada',
    });
  } catch (error) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: 'Ocurrió un error al actualizar la cantidad del ítem',
    });
  }
};

// Eliminar un ítem del carrito
export const removeItemFromCart = async (req, res) => {
  const { tableNumber, itemId } = req.body;

  try {
    const cart = await CartModel.findOne({ tableNumber });

    if (!cart) {
      return res.status(HttpCodes.NOT_FOUND).json({
        data: null,
        message: 'Carrito no encontrado',
      });
    }

    cart.items = cart.items.filter((i) => i.id !== itemId);

    await cart.save();

    return res.status(HttpCodes.OK).json({
      data: cart,
      message: 'Ítem eliminado del carrito',
    });
  } catch (error) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: 'Ocurrió un error al eliminar el ítem del carrito',
    });
  }
};
