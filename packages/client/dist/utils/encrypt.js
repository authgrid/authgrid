"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = 10;
var encryptPassword = function (password) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.hash(password, saltRounds, function (err, hash) {
            if (err)
                reject(err);
            resolve(hash);
        });
    });
};
exports.encryptPassword = encryptPassword;
var comparePassword = function (password, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.compare(password, hash, function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
};
exports.comparePassword = comparePassword;
