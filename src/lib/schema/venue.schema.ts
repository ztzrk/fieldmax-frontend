import { z } from "zod";

export const venueSchema = z.object({
    name: z.string().min(1, { message: "Venue name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    renterId: z.string().uuid({ message: "You must select a renter." }),
    description: z.string().optional(),
    mainPhotoUrl: z
        .string()
        .url({ message: "Must be a valid URL." })
        .optional()
        .or(z.literal(""))
        .nullable(),
});

export type VenueFormValues = z.infer<typeof venueSchema>;

export const venueListItemSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    address: z.string(),
    renter: z.object({
        fullName: z.string(),
        email: z.string().email(),
    }),
    description: z.string().optional(),
    mainPhotoUrl: z.string().url().optional().nullable(),
    createdAt: z.string(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export const venuesListApiResponseSchema = z.array(venueListItemSchema);

export type VenueListItem = z.infer<typeof venueListItemSchema>;
