"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
// router.get();
// router.post('/login', );
router.post('/create-admin', admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.loginZodSchema), admin_controller_1.AdminController.loginAdmin);
router.post('/refresh-token', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.refreshTokenZodSchema), admin_controller_1.AdminController.refreshToken);
exports.AdminRoutes = router;
