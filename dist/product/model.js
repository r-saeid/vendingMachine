"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    amountAvailable: { type: Number },
    cost: { type: Number },
    productName: { type: String, unique: true },
    sellerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
const Product = mongoose_1.default.model("Product", exports.productSchema);
exports.default = Product;
