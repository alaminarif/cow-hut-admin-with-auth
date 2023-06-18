import httpStatus from 'http-status';
import { IUser } from '../user/user.interfaces';
import { AuthSevices } from './auth.service';
import sendResponse from '../../../share/sendResponse';
import catchAsync from '../../../share/catchAsync';
import { Request, Response } from 'express';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await AuthSevices.createUsers(user);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user created successfully  ',
    data: result,
  });
});

export const AuthControllers = { createUser };
