import { IUser } from './user.interfaces';
import { User } from './user.model';

const createUsers = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const getUsers = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id);
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
export const UserServices = {
  createUsers,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
