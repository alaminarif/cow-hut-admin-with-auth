import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interfaces';
import { cowCategory, cowLabel, cowLocation } from './cow.constant';

const cowSchema = new Schema<ICow>(
  {
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
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      enum: cowLabel,
      required: true,
    },
    category: {
      type: String,
      enum: cowCategory,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Cow = model<ICow, CowModel>('Cow', cowSchema);

export default Cow;
