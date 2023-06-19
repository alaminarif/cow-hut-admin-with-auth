import { Model } from 'mongoose';

export type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
export type ICowBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICategory = 'Dairy' | 'Beef' | 'DualPurpose';
export type ILabel = 'for sale' | 'sold out';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowLocation;
  breed: string;
  weight: string;
  label: ILabel;
  category: ICategory;
  seller: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  maxPrice?: number;
  minPrice?: number;
};
