"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const routes_1 = __importDefault(require("./user/routes"));
const routes_2 = __importDefault(require("./product/routes"));
const routes_3 = __importDefault(require("./purchase/routes"));
const rootRouter = express_1.Router();
exports.rootRouter = rootRouter;
rootRouter.use("/user", routes_1.default);
rootRouter.use("/product", routes_2.default);
rootRouter.use("/purchase", routes_3.default);
