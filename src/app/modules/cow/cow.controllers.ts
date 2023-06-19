import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../share/sendResponse';
import { CowServices } from './cow.services';
import { ICow } from './cow.interfaces';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/paginations';
import { cowFilterableFields } from './cow.constant';
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

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  console.log(paginationOptions);
  // get cow
  //
  const result = await CowServices.getAllCows(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow retrieved successfully  ',
    meta: result.meta,
    data: result.data,
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
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
