import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginations';
import { ICow, ICowFilters } from './cow.interfaces';
import Cow from './cow.model';
import { cowSearchableFields } from './cow.constant';

// create cow
const createCows = async (cow: ICow): Promise<ICow | null> => {
  const result = await Cow.create(cow);
  return result;
};
// get cow
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // const { searchTerm, ...filtersData } = filters;

  // const andConditions = [];

  // if (searchTerm) {
  //   andConditions.push({
  //     $or: cowSearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];
  // const hasLength =
  //   searchTerm ||
  //   minPrice !== undefined ||
  //   maxPrice !== undefined ||
  //   Object.keys(filters).length > 0;

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceCondition: { $gte?: number; $lte?: number } = {};
    if (minPrice !== undefined) {
      priceCondition.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      priceCondition.$lte = maxPrice;
    }
    andConditions.push({ price: priceCondition });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  //
  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

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

/*
const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

    const andConditions = [];
    const hasLength =
        searchTerm ||
        minPrice !== undefined ||
        maxPrice !== undefined ||
        Object.keys(filters).length > 0;

    if (searchTerm) {
        andConditions.push({
            $or: cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        const priceCondition: { $gte?: number; $lte?: number } = {};
        if (minPrice !== undefined) {
            priceCondition.$gte = minPrice;
        }
        if (maxPrice !== undefined) {
            priceCondition.$lte = maxPrice;
        }
        andConditions.push({ price: priceCondition });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

*/
