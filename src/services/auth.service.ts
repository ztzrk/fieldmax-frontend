import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { toast } from "sonner";

const AuthService = {
    login: async (credentials: any) => {
        try {
            const response = await api.post("/auth/login", credentials);
            toast.success("Login successful");
            return response.data.data.user;
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to login, please try again"
            );
            throw error;
        }
    },

    getMe: async () => {
        try {
            const response = await api.get("/auth/me");
            return response.data.data;
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to fetch user data"
            );
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await api.post("/auth/logout");
            toast.success("Logout successful");
            return response.data;
        } catch (error) {
            toast.error(
                (error as Error).message || "Failed to logout, please try again"
            );
            throw error;
        }
    },
};

export default AuthService;
