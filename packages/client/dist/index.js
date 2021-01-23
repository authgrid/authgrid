"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverHolder = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
require('dotenv').config();
var routes_1 = __importDefault(require("./routes"));
var local_strategy_1 = __importStar(require("./strategies/local.strategy"));
var DriverHolder = /** @class */ (function () {
    function DriverHolder() {
        this.driver = null;
    }
    DriverHolder.getInstance = function () {
        if (!DriverHolder.instance) {
            DriverHolder.instance = new DriverHolder();
        }
        return DriverHolder.instance;
    };
    DriverHolder.setDriver = function (driver) {
        DriverHolder.getInstance().driver = driver;
    };
    DriverHolder.getDriver = function () {
        return DriverHolder.getInstance().driver;
    };
    return DriverHolder;
}());
exports.DriverHolder = DriverHolder;
exports.default = (function (options) {
    if (options.driver) {
        DriverHolder.setDriver(options.driver);
    }
    else {
        throw new Error('please select a driver');
    }
    var router = express_1.default.Router();
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
    router.use(cookie_parser_1.default());
    router.use(passport_1.default.initialize());
    router.use(passport_1.default.session());
    passport_1.default.serializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.deserializeUser(function (user, done) {
        done(null, user);
    });
    router.use(local_strategy_1.LOCAL_ENDPOINT, local_strategy_1.default(options.driver));
    router.use('/', routes_1.default);
    return router;
});
