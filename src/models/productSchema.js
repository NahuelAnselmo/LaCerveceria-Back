import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Cambiado a Number para representar valores monetarios
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['entrantes', 'burgers', 'tragos', 'bebidas', 'cervezas'],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); // Agrega timestamps automáticos

export default mongoose.model('Product', ProductSchema); // Nombre en singular
