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
exports.del = exports.detail = exports.list = exports.edit = exports.add = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = __importDefault(require("./model"));
//Add new Product
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldProduct = yield model_1.default.findOne({
            productName: req.body.productName,
        }).exec();
        if (oldProduct) {
            res.status(409).json({ error: "The product name is taken" });
            return;
        }
        const newProduct = new model_1.default(req.body);
        newProduct._id = new mongoose_1.default.Types.ObjectId();
        newProduct.sellerId = mongoose_1.default.Types.ObjectId(req.userId);
        newProduct.save();
        res.status(200).json({ data: newProduct });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.add = add;
// Edit Product
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const editedProduct = req.body;
        const oldProduct = yield model_1.default.findOne({ _id: productId }).exec();
        if (!oldProduct) {
            res.status(404).json({ error: "The product not found" });
            return;
        }
        if (oldProduct.sellerId.toString() !== req.userId) {
            res
                .status(403)
                .json({ error: "You dont have permission to edit this product" });
            return;
        }
        for (let key in editedProduct) {
            oldProduct[key] = editedProduct[key];
        }
        const result = yield model_1.default.updateOne({ _id: productId }, { $set: oldProduct });
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.edit = edit;
// List of all Products
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
// Details of Product
const detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield model_1.default.findById(req.params.id).exec();
        if (!product) {
            res.status(404).json({ error: "The product not found" });
            return;
        }
        res.status(200).json({ data: product });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.detail = detail;
//Delete Product
const del = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield model_1.default.findOne({ _id: productId }).exec();
        if (!product) {
            res.status(404).json({ error: "The product not found" });
            return;
        }
        if (product.sellerId.toString() !== req.userId) {
            res
                .status(403)
                .json({ error: "You dont have permission to edit this product" });
            return;
        }
        const result = yield model_1.default.deleteOne({ _id: productId }).exec();
        res.status(200).json({ data: result });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.del = del;
