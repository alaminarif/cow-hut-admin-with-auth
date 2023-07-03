import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdminLogin, IAdminLoginResponse, IAdmins } from './admin.interface';
import Admin from './admin.model';
// import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwt.helpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createAdmin = async (payload: IAdmins): Promise<IAdmins | null> => {
  const result = await Admin.create(payload);

  return result;
};
const loginAdmin = async (
  payload: IAdminLogin
): Promise<IAdminLoginResponse> => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does"t exist');
  }

  if (
    isAdminExist.password &&
    !(await Admin?.isPasswordMatched(password, isAdminExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const { _id: userId, role } = isAdminExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { phoneNumber } = verifiedToken;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isAdminExist._id,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AdminService = { createAdmin, loginAdmin, refreshToken };
