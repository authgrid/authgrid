"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controllers/auth.controller");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.get('/token/refresh', auth_controller_1.refreshToken);
