"use client";

import { columns } from "./components/columns";
import { DataTable } from "@/components/shared/DataTable";
import { useGetAllVenues } from "@/hooks/useVenues";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { CreateVenueButton } from "./components/CreateVenueButton";

export default function AdminVenuesPage() {
    const { data: venues, isLoading, isError } = useGetAllVenues();

    if (isLoading) return <FullScreenLoader />;
    if (isError) return <p className="text-red-500">Error loading data.</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Venues</h1>
                    <p className="text-muted-foreground">
                        Manage all venues in the system.
                    </p>
                </div>
                <CreateVenueButton />
            </div>
            <DataTable columns={columns} data={venues || []} />
        </div>
    );
}
