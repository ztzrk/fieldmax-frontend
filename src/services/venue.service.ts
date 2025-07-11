import { api } from "@/lib/api";
import { venuesListApiResponseSchema } from "@/lib/schema/venue.schema";

const VenueService = {
    getAll: async () => {
        try {
            const response = await api.get("/venues");
            const validatedData = venuesListApiResponseSchema.parse(
                response.data.data
            );
            return validatedData;
        } catch (error) {
            console.error(
                "API Get All Venues Error or Validation Failed:",
                error
            );
            throw error;
        }
    },
    getById: async (id: string) => {
        const response = await api.get(`/venues/${id}`);
        return response.data.data;
    },
    create: async (data: any) => {
        const response = await api.post("/venues", data);
        return response.data.data;
    },
    update: async (id: string, data: any) => {
        const response = await api.put(`/venues/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/venues/${id}`);
        return response.data.data;
    },
    deleteMultiple: async (ids: string[]) => {
        const response = await api.post("/venues/multiple", { ids });
        return response.data.data;
    },
    approve: async (id: string) => {
        const response = await api.patch(`/venues/${id}/approve`);
        return response.data.data;
    },
    reject: async (id: string) => {
        const response = await api.patch(`/venues/${id}/reject`);
        return response.data.data;
    },
    deletePhoto: async (photoId: string) => {
        const response = await api.delete(`/venues/photos/${photoId}`);
        return response.data;
    },
};

export default VenueService;
