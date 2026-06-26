export interface ReceiptItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

export interface ReceiptData {
    invoiceNumber: string;
    customerEmail: string;
    totalAmount: number;
    items: ReceiptItem[];
}