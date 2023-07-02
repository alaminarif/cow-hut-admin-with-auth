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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = __importDefault(require("./admin.model"));
// import bcrypt from 'bcrypt';
const jwt_helpers_1 = require("../../../helpers/jwt.helpers");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.create(payload);
    return result;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admin_model_1.default.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does"t exist');
    }
    if (isAdminExist.password &&
        !(yield (admin_model_1.default === null || admin_model_1.default === void 0 ? void 0 : admin_model_1.default.isPasswordMatched(password, isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password)))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'password is incorrect');
    }
    const { _id, phoneNumber: adminPhoneNumber, role } = isAdminExist;
    const accessToken = jwt_helpers_1.jwtHelpers.createToken({ _id, adminPhoneNumber, role }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    const refreshToken = jwt_helpers_1.jwtHelpers.createToken({ _id, adminPhoneNumber, role }, config_1.default.jwt.secret, config_1.default.jwt.refresh_expire_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwt_helpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { phoneNumber } = verifiedToken;
    const isAdminExist = yield admin_model_1.default.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwt_helpers_1.jwtHelpers.createToken({
        phoneNumber: isAdminExist.phoneNumber,
        role: isAdminExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AdminService = { createAdmin, loginAdmin, refreshToken };
