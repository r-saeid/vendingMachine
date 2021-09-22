"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const singleRun_1 = __importDefault(require("./utils/singleRun"));
singleRun_1.default();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const requestLogger_1 = require("./utils/requestLogger");
const db_1 = __importDefault(require("./utils/db"));
const config_1 = __importDefault(require("./utils/config"));
const app = express_1.default();
exports.app = app;
db_1.default.connection();
var allowedOrigins = ["http://localhost:4000", "http://yourapp.com"];
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(requestLogger_1.requestLogger);
app.use("/", routes_1.rootRouter);
app.listen(config_1.default.port, () => {
    console.log(`App running on port ${config_1.default.port}`);
});
