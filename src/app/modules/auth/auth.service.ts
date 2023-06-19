import { IUser } from '../user/user.interfaces';
import { User } from '../user/user.model';

const createUsers = async (payload: IUser): Promise<IUser | null> => {
  if (payload.role === 'seller') {
    payload.budget = 0;
  }

  // if (payload.role === 'buyer') {
  //   payload.income = 0;
  // }

  const result = await User.create(payload);

  return result;
};

export const AuthSevices = {
  createUsers,
};
