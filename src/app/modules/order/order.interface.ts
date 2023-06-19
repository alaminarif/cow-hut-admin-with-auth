import { Model, Types } from 'mongoose';
import { ICow } from '../cow/cow.interfaces';
import { IUser } from '../user/user.interfaces';

export type IOrder = {
  buyer: Types.ObjectId | IUser;
  cow: Types.ObjectId | ICow;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
