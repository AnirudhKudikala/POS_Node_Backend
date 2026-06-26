import { z } from "zod";

export const createSaleSchema = z.object({
    customerEmail: z.email(),

    items: z
        .array(
            z.object({
                productId: z.number().int().positive(),
                quantity: z.number().int().positive(),
            })
        )
        .min(1),
});