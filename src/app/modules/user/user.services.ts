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
  console.log('my profile', userId);

  // const isUserExist = await User.isUserExist(userId);
  // console.log('isUserExist: ', isUserExist);

  const result = await User.findById({ _id: userId });
  return result;
};
export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
};
