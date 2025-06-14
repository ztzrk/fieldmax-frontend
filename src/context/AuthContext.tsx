"use client";

import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
    id: string;
    fullName: string;
    email: string;
    role: "USER" | "RENTER" | "ADMIN";
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        delete api.defaults.headers.common["Authorization"];
        router.push("/login");
    }, [router]);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                setToken(storedToken);
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${storedToken}`;
                try {
                    const response = await api.get("/auth/me");
                    setUser(response.data.data);
                } catch (error) {
                    logout();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, [logout]);

    const login = async (credentials: any) => {
        try {
            const response = await api.post("/auth/login", credentials);
            const { tokenData, user } = response.data.data;

            setToken(tokenData.token);
            setUser(user);

            localStorage.setItem("authToken", tokenData.token);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${tokenData.token}`;

            if (user.role === "ADMIN") {
                toast.success("Login Success");
            } else {
                router.push("/login");
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Login failed"
            );
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
