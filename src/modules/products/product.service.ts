import { db } from "../../config/database";
import { Product } from "./product.types";

export const getProducts = async (): Promise<Product[]> => {
  const result = await db.query(
    `
    SELECT
      id,
      barcode,
      name,
      price
    FROM products
    ORDER BY id;
    `
  );

  return result.rows;
};

export const getProductByBarcode = async (
  barcode: string
): Promise<Product | null> => {

  const result = await db.query(
    `
    SELECT
      id,
      barcode,
      name,
      price
    FROM products
    WHERE barcode = $1;
    `,
    [barcode]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};