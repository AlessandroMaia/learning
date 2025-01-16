import { model, Schema } from 'mongoose';

export const Order = model(
  'order',
  new Schema({
    table: { type: String, required: true },
    status: {
      type: String,
      enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
      default: 'WAITING',
    },
    createAt: { type: Date, default: Date.now },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'product',
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  })
);
