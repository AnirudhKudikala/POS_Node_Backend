import PDFDocument from "pdfkit";

import { ReceiptData } from "./receipt.types";

export const generateReceipt = (data: ReceiptData): Promise<Buffer> => {
    return new Promise((resolve) => {
        const doc = new PDFDocument();

        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => {
            buffers.push(chunk);
        });

        doc.on("end", () => {
            resolve(Buffer.concat(buffers));
        });

        doc.fontSize(24);

        doc.text("CloudPOS");

        doc.moveDown();

        doc.fontSize(14);

        doc.text(`Invoice : ${data.invoiceNumber}`);

        doc.moveDown();

        data.items.forEach((item) => {
            doc.text(`${item.productName}`);

            doc.text(`${item.quantity} × ${item.unitPrice} INR`);

            doc.text(`${item.lineTotal} INR`);

            doc.moveDown();
        });

        doc.fontSize(18);

        doc.text(`Grand Total : ${data.totalAmount} INR`);

        doc.moveDown();

        doc.text("Thank you for shopping!");

        doc.end();
    });
};
