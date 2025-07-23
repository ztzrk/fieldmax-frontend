import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserApiResponse } from "@/lib/schema/user.schema";

export function useLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { login: setAuthUser } = useAuth();

    return useMutation({
        mutationFn: (credentials: any) => AuthService.login(credentials),
        onSuccess: (user: UserApiResponse) => {
            setAuthUser(user);

            toast.success("Login berhasil!", {
                description: `Selamat datang kembali, ${user.fullName}.`,
            });

            let targetDashboard = "/";
            if (user.role === "ADMIN") {
                targetDashboard = "/admin/dashboard";
            } else if (user.role === "RENTER") {
                targetDashboard = "/renter/dashboard";
            }

            router.push(targetDashboard);
        },
        onError: (error) => {
            toast.error("Login Gagal", {
                description: "Silakan periksa kembali email dan password Anda.",
            });
        },
    });
}
