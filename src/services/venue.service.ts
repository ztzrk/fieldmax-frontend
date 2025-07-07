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
};

export default VenueService;
