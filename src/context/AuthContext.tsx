"use client";

import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { toast } from "sonner";

interface User {
    id: string;
    fullName: string;
    email: string;
    profilePictureUrl?: string;
    phoneNumber?: string;
    role: "USER" | "RENTER" | "ADMIN";
}

interface AuthContextType {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<User>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(async () => {
        try {
            await AuthService.logout();
        } catch {
            toast.error("Logout gagal. Silakan coba lagi.");
        } finally {
            setUser(null);
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userData = await AuthService.getMe();
                setUser(userData);
            } catch {
                setUser(null);
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, [logout]);

    const login = async (credentials: { email: string; password: string }) => {
        const loggedInUser = await AuthService.login(credentials);
        setUser(loggedInUser);
        return loggedInUser;
    };

    const value = { user, login, logout, isLoading };

    return (
        <AuthContext.Provider value={value}>
            {isLoading ? <FullScreenLoader /> : children}
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
