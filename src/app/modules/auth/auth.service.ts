import { IUser } from '../user/user.interfaces';
import { User } from '../user/user.model';

const createUsers = async (user: IUser): Promise<IUser | null> => {
  // const role = await User.findOne({ role: seller });

  if (user.role === 'seller') {
    user.income = 0;
    user.budget = 0;
  }

  if (user.role === 'buyer') {
    user.income = 0;
  }

  const result = await User.create(user);

  return result;
};

export const AuthSevices = {
  createUsers,
};
