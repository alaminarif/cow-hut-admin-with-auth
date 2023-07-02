import { Model } from 'mongoose';
import { Role } from '../user/user.interfaces';

/* eslint-disable no-unused-vars */
export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmins = {
  phoneNumber: string;
  role: Role;
  password?: string;
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
    id: string
  ): Promise<Pick<IAdmins, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmins>;
