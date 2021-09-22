"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = {
    port: Number(process.env.PORT) || 4000,
    mongoDB: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        database: process.env.MONGO_DATABASE,
        username: process.env.MONGO_USERNAME,
        pasword: process.env.MONGO_PASSWORD,
    },
    JWT: {
        JWTPrivateKey: fs_1.default.readFileSync(__dirname + "/keys/jwtKey.key", {
            encoding: "utf-8",
        }),
        salt: process.env.SALT,
        maxAge: "20d",
    },
    purchase: {
        allowedDeposit: [20, 5, 10, 50, 100],
    },
};
