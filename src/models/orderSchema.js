import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  comment: {  // Nuevo campo para el comentario
    type: String,
    required: false, // Puedes hacerlo requerido si es necesario
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model('Order', orderSchema);

// Exportación con default
export default Order;
