import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import productRoutes from "./modules/products/product.route";
import emailRoutes from './routes/email';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/products", productRoutes);

app.use('/email', emailRoutes);

export default app;