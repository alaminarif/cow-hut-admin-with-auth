import { ICow } from './cow.interfaces';
import Cow from './cow.model';

// create cow
const createCows = async (cow: ICow): Promise<ICow | null> => {
  const result = await Cow.create(cow);
  return result;
};
// get cow
const getCows = async () => {
  const result = await Cow.find();
  return result;
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
  getCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
