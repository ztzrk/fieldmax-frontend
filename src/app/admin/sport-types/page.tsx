"use client";

import { columns } from "./components/columns";
import { useGetAllSportTypes, useCreateSportType } from "@/hooks/useSportTypes";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SportTypeForm } from "./components/SportTypeForm";
import { useState } from "react";
import { DataTable } from "../users/components/data-table";

export default function AdminSportTypesPage() {
    const { data: sportTypes, isLoading, isError } = useGetAllSportTypes();
    const { mutate: createSportType } = useCreateSportType();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    if (isLoading) return <FullScreenLoader />;
    if (isError) return <p className="text-red-500">Error loading data.</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Sport Types</h1>
                    <p className="text-muted-foreground">
                        Manage available sport types.
                    </p>
                </div>
                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>Create Sport Type</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Sport Type</DialogTitle>
                        </DialogHeader>
                        <SportTypeForm
                            onSubmit={async (data) =>
                                createSportType(data, {
                                    onSuccess: () =>
                                        setIsCreateDialogOpen(false),
                                })
                            }
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={sportTypes || []} />
        </div>
    );
}
