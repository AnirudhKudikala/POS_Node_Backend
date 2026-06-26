import { pool } from "../../database/database";

export const getProducts = async () => {
    const query = `
        SELECT
            id,
            barcode,
            name,
            price
        FROM products
        ORDER BY id;
    `;

    return pool.query(query);
};

export const getProductByBarcode = async (
    barcode: string
) => {
    const query = `
        SELECT
            id,
            barcode,
            name,
            price
        FROM products
        WHERE barcode = $1;
    `;

    return pool.query(query, [barcode]);
};

export const findProductById = async (
    productIds: number[]
  ) => {
    const query = `
      SELECT
        id,
        barcode,
        name,
        price
      FROM products
      WHERE id = ANY($1);
    `;
  
    return pool.query(query, [productIds]);
};