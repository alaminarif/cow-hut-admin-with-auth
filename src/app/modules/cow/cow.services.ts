import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginations';
import { ICow } from './cow.interfaces';
import Cow from './cow.model';

// create cow
const createCows = async (cow: ICow): Promise<ICow | null> => {
  const result = await Cow.create(cow);
  return result;
};
// get cow
const getAllCows = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //  const whereConditions =
  //    andConditions.length > 0 ? { $and: andConditions } : {};

  //
  const result = await Cow.find().sort(sortConditions).skip(skip).limit(limit);

  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get Single Cow
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};

//  Update Cow
const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Delete Cow
const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};
export const CowServices = {
  createCows,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
