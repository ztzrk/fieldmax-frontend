import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
    const router = useRouter();
    const { login: setAuthUser } = useAuth();

    return useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            AuthService.login(credentials),
        onSuccess: (user) => {
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
        onError: () => {
            toast.error("Login Gagal", {
                description: "Silakan periksa kembali email dan password Anda.",
            });
        },
    });
}
