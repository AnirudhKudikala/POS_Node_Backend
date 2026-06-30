import PDFDocument from "pdfkit";
import path from "path";
import { ReceiptData } from "./receipt.types";

export const generateReceipt = (data: ReceiptData): Promise<Buffer> => {
    return new Promise((resolve) => {
        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
        });

        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => {
            buffers.push(chunk);
        });

        doc.on("end", () => {
            resolve(Buffer.concat(buffers));
        });

        // const regularFont = path.join(
        //     __dirname,
        //     "../../fonts/NotoSans-Regular.ttf",
        // );

        // const boldFont = path.join(__dirname, "../../fonts/NotoSans-Bold.ttf");

        doc.font("Helvetica");

        //----------------------------------------------------------
        // Header
        //----------------------------------------------------------

        doc.font("Helvetica-Bold").fontSize(24).text("CloudPOS", {
            align: "center",
        });

        doc.moveDown();

        drawDivider(doc);

        doc.moveDown();

        doc.font("Helvetica").fontSize(12);

        doc.text(`Invoice : ${data.invoiceNumber}`);

        doc.moveDown(0.3);

        doc.text(`Customer : ${data.customerEmail}`);

        doc.moveDown(0.3);

        doc.text(
            `Date : ${new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })}`,
        );

        doc.moveDown();

        drawDivider(doc);

        doc.moveDown();

        //----------------------------------------------------------
        // Table Header
        //----------------------------------------------------------

        const productX = 40;
        const qtyX = 320;
        const totalX = 430;

        doc.font("Helvetica-Bold");

        doc.text("Product", productX);

        doc.text("Qty", qtyX, doc.y - 15);

        doc.text("Total", totalX, doc.y - 15);

        doc.moveDown();

        //----------------------------------------------------------
        // Items
        //----------------------------------------------------------

        doc.font("Helvetica");

        data.items.forEach((item) => {
            const y = doc.y;

            doc.text(item.productName, productX, y, {
                width: 250,
            });

            doc.text(String(item.quantity), qtyX, y);

            doc.text(`INR ${item.lineTotal}`, totalX, y);

            doc.moveDown();
        });

        doc.moveDown();

        drawDivider(doc);

        doc.moveDown();

        //----------------------------------------------------------
        // Grand Total
        //----------------------------------------------------------

        doc.font("Helvetica-Bold");

        doc.text(`Grand Total`, productX);

        doc.text(`INR ${data.totalAmount}`, totalX, doc.y - 15);

        doc.moveDown(2);

        drawDivider(doc);

        doc.moveDown();

        //----------------------------------------------------------
        // Footer
        //----------------------------------------------------------

        doc.fontSize(14).font("Helvetica-Bold").text("Thank you for shopping!", {
            align: "center",
        });

        doc.moveDown(0.5);

        doc.fontSize(12).font("Helvetica").text("Visit Again", {
            align: "center",
        });

        doc.moveDown();

        drawDivider(doc);

        doc.end();
    });
};

function drawDivider(doc: PDFKit.PDFDocument) {
    doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor("#999").stroke();

    doc.moveDown();
}
