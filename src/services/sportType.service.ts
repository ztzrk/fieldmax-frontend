import { api } from "@/lib/api";
import { toast } from "sonner";

const SportTypeService = {
    getAll: async () => {
        try {
            const response = await api.get("/sport-types");
            return response.data.data;
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to fetch sport types"
            );
            throw error;
        }
    },
    create: async (data: { name: string; iconName?: string }) => {
        try {
            await api.post("/sport-types", data);
            toast.success("Sport type created successfully");
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to create sport type"
            );
            throw error;
        }
    },
    update: async (id: string, data: { name: string; iconName?: string }) => {
        try {
            await api.put(`/sport-types/${id}`, data);
            toast.success("Sport type updated successfully");
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to update sport type"
            );
            throw error;
        }
    },
    delete: async (id: string) => {
        try {
            await api.delete(`/sport-types/${id}`);
            toast.success("Sport type deleted successfully");
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to delete sport type"
            );
            throw error;
        }
    },
    deleteMultiple: async (ids: string[]) => {
        try {
            await api.post("/sport-types/multiple", { ids });
            toast.success("Sport types deleted successfully");
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to delete sport types"
            );
            throw error;
        }
    },
};

export default SportTypeService;
