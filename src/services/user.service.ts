import { api } from "@/lib/api";

const UserService = {
    getAllUsers: async () => {
        try {
            const response = await api.get("/users");
            return response.data.data;
        } catch (error) {
            console.error("API Get All Users Error:", error);
            throw error;
        }
    },
    createUser: async (userData: any) => {
        try {
            const response = await api.post("/users", userData);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId: string, userData: any) => {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (userId: string) => {
        try {
            const response = await api.delete(`/users/${userId}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
    deleteMultipleUsers: async (userIds: string[]) => {
        try {
            const response = await api.post("/users/bulk-delete", {
                ids: userIds,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default UserService;
