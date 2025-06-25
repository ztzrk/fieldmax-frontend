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
    login: (credentials: any) => Promise<User>;
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
        } catch (error) {
            console.error("Logout failed on server:", error);
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
            } catch (error) {
                setUser(null);
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials: any) => {
        try {
            const loggedInUser = await AuthService.login(credentials);
            setUser(loggedInUser);
            return loggedInUser;
        } catch (error) {
            throw error;
        }
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
