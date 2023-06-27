import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interfaces';
import { userRole } from './user.constant';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      // unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },

    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// userSchema.pre('save', async function (next) {
//   const isExist = await User.findOne({
//     phoneNumber: this.phoneNumber,
//   });
//   if (isExist) {
//     throw new ApiError(httpStatus.CONFLICT, 'phone number is already exist !');
//   }
//   next();
// });

export const User = model<IUser, UserModel>('User', userSchema);
