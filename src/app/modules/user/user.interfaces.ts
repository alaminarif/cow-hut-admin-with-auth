/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';

export type Role = 'seller' | 'buyer' | 'admin';

export type name = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  _id: Schema.Types.ObjectId;
  phoneNumber: string;
  role: Role;
  password: string;
  name: name;
  address: string;
  budget: number;
  income: number;
};
export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<
    Pick<IUser, 'phoneNumber' | 'password' | 'role' | 'address' | '_id'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
