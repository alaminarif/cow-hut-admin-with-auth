"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_model_1 = __importDefault(require("./cow.model"));
const cow_constant_1 = require("./cow.constant");
// create cow
const createCows = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.create(cow);
    return result;
});
// get cow
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // const { searchTerm, ...filtersData } = filters;
    // const andConditions = [];
    // if (searchTerm) {
    //   andConditions.push({
    //     $or: cowSearchableFields.map(field => ({
    //       [field]: {
    //         $regex: searchTerm,
    //         $options: 'i',
    //       },
    //     })),
    //   });
    // }
    // if (Object.keys(filtersData).length) {
    //   andConditions.push({
    //     $and: Object.entries(filtersData).map(([field, value]) => ({
    //       [field]: value,
    //     })),
    //   });
    // }
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    // const hasLength =
    //   searchTerm ||
    //   minPrice !== undefined ||
    //   maxPrice !== undefined ||
    //   Object.keys(filters).length > 0;
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        const priceCondition = {};
        if (minPrice !== undefined) {
            priceCondition.$gte = minPrice;
        }
        if (maxPrice !== undefined) {
            priceCondition.$lte = maxPrice;
        }
        andConditions.push({ price: priceCondition });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    //
    const result = yield cow_model_1.default.find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get Single Cow
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findById(id);
    return result;
});
//  Update Cow
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Cow
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.CowServices = {
    createCows,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
/*
const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

    const andConditions = [];
    const hasLength =
        searchTerm ||
        minPrice !== undefined ||
        maxPrice !== undefined ||
        Object.keys(filters).length > 0;

    if (searchTerm) {
        andConditions.push({
            $or: cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        const priceCondition: { $gte?: number; $lte?: number } = {};
        if (minPrice !== undefined) {
            priceCondition.$gte = minPrice;
        }
        if (maxPrice !== undefined) {
            priceCondition.$lte = maxPrice;
        }
        andConditions.push({ price: priceCondition });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

*/
