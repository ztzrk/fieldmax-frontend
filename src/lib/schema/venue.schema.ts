import { z } from "zod";

export const venueSchema = z.object({
    name: z.string().min(1, { message: "Nama venue tidak boleh kosong." }),
    address: z.string().min(1, { message: "Alamat tidak boleh kosong." }),
    renterId: z
        .string()
        .uuid({ message: "Anda harus memilih seorang renter." }),
    description: z.string().optional(),
});

export type VenueFormValues = z.infer<typeof venueSchema>;

const venuePhotoSchema = z.object({
    id: z.string().uuid(),
    url: z.string().url(),
    isFeatured: z.boolean(),
});

export const venueApiResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    address: z.string(),
    description: z.string().nullable(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    createdAt: z.string().datetime(),
    renter: z.object({
        fullName: z.string(),
        email: z.string().email(),
    }),
    photos: z.array(venuePhotoSchema).optional(),
    _count: z
        .object({
            fields: z.number().int(),
        })
        .optional(),
});

export const venuesListApiResponseSchema = z.array(venueApiResponseSchema);

export type VenueApiResponse = z.infer<typeof venueApiResponseSchema>;
