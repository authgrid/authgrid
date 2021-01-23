"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.BadRequestError = void 0;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(error) {
        var _this = _super.call(this, error.message) || this;
        _this.data = { error: error };
        _this.statusCode = 400;
        return _this;
    }
    return BadRequestError;
}(Error));
exports.BadRequestError = BadRequestError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(error) {
        var _this = _super.call(this, error === null || error === void 0 ? void 0 : error.message) || this;
        _this.data = { error: error };
        _this.statusCode = 401;
        return _this;
    }
    return UnauthorizedError;
}(Error));
exports.UnauthorizedError = UnauthorizedError;
