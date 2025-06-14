"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Button onClick={logout} variant="outline">
                    Logout
                </Button>
            </div>
            <div className="mt-8">
                <p>
                    Welcome,{" "}
                    <span className="font-semibold">
                        {user?.fullName || "Admin"}
                    </span>
                    !
                </p>
                <p>
                    Your role is:{" "}
                    <span className="font-semibold">{user?.role}</span>
                </p>
            </div>
            {/* Di sini Anda akan menambahkan komponen lain seperti tabel data, statistik, dll. */}
        </div>
    );
}
