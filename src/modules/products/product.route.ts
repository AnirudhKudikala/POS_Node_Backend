import { Router } from "express";

import {
  getAllProducts,
  getProductByBarcode,
} from "./product.controller";

const router = Router();

router.get("/", getAllProducts);

router.get("/:barcode", getProductByBarcode);

export default router;