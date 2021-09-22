import mongoose from "mongoose";
import User from "../user/model";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: mongoose.Types.ObjectId;
}

export const productSchema = new mongoose.Schema<IProduct>({
  _id: mongoose.Schema.Types.ObjectId,
  amountAvailable: { type: Number },
  cost: { type: Number },
  productName: { type: String, unique: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
