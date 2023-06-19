import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interfaces';
import { userRole } from './user.constant';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// userSchema.pre('save', async function (next) {
//   if (this.role === 'buyer') {
//     this.income = 0;
//   }
//   if (this.role === 'seller') {
//     this.budget = 0;
//     this.income = 0;
//   }

//   next();
// });

export const User = model<IUser, UserModel>('User', userSchema);
