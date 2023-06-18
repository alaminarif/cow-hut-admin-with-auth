import { IUser } from '../user/user.interfaces';
import { User } from '../user/user.model';

const createUsers = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

export const AuthSevices = {
  createUsers,
};
