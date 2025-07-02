import { api } from "@/lib/api";

const SportTypeService = {
    getAll: async () => {
        const response = await api.get("/sport-types");
        return response.data.data;
    },
    create: async (data: { name: string; iconName?: string }) => {
        const response = await api.post("/sport-types", data);
        return response.data.data;
    },
    update: async (id: string, data: { name: string; iconName?: string }) => {
        const response = await api.put(`/sport-types/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/sport-types/${id}`);
        return response.data.data;
    },
};

export default SportTypeService;
