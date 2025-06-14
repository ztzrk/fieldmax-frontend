"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, token, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!user || !token) {
            router.push("/login");
            return;
        }

        if (user.role !== "ADMIN") {
            router.push("/");
        }
    }, [user, token, isLoading, router]);
    return <>{isLoading && { children }}</>;
}

export default AdminLayout;
