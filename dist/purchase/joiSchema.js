"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    "/deposit": {
        body: {
            deposit: joi_1.default.number().positive().required(),
        },
    },
    "/buy": {
        body: {
            productId: joi_1.default
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            amount: joi_1.default.number(),
        },
    },
    "/reset": {},
};
