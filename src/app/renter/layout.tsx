"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { FullScreenLoader } from "@/components/FullScreenLoader";

export default function RenterLayout({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!user) {
            router.push("/login");
            return;
        }

        if (user.role !== "RENTER") {
            router.push("/"); // Atau ke halaman lain yang sesuai
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== "RENTER") {
        return <FullScreenLoader />;
    }

    return <>{children}</>;
}
