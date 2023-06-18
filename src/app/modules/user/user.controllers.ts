import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.services';
import { IUser } from './user.interfaces';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await UserServices.createUsers(user);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user created successfully  ',
    data: result,
  });
});

// get uses
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsers();
  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'users retrieved successfully  ',
    data: result,
  });
});

//  get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrieved successfully  ',
    data: result,
  });
});

//  update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully  ',
    data: result,
  });
});

//  delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully  ',
    data: result,
  });
});
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
