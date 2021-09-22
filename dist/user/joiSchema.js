"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const customeTypes_1 = require("../utils/customeTypes");
exports.default = {
    "/add": {
        body: {
            username: joi_1.default.string().min(6).max(150).required(),
            password: joi_1.default.string().min(6).max(150).required(),
            role: joi_1.default
                .string()
                .valid(...Object.values(customeTypes_1.roles))
                .required(),
        },
    },
    "/edit/:id": {
        params: {
            id: joi_1.default
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        },
        body: {
            username: joi_1.default.string().min(6).max(150),
            password: joi_1.default.string().min(6).max(150),
            role: joi_1.default.string().valid(...Object.values(customeTypes_1.roles)),
        },
    },
    "/list": {},
    "/detail/:id": {
        params: {
            id: joi_1.default
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        },
    },
    "/delete/:id": {
        params: {
            id: joi_1.default
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        },
    },
    "/login": {
        body: {
            username: joi_1.default.string().min(6).max(150).required(),
            password: joi_1.default.string().min(6).max(150).required(),
        },
    },
};
