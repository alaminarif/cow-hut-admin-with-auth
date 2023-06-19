import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interfaces';
import { cowLabel, cowLocation } from './cow.constant';

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
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// cowSchema.pre('save', async function () {
//   let label = 0;
//   const isExsit = await Cow.findOne({ label: this.seller });
//   if (isExsit) {
//     label = 10;
//   }
// });

const Cow = model<ICow, CowModel>('Cow', cowSchema);

export default Cow;
