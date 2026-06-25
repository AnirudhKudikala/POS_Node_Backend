import { Request, Response } from "express";
import * as productService from "./product.service";

interface BarcodeParams {
    barcode: string;
}

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productService.getProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProductByBarcode = async (
  req: Request<BarcodeParams>,
  res: Response
): Promise<void> => {
  try {
    const { barcode } = req.params;

    const product = await productService.getProductByBarcode(barcode);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};