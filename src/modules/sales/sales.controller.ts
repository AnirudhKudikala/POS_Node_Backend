import { Request, Response } from "express";
import * as salesService from "./sales.service";
import { createSaleSchema } from "./sales.validation";

export const createSale = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const request = createSaleSchema.parse(req.body);

        const response = await salesService.createSale(request);

        res.status(201).json({
            success: true,
            data: response,
        });
    } catch (error: any) {
        console.error("error", error);
        if (error?.flatten()?.fieldErrors?.customerEmail[0] === "Invalid email address") {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }

        res.status(500).json({
            success: false,
            message: "Failed to create sale",
        });
    }
};