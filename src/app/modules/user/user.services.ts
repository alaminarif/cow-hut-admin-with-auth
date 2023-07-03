import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interfaces';
import { User } from './user.model';

const getAllUsers = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const getMyProfile = async (
  userId: string | undefined
): Promise<IUser | null> => {
  const result = await User.findById({ _id: userId });
  return result;
};

const profoleUpdate = async (
  userId: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById({ _id: userId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not found');
  }

  const { name, ...userData } = payload;

  const updateUser: Partial<IUser> = { ...userData };

  // dynamically update
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updateUser as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findByIdAndUpdate({ _id: userId }, updateUser, {
    new: true,
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  profoleUpdate,
};
