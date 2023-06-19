"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controllers_1 = require("./cow.controllers");
const router = express_1.default.Router();
router.post('/', cow_controllers_1.CowControllers.createCow);
router.get('/:id', cow_controllers_1.CowControllers.getSingleCow);
router.patch('/:id', cow_controllers_1.CowControllers.updateCow);
router.delete('/:id', cow_controllers_1.CowControllers.deleteCow);
router.get('/', cow_controllers_1.CowControllers.getAllCows);
exports.cowRoutes = router;
