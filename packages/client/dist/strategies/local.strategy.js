"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_ENDPOINT = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var encrypt_1 = require("../utils/encrypt");
var token_1 = require("../utils/token");
exports.LOCAL_ENDPOINT = '/local';
var _a = process.env, TOKEN_SECRET = _a.TOKEN_SECRET, REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET;
exports.default = (function (driver) {
    var options = {
        usernameField: 'email',
        passwordField: 'password',
    };
    passport_1.default.use('local', new passport_local_1.Strategy(options, function (email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, newRefreshToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, driver.findUserByEmail({ email: email })];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, encrypt_1.comparePassword(password, user.password)];
                case 2:
                    if (!_b.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, token_1.createTokens(user, TOKEN_SECRET, "" + REFRESH_TOKEN_SECRET + user.password)];
                case 3:
                    _a = _b.sent(), newRefreshToken = _a[1];
                    delete user.password;
                    return [2 /*return*/, done(null, {
                            refreshToken: newRefreshToken,
                        })];
                case 4:
                    done('Passowrd is not right', null);
                    return [2 /*return*/];
            }
        });
    }); }));
    passport_1.default.use('local-signup', new passport_local_1.Strategy(__assign(__assign({}, options), { passReqToCallback: true }), function (req, email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
        var userExists, hashPassword, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findUserByEmail({ email: email })];
                case 1:
                    userExists = _a.sent();
                    if (userExists) {
                        return [2 /*return*/, done('user already exists', null)];
                    }
                    return [4 /*yield*/, encrypt_1.encryptPassword(password)];
                case 2:
                    hashPassword = _a.sent();
                    return [4 /*yield*/, driver.createUser({ email: email, password: hashPassword })];
                case 3:
                    user = _a.sent();
                    delete user.password;
                    done(null, user);
                    return [2 /*return*/];
            }
        });
    }); }));
    var router = express_1.default.Router();
    router.post('/login', passport_1.default.authenticate('local', { failureRedirect: '/login' }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            res.cookie('ac_refresh', (_a = req.user) === null || _a === void 0 ? void 0 : _a.refreshToken);
            res.send('ok');
            return [2 /*return*/];
        });
    }); });
    router.post('/signup', passport_1.default.authenticate('local-signup'), function (req, res) {
        res.json(req.user);
    });
    return router;
});
