import { Router } from "express";
import productRoutes from "../modules/products/product.route";
import salesRoutes from '../modules/sales/sales.route';
import healthRoutes from "../modules/health/health.route"

const router = Router();

router.use("/health", healthRoutes);
router.use("/products", productRoutes);
router.use("/sales", salesRoutes);

export default router;