"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./index"));
var drivers_1 = require("@authcom/drivers");
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(String('mongodb://localhost/authcom'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var app = express_1.default();
var port = 8080;
app.use(cors_1.default({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/authcom', index_1.default({
    driver: drivers_1.MongooseDriver(),
}));
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
