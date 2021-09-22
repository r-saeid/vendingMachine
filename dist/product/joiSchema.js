"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    "/add": {
        body: {
            amountAvailable: joi_1.default.number().required(),
            cost: joi_1.default.number().positive().required(),
            productName: joi_1.default.string().min(6).max(150).required(),
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
            amountAvailable: joi_1.default.number(),
            cost: joi_1.default.number(),
            productName: joi_1.default.string().min(6).max(150),
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
};
