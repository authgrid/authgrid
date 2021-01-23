"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_routes_1 = require("./auth.routes");
var withAuthentication_1 = require("../middlewares/withAuthentication");
var user_routes_1 = require("./user.routes");
var router = express_1.default.Router();
router.use('/auth', auth_routes_1.authRoutes);
router.use('/user', withAuthentication_1.withAuthentication(), user_routes_1.userRoutes);
exports.default = router;
