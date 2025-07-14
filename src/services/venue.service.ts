import { api } from "@/lib/api";
import { venuesListApiResponseSchema } from "@/lib/schema/venue.schema";
import { toast } from "sonner";

const VenueService = {
    getAll: async () => {
        try {
            const response = await api.get("/venues");
            const validatedData = venuesListApiResponseSchema.parse(
                response.data.data
            );
            return validatedData;
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch venues");
            throw error;
        }
    },

    getById: async (id: string) => {
        try {
            const response = await api.get(`/venues/${id}`);
            return response.data.data;
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch venue");
            throw error;
        }
    },

    create: async (data: any) => {
        try {
            await api.post("/venues", data);
            toast.success("Venue created successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to create venue");
            throw error;
        }
    },

    update: async (id: string, data: any) => {
        try {
            await api.put(`/venues/${id}`, data);
            toast.success("Venue updated successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to update venue");
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            await api.delete(`/venues/${id}`);
            toast.success("Venue deleted successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to delete venue");
            throw error;
        }
    },

    deleteMultiple: async (ids: string[]) => {
        try {
            await api.post("/venues/multiple", {
                ids: ids,
            });
            toast.success("Venues deleted successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to delete venues");
            throw error;
        }
    },

    approve: async (id: string) => {
        try {
            await api.patch(`/venues/${id}/approve`);
            toast.success("Venue approved successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to approve venue");
            throw error;
        }
    },

    reject: async (id: string, data: { rejectionReason: string }) => {
        try {
            await api.patch(`/venues/${id}/reject`, data);
            toast.success("Venue rejected successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to reject venue");
            throw error;
        }
    },

    deletePhoto: async (photoId: string) => {
        try {
            await api.delete(`/venues/photos/${photoId}`);
            toast.success("Venue photo deleted successfully");
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to delete venue photo"
            );
            throw error;
        }
    },
};

export default VenueService;
