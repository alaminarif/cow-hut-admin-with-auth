import { Model, Schema } from 'mongoose';
import { Role } from '../user/user.interfaces';

/* eslint-disable no-unused-vars */
export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmins = {
  _id: Schema.Types.ObjectId;
  phoneNumber: string;
  role: Role;
  password: string;
  name: UserName;
  address: string;
};

export type IAdminLogin = {
  phoneNumber: string;
  password: string;
};

export type IAdminLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmins, 'phoneNumber' | 'password' | 'role' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmins>;
