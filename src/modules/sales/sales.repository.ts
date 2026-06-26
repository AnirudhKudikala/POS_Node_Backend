import { PoolClient } from "pg";
import { CreateSaleItemRepositoryRequest, CreateSaleRepositoryRequest } from "./sales.types";

export const createSale = async (
    client: PoolClient,
    request: CreateSaleRepositoryRequest
) => {

    const query = `
        INSERT INTO sales
        (
            customer_email,
            total_amount
        )
        VALUES
        (
            $1,
            $2
        )
        RETURNING id;
    `;

    return client.query(query, [
        request?.customerEmail,
        request?.totalAmount,
    ]);
};

export const updateInvoiceNumber = async (
    client: PoolClient,
    saleId: number,
    invoiceNumber: string
) => {

    const query = `
        UPDATE sales
        SET invoice_number = $1
        WHERE id = $2;
    `;

    return client.query(query, [
        invoiceNumber,
        saleId,
    ]);
};

export const createSaleItem = async (
    client: PoolClient,
    request: CreateSaleItemRepositoryRequest
) => {

    const query = `
        INSERT INTO sale_items
        (
            sale_id,
            product_id,
            product_name,
            unit_price,
            quantity,
            line_total
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        );
    `;

    return client.query(query, 
        [
            request.saleId,
            request.item.productId,
            request.item.productName,
            request.item.unitPrice,
            request.item.quantity,
            request.item.lineTotal,
        ]
    );
};