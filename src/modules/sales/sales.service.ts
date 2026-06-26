import { CreateSaleRequest } from "./sales.types";

export const createSale = async (
    request: CreateSaleRequest
) => {

    return {
        saleId: 1,
        invoiceNumber: "",
        totalAmount: 0,
    };
};