import { Product } from "./product.types";
import * as productQueries from "./product.repository";

export const getProducts = async (): Promise<Product[]> => {
    const result = await productQueries.getProducts();

    return result.rows;
};

export const getProductByBarcode = async (
    barcode: string,
): Promise<Product | null> => {
    const result = await productQueries.getProductByBarcode(barcode);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};
