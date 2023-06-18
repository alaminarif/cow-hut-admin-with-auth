import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../share/sendResponse';
import { CowServices } from './cow.services';
import { ICow } from './cow.interfaces';
// import { ICow } from './cow.interfaces';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const cow = req.body;
  const result = await CowServices.createCows(cow);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow created successfully  ',
    data: result,
  });
});

// get cow
const getCows = catchAsync(async (req: Request, res: Response) => {
  const result = await CowServices.getCows();
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow retrieved successfully  ',
    data: result,
  });
});

// get single cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowServices.getSingleCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow retrieved successfully !',
    data: result,
  });
});

// update cow
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await CowServices.updateCow(id, updateData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated  is successfully  ',
    data: result,
  });
});

// delete cow
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowServices.deleteCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow delete is  successfully  ',
    data: result,
  });
});

export const CowControllers = {
  createCow,
  getCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
