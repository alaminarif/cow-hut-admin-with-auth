import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import { AdminService } from './admin.service';
import sendResponse from '../../../share/sendResponse';
import httpStatus from 'http-status';
import { IAdminLoginResponse, IAdmins } from './admin.interface';
import config from '../../../config';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;

  const result = await AdminService.createAdmin(adminData);

  sendResponse<IAdmins>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully  ',
    data: result,
  });
});
const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;

  const cookieOptions = {
    secure: true,
    httpOnly: config.env === 'production',
  };
  const result = await AdminService.loginAdmin(adminData);

  const { refreshToken, ...others } = result;

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IAdminLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'logIn  successfully  ',
    data: others,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { ...refreshToken } = req.cookies;

  const cookieOptions = {
    secure: true,
    httpOnly: config.env === 'production',
  };
  const result = await AdminService.refreshToken(refreshToken);

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IAdminLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'logIn  successfully  ',
    data: result,
  });
});

export const AdminController = { createAdmin, loginAdmin, refreshToken };
