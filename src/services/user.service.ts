import { api } from "@/lib/api";
import { usersApiResponseSchema } from "@/lib/schema/user.schema";
import { toast } from "sonner";

const UserService = {
    getAllUsers: async () => {
        try {
            const response = await api.get("/users");

            const validatedData = usersApiResponseSchema.parse(
                response.data.data
            );

            return validatedData;
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch users");
            throw error;
        }
    },
    createUser: async (userData: any) => {
        try {
            await api.post("/users", userData);
            toast.success("User created successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to create user");
            throw error;
        }
    },

    updateUser: async (userId: string, userData: any) => {
        try {
            await api.put(`/users/${userId}`, userData);
            toast.success("User updated successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to update user");
            throw error;
        }
    },

    deleteUser: async (userId: string) => {
        try {
            await api.delete(`/users/${userId}`);
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to delete user");
            throw error;
        }
    },
    deleteMultipleUsers: async (userIds: string[]) => {
        try {
            await api.post("/users/multiple", {
                ids: userIds,
            });
            toast.success("Users deleted successfully");
        } catch (error) {
            toast.error((error as Error).message || "Failed to delete users");
            throw error;
        }
    },
};

export default UserService;
