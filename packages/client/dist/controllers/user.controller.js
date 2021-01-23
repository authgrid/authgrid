"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
var getUser = function (req, res) {
    res.send(req.user);
};
exports.getUser = getUser;
