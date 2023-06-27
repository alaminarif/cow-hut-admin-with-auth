"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        // unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: user_constant_1.userRole,
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
}, {
    timestamps: true,
    versionKey: false,
});
// userSchema.pre('save', async function (next) {
//   const isExist = await User.findOne({
//     phoneNumber: this.phoneNumber,
//   });
//   if (isExist) {
//     throw new ApiError(httpStatus.CONFLICT, 'phone number is already exist !');
//   }
//   next();
// });
exports.User = (0, mongoose_1.model)('User', userSchema);
