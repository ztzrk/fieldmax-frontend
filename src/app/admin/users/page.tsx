"use client";

import { columns } from "./components/columns";
import { DataTable } from "../../../components/shared/DataTable";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { CreateUserButton } from "./components/createUserButton";
import { useGetAllUsers } from "@/hooks/useUsers";

export default function AdminUsersPage() {
    const { data: users, isLoading, isError } = useGetAllUsers();

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-red-500">Failed to load users data.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Users</h1>
                    <p className="text-muted-foreground">
                        Total {users?.length || 0} users registered.
                    </p>
                </div>
                <CreateUserButton />
            </div>
            <DataTable columns={columns} data={users || []} />
        </div>
    );
}
