import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.services';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  // console.log(user);

  const result = await UserServices.createUsers(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully  ',
    data: result,
  });
});

// get uses
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = UserServices.getUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully  ',
    data: result,
  });
});

//  get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UserServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully  ',
    data: result,
  });
});

//  update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UserServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully  ',
    data: result,
  });
});

//  delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UserServices.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully  ',
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
