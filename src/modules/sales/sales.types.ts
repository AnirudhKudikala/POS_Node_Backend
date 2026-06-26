export interface CreateSaleRequest {
    customerEmail: string;
    items: SaleItemRequest[];
}

export interface SaleItemRequest {
    productId: number;
    quantity: number;
}

export interface SaleResponse {
    saleId: number;
    invoiceNumber: string;
    totalAmount: number;
}