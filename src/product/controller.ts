import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product, { IProduct, productSchema } from "./model";

//Add new Product
export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldProduct: any = await Product.findOne({
      productName: req.body.productName,
    }).exec();
    if (oldProduct) {
      res.status(409).json({ error: "The product name is taken" });
      return;
    }
    const newProduct = new Product(req.body);
    newProduct._id = new mongoose.Types.ObjectId();
    newProduct.sellerId = mongoose.Types.ObjectId(req.userId);
    newProduct.save();
    res.status(200).json({ data: newProduct });
  } catch (error) {
    res.status(500).json({ data: error });
  }
};

// Edit Product
export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const editedProduct: any = req.body;

    const oldProduct: any = await Product.findOne({ _id: productId }).exec();
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

    const result = await Product.updateOne(
      { _id: productId },
      { $set: oldProduct }
    );
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// List of all Products
export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Product.find().exec();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ data: error });
  }
};

// Details of Product
export const detail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      res.status(404).json({ error: "The product not found" });
      return;
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ data: error });
  }
};

//Delete Product
export const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product: any = await Product.findOne({ _id: productId }).exec();
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

    const result = await Product.deleteOne({ _id: productId }).exec();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ data: error });
  }
};
