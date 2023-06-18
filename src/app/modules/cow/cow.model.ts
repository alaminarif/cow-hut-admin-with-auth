import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interfaces';
import { cowBreed, cowLocation } from './cow.constant';

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    enum: cowLocation,
    required: true,
  },
  breed: {
    type: String,
    enum: cowBreed,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    enum: ['for sale', 'sold out'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
});

const Cow = model<ICow, CowModel>('Cow', cowSchema);

export default Cow;
