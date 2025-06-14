import { api } from "@/lib/api";
import { AxiosError } from "axios";

const AuthService = {
    login: async (credentials: any) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data.data.user;
        } catch (error) {
            console.error("API Login Error:", error);
            throw error;
        }
    },

    getMe: async () => {
        try {
            const response = await api.get("/auth/me");
            return response.data.data;
        } catch (error) {
            throw new AxiosError("Failed to fetch user data");
        }
    },

    logout: async () => {
        try {
            const response = await api.post("/auth/logout");
            return response.data;
        } catch (error) {
            console.error("API Logout Error:", error);
            throw error;
        }
    },
};

export default AuthService;
