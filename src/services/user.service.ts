import { api } from "@/lib/api";
import { usersApiResponseSchema } from "@/lib/schema/user.schema";

const UserService = {
    getAllUsers: async () => {
        try {
            const response = await api.get("/users");

            const validatedData = usersApiResponseSchema.parse(
                response.data.data
            );

            return validatedData;
        } catch (error) {
            console.error(
                "API Get All Users Error or Validation Failed:",
                error
            );
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
            const response = await api.post("/users/multiple", {
                ids: userIds,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default UserService;
