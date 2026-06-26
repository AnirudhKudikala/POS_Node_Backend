import * as productService from "../products/product.service";
import { CreateSaleRequest, SaleResponse } from "./sales.types";

export const createSale = async (
    request: CreateSaleRequest,
): Promise<SaleResponse> => {
    try{
        const productIds = request.items.map((item) => item.productId);

        const products = await productService.findProductByIds(productIds);

        if (products.length !== productIds.length) {
            throw new Error("One or more products do not exist.");
        }

        console.log(products);

        return {
            saleId: 1,
            invoiceNumber: "",
            totalAmount: 0,
        };
    } catch (error) {
        console.error(error);
        return {
            saleId: 1,
            invoiceNumber: "",
            totalAmount: 0,
        };
    }
};