import { IOrder, OrderModel } from './order.interface';
import { Schema, model } from 'mongoose';

const orderSchema = new Schema<IOrder>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Order = model<IOrder, OrderModel>('Order', orderSchema);

export default Order;
