export interface CreateSaleRequest {
    customerEmail: string;
    items: SaleItemRequest[];
}

export interface CalculatedSaleItem {
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
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

export interface CreateSaleRepositoryRequest {
    customerEmail: string;
    totalAmount: number;
}

export interface CreateSaleItemRepositoryRequest {
    saleId: number;
    item: CalculatedSaleItem;
}