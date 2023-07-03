import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import { allOrders, newOrder, singleOrder } from './orders.service';
import sendResponse from '../../../share/sendResponse';
import { IOrder } from './order.interface';
import httpStatus from 'http-status';

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...order } = req.body;

  const result = await newOrder(order);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await allOrders();

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully!',
    data: result,
  });
});

export const getSingleOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // let result = null;
    // if (req.user?.userId === id) {

    // }
    // if (req.user?.userId !== id) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, 'you not access');
    // }
    const result = await singleOrder(id);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully!',
      data: result,
    });
  }
);
