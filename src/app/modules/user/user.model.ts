import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interfaces';
import { role } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const UserSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: role,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null> {
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1, _id: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
