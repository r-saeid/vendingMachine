"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customeTypes_1 = require("../utils/customeTypes");
exports.userSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    deposit: { type: Number, require: true },
    role: { type: String, enum: customeTypes_1.roles },
});
const User = mongoose_1.default.model("User", exports.userSchema);
exports.default = User;
