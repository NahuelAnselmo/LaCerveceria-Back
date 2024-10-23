import Joi from 'joi';

export const post_orderValidationSchema = Joi.object({
  tableNumber: Joi.number().min(1).max(20).required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      name: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      price: Joi.number().min(0).required(),
      total: Joi.number().min(0).required(),
    })
  ).required(),
  totalAmount: Joi.number().min(0).required(),
  comment: Joi.string().max(500).allow(''),
});
