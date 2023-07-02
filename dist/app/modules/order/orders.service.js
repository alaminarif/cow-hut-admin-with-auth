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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleOrder = exports.allOrders = exports.newOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const mongoose_1 = require("mongoose");
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = __importDefault(require("./order.model"));
const newOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const user = yield user_model_1.User.findById(payload.buyer).session(session);
        const cow = yield cow_model_1.default.findById(payload.cow).session(session);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
        }
        else if (user.role !== 'buyer') {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User is not a buyer!');
        }
        else if (!cow) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found!');
        }
        else if (cow && cow.label === 'sold out') {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow is sold!');
        }
        else if (user && cow && user.budget < cow.price) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient funds!');
        }
        // Update cow's label to 'sold out'
        cow.label = 'sold out';
        yield cow.save();
        // Deduct the cost of the cow from the buyer's budget
        user.budget -= cow.price;
        yield user.save();
        // Add the same amount of cost to the seller's income
        const seller = yield user_model_1.User.findById(cow.seller).session(session);
        if (seller && seller.income !== undefined) {
            seller.income += cow.price;
            yield seller.save();
        }
        const order = yield order_model_1.default.create([payload], { session });
        const createdOrder = Array.isArray(order) ? order[0] : order;
        yield session.commitTransaction();
        session.endSession();
        const result = yield order_model_1.default.findById(createdOrder._id)
            .populate('buyer')
            .populate('cow')
            .exec();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.newOrder = newOrder;
const allOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find().populate('buyer').populate('cow');
    return result;
});
exports.allOrders = allOrders;
const singleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(id).populate('buyer').populate('cow');
    return result;
});
exports.singleOrder = singleOrder;
