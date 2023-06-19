"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
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
        enum: cow_constant_1.cowLocation,
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
        enum: cow_constant_1.cowLabel,
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
}, {
    versionKey: false,
});
// cowSchema.pre('save', async function () {
//   let label = 0;
//   const isExsit = await Cow.findOne({ label: this.seller });
//   if (isExsit) {
//     label = 10;
//   }
// });
const Cow = (0, mongoose_1.model)('Cow', cowSchema);
exports.default = Cow;
