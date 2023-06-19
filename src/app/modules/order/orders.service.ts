import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { startSession } from 'mongoose';
import Cow from '../cow/cow.model';
import ApiError from '../../../errors/ApiError';
import Order from './order.model';

export const newOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const session = await startSession();
  try {
    session.startTransaction();

    const user = await User.findById(payload.buyer).session(session);
    const cow = await Cow.findById(payload.cow).session(session);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    } else if (user.role !== 'buyer') {
      throw new ApiError(httpStatus.CONFLICT, 'User is not a buyer!');
    } else if (!cow) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
    } else if (cow && cow.label === 'sold out') {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cow is sold!');
    } else if (user && cow && user.budget < cow.price) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds!');
    }

    // Update cow's label to 'sold out'
    cow.label = 'sold out';
    await cow.save();

    // Deduct the cost of the cow from the buyer's budget
    user.budget -= cow.price;
    await user.save();

    // Add the same amount of cost to the seller's income
    const seller = await User.findById(cow.seller).session(session);

    if (seller && seller.income !== undefined) {
      seller.income += cow.price;
      await seller.save();
    }

    const order = await Order.create([payload], { session });
    const createdOrder = Array.isArray(order) ? order[0] : order;

    await session.commitTransaction();
    session.endSession();

    const result = await Order.findById(createdOrder._id)
      .populate('buyer')
      .populate('cow')
      .exec();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const allOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find().populate('buyer').populate('cow');

  return result;
};

export const singleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id).populate('buyer').populate('cow');

  return result;
};
