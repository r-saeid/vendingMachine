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
exports.login = exports.del = exports.detail = exports.list = exports.edit = exports.add = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = __importDefault(require("./model"));
const authMethods_1 = require("../utils/authMethods");
const authMethods_2 = require("../utils/authMethods");
const model_2 = __importDefault(require("../product/model"));
//Add new User
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldUser = yield model_1.default.findOne({
            username: req.body.username,
        }).exec();
        if (oldUser) {
            res
                .status(409)
                .json({ data: "The user with this username is already exist" });
            return;
        }
        const newUser = new model_1.default(req.body);
        newUser._id = new mongoose_1.default.Types.ObjectId();
        newUser.password = yield authMethods_1.hashPassword(newUser.password);
        const result = newUser.save();
        const token = yield authMethods_2.signToken({ userId: newUser._id });
        res.status(200).json({ data: result, token });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.add = add;
// Edit User
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const editedUser = req.body;
        const oldUser = yield model_1.default.findOne({ _id: userId }).exec();
        if (!oldUser) {
            res.status(404).json({ data: "The user is not found" });
            return;
        }
        // let query={$set:oldUser}
        for (let key in editedUser) {
            oldUser[key] = editedUser[key];
        }
        const result = yield model_1.default.updateOne({ _id: userId }, { $set: oldUser });
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.edit = edit;
// List of all user
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.find().exec();
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.list = list;
// Details of user
const detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id).exec();
        if (!user) {
            res.status(404).json({ data: "The user is not found" });
            return;
        }
        res.status(200).json({ data: user });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.detail = detail;
//Delete user
const del = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id).exec();
        if (!user) {
            res.status(404).json({ data: "The user is not found" });
            return;
        }
        const product = yield model_2.default.findOne({
            sellerId: req.params.id,
        }).exec();
        if (product) {
            res
                .status(424)
                .json({ error: "The user can not be deleted because it has paroduct" });
            return;
        }
        const result = yield model_1.default.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.del = del;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const loginUser = yield model_1.default.findOne({
            username: inputData.username,
        }).exec();
        if (!loginUser) {
            res.status(404).json({ data: "The user is not found" });
            return;
        }
        const validCredential = yield authMethods_1.comparePassword(inputData.password, loginUser.password);
        const token = yield authMethods_2.signToken({ userId: loginUser._id });
        res.status(200).json({ data: { user: loginUser, token: token } });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.login = login;
