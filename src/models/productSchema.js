import mongoose from 'mongoose';

const Product = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: String,
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
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Products', Product);
