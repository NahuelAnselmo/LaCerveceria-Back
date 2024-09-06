import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  tableNumber: String,
  items: [itemSchema],
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
