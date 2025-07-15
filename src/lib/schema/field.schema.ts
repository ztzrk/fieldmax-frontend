import { z } from "zod";

export const fieldApiResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    pricePerHour: z.number().min(0),
    sportType: z.object({
        name: z.string(),
    }),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    venue: z.object({
        name: z.string(),
    }),
});

export const fieldsListApiResponseSchema = z.array(fieldApiResponseSchema);

export type FieldApiResponse = z.infer<typeof fieldApiResponseSchema>;
