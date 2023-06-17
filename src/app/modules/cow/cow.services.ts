import { ICow } from './cow.interfaces';
import Cow from './cow.model';

// create cow
const createCows = async (cow: ICow) => {
  const result = await Cow.create(cow);
  return result;
};
// get cow
const getCows = async () => {
  const result = await Cow.find();
  return result;
};

// get Single Cow
const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id);
  return result;
};

//  Update Cow
const updateCow = async (id: string) => {
  const result = await Cow.findByIdAndUpdate(id);
  return result;
};

// Delete Cow
const deleteCow = async (id: string) => {
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
