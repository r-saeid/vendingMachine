"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("./config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(Number(config_1.default.JWT.salt));
    const hashedPasswod = yield bcrypt_1.default.hash(password, salt);
    return hashedPasswod;
});
exports.hashPassword = hashPassword;
const comparePassword = (inputPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const validPassword = yield bcrypt_1.default.compare(inputPassword, savedPassword);
    return validPassword;
});
exports.comparePassword = comparePassword;
const signToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const token = jsonwebtoken_1.default.sign(data, config_1.default.JWT.JWTPrivateKey, {
                subject: "login",
                issuer: "vendingProject",
                audience: "app",
            });
            resolve(token);
        }
        catch (error) {
            resolve(error);
        }
    });
});
exports.signToken = signToken;
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const decodedData = jsonwebtoken_1.default.verify(token, config_1.default.JWT.JWTPrivateKey, {
                audience: "app",
                subject: "login",
                maxAge: config_1.default.JWT.maxAge,
                issuer: "vendingProject",
            });
            resolve(decodedData);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
exports.verifyToken = verifyToken;
