import { Model } from 'mongoose';

export type IUserRole = 'seller' | 'buyer';

export type IUserName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  phoneNumber: string;
  role: IUserRole;
  password: string;
  name: IUserName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
