import { api } from "@/lib/api";
import { toast } from "sonner";

const fieldService = {
    getAll: async () => {
        try {
            const response = await api.get("/api/fields");
            return response.data.data;
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch fields");
        }
    },
    getById: async (id: string) => {
        try {
            const response = await api.get(`/api/fields/${id}`);
            return response.data.data;
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch field");
        }
    },
    create: async (data: any) => {
        try {
            await api.post("/api/fields", data);
            toast.success("Field created successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to create field");
        }
    },

    update: async (id: string, data: any) => {
        try {
            await api.put(`/api/fields/${id}`, data);
            toast.success("Field updated successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to update field");
        }
    },
    delete: async (id: string) => {
        try {
            await api.delete(`/api/fields/${id}`);
            toast.success("Field deleted successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to delete field");
        }
    },
    deleteMultiple: async (ids: string[]) => {
        try {
            await api.post("/api/fields/multiple", { ids });
            toast.success("Fields deleted successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to delete fields");
        }
    },
};

export default fieldService;
