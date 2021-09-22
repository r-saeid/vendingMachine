import { Request, Response, NextFunction } from "express";

import Product from "../product/model";
import User from "../user/model";
import config from "../utils/config";

//Deposit new amount
export const deposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let deposit = req.body.deposit;

    if (!config.purchase.allowedDeposit.includes(deposit)) {
      res.status(406).json({
        data: `Allowed deposite is  ${config.purchase.allowedDeposit}`,
      });
      return;
    }
    const userId = req.userId;

    const user: any = await User.findOne({ _id: userId }).exec();

    if (user.role === "seller") {
      res
        .status(403)
        .json({ data: `Users with ${user.role} role can not deposit` });
      return;
    }

    deposit = deposit + user.deposit;
    const result = await User.updateOne({ _id: userId }, { $set: { deposit } });
    res.status(200).json({ data: { _id: user._id, deposit } });
  } catch (error) {
    res.status(500).json({ data: error });
  }
};

// Buy product
export const buy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, amount } = req.body;

    const product: any = await Product.findOne({ _id: productId }).exec();
    if (!product) {
      res.status(404).json({ error: "The product not found" });
      return;
    }

    if (product.amountAvailable < amount) {
      res.status(424).json({ error: "There is not enough product in machine" });
      return;
    }

    const userId = req.userId;

    const buyer: any = await User.findOne({ _id: userId }).exec();

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

    await User.updateOne({ _id: userId }, { $set: { deposit: change } });

    const changeCoins = calculateCoins(change);

    res
      .status(200)
      .json({ data: { totalCost, product, amount, change: changeCoins } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Reset the deposit
export const reset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    const buyer: any = await User.findOne({ _id: userId }).exec();

    if (buyer.role !== "buyer") {
      res
        .status(403)
        .json({ data: `Users with ${buyer.role} role can not reset deposit` });
      return;
    }

    const result = await User.updateOne(
      { _id: userId },
      { $set: { deposit: 0 } }
    );

    res.status(200).json({ data: "reset" });
  } catch (error) {
    res.status(500).json({ data: error });
  }
};

function calculateCoins(returnDeposit: number) {
  let returnAmount = returnDeposit;
  const allowedCoins = config.purchase.allowedDeposit.sort(
    (a: number, b: number) => {
      return b - a;
    }
  );

  const output: any = {};
  allowedCoins.forEach((value, index, array) => {
    output[value] = Math.floor(returnAmount / value);
    returnAmount = returnAmount % value;
  });

  for (let key in output) {
    if (output[key] === 0) delete output[key];
  }

  return output;
}
