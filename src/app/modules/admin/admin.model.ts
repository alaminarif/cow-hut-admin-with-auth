/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { AdminModel, IAdmins } from './admin.interface';

import config from '../../../config';
import bcrypt from 'bcrypt';
import { role } from '../user/user.constant';

const AdminSchema = new Schema<IAdmins, AdminModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
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
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      // transform: function (doc, ret) {
      //   delete ret.password; // Exclude password from the JSON response
      // },
    },
  }
);

// AdminSchema.pre<IAdmins>('save', function (next) {
//   if (this.isModified('password')) {
//     // Only hash the password if it has been modified (new or updated)
//     // Add your password hashing logic here
//     // For example, you can use bcrypt or any other password hashing library
//     // and update the hashed password value on `this.password`
//     this.password = hashPassword(this.password);
//   }
//   next();
// });

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmins, 'phoneNumber' | 'password' | 'role' | '_id'> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
AdminSchema.pre('save', async function (next) {
  // hashing user password
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
const Admin = model<IAdmins, AdminModel>('Admin', AdminSchema);

export default Admin;
