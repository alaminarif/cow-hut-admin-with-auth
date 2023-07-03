import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './user.services';
import { IUser } from './user.interfaces';

// get uses
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  console.log('test user:', req.user);

  const result = await UserService.getAllUsers();
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
  const result = await UserService.getSingleUser(id);
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
  const updateData = req.body;
  const result = await UserService.updateUser(id, updateData);
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
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully  ',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  console.log('test profile controller', req.user?.userId);

  const userId = req.user?.userId;

  const result = await UserService.getMyProfile(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'users retrieved successfully  ',
    data: result,
  });
});
export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
};
