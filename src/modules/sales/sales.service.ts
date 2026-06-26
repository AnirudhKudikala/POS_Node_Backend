import { pool } from "../../database/database";
import { generateInvoiceNumber } from "../../utils/invoice";
import * as productService from "../products/product.service";
import * as salesRepository from "./sales.repository";
import * as receiptService from "../receipts/receipt.service";
import * as emailService from "../emails/email.service";
import { CalculatedSaleItem, CreateSaleRequest, SaleResponse } from "./sales.types";

export const createSale = async (
    request: CreateSaleRequest,
): Promise<SaleResponse> => {
    const productIds = request.items.map((item) => item.productId);

    const products = await productService.findProductByIds(productIds);

    if (products.length !== productIds.length) {
        throw new Error("One or more products do not exist.");
    }

    const productMap = new Map(products.map(product => [product.id, product]));

    const calculatedItems: CalculatedSaleItem[] = request.items.map(item => {

        const product = productMap.get(item.productId);

        if (!product) {
            throw new Error(`Product ${item.productId} not found.`);
        }

        return {
            productId: product?.id,
            productName: product?.name,
            unitPrice: product?.price,
            quantity: item.quantity,
            lineTotal: product?.price * item.quantity,
        };
    });

    const totalAmount =  calculatedItems.reduce((total, item) => total + item.lineTotal, 0);

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const saleResult =
            await salesRepository.createSale(
                client,
                {
                    customerEmail:
                        request.customerEmail,
                    totalAmount,
                }
            );

        const saleId = saleResult.rows[0].id;

        const invoiceNumber =generateInvoiceNumber(saleId);

        await salesRepository.updateInvoiceNumber(
            client,
            saleId,
            invoiceNumber
        );

        for (const item of calculatedItems) {
            await salesRepository.createSaleItem(
                client,
                {
                    saleId,
                    item,
                }
            );
        }

        await client.query("COMMIT");

        const pdfBuffer =
            await receiptService.generateReceipt({
                invoiceNumber,
                customerEmail:
                    request.customerEmail,
                totalAmount,
                items: calculatedItems,
            });

        await emailService.sendEmail({
            to: request.customerEmail,
            subject: "Your Receipt",
            text: "Thank you for shopping with us.",
            attachment: {
                filename:
                    `${invoiceNumber}.pdf`,
                content: pdfBuffer,
            },
        });

        return {
            saleId,
            invoiceNumber,
            totalAmount,
        };

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};