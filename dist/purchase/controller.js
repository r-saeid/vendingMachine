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
exports.reset = exports.buy = exports.deposit = void 0;
const model_1 = __importDefault(require("../product/model"));
const model_2 = __importDefault(require("../user/model"));
const config_1 = __importDefault(require("../utils/config"));
//Deposit new amount
const deposit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deposit = req.body.deposit;
        if (!config_1.default.purchase.allowedDeposit.includes(deposit)) {
            res.status(406).json({
                data: `Allowed deposite is  ${config_1.default.purchase.allowedDeposit}`,
            });
            return;
        }
        const userId = req.userId;
        const user = yield model_2.default.findOne({ _id: userId }).exec();
        if (user.role === "seller") {
            res
                .status(403)
                .json({ data: `Users with ${user.role} role can not deposit` });
            return;
        }
        deposit = deposit + user.deposit;
        const result = yield model_2.default.updateOne({ _id: userId }, { $set: { deposit } });
        res.status(200).json({ data: { _id: user._id, deposit } });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.deposit = deposit;
// Buy product
const buy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, amount } = req.body;
        const product = yield model_1.default.findOne({ _id: productId }).exec();
        if (!product) {
            res.status(404).json({ error: "The product not found" });
            return;
        }
        if (product.amountAvailable < amount) {
            res.status(424).json({ error: "There is not enough product in machine" });
            return;
        }
        const userId = req.userId;
        const buyer = yield model_2.default.findOne({ _id: userId }).exec();
        if (buyer.role !== "buyer") {
            res
                .status(403)
                .json({ data: `Users with ${buyer.role} role can not buy product` });
            return;
        }
        const totalCost = amount * product.cost;
        if (buyer.deposit < totalCost) {
            res.status(424).json({
                data: `Your deposit is  ${buyer.deposit}. It is not enough to buy choosen product`,
            });
            return;
        }
        const change = buyer.deposit - totalCost;
        yield model_2.default.updateOne({ _id: userId }, { $set: { deposit: change } });
        const changeCoins = calculateCoins(change);
        res
            .status(200)
            .json({ data: { totalCost, product, amount, change: changeCoins } });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.buy = buy;
// Reset the deposit
const reset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const buyer = yield model_2.default.findOne({ _id: userId }).exec();
        if (buyer.role !== "buyer") {
            res
                .status(403)
                .json({ data: `Users with ${buyer.role} role can not reset deposit` });
            return;
        }
        const result = yield model_2.default.updateOne({ _id: userId }, { $set: { deposit: 0 } });
        res.status(200).json({ data: "reset" });
    }
    catch (error) {
        res.status(500).json({ data: error });
    }
});
exports.reset = reset;
function calculateCoins(returnDeposit) {
    let returnAmount = returnDeposit;
    const allowedCoins = config_1.default.purchase.allowedDeposit.sort((a, b) => {
        return b - a;
    });
    const output = {};
    allowedCoins.forEach((value, index, array) => {
        output[value] = Math.floor(returnAmount / value);
        returnAmount = returnAmount % value;
    });
    for (let key in output) {
        if (output[key] === 0)
            delete output[key];
    }
    return output;
}
