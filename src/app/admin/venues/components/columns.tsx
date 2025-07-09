"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { VenueForm } from "./VenueForm";
import {
    useUpdateVenue,
    useDeleteVenue,
    useApproveVenue,
    useRejectVenue,
} from "@/hooks/useVenues";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { VenueListItem } from "@/lib/schema/venue.schema";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const VerificationCell = ({ venue }: { venue: VenueListItem }) => {
    const { mutate: approveVenue } = useApproveVenue();
    const { mutate: rejectVenue } = useRejectVenue();

    if (venue.status === "APPROVED") {
        return <Badge variant="default">Approved</Badge>;
    }
    if (venue.status === "REJECTED") {
        return <Badge variant="destructive">Rejected</Badge>;
    }

    return (
        <div className="flex gap-2">
            <ConfirmationDialog
                trigger={
                    <Button variant="outline" size="sm">
                        Approve
                    </Button>
                }
                title="Approve this venue?"
                description="This venue will become public and bookable."
                onConfirm={() => approveVenue(venue.id)}
            />
            <ConfirmationDialog
                trigger={
                    <Button variant="destructive" size="sm">
                        Reject
                    </Button>
                }
                title="Reject this venue?"
                description="This venue will be marked as rejected."
                onConfirm={() => rejectVenue(venue.id)}
            />
        </div>
    );
};

const ActionsCell = ({ venue }: { venue: VenueListItem }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { mutate: deleteVenue } = useDeleteVenue();
    const { mutate: updateVenue, isPending } = useUpdateVenue();

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <ConfirmationDialog
                        trigger={
                            <DropdownMenuItem
                                className="text-red-500"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete
                            </DropdownMenuItem>
                        }
                        title="Are you absolutely sure?"
                        description={`This will permanently delete the "${venue.name}" venue.`}
                        onConfirm={() => deleteVenue(venue.id)}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Venue</DialogTitle>
                </DialogHeader>
                <VenueForm
                    initialData={venue}
                    onSubmit={async (data) =>
                        updateVenue(
                            { id: venue.id, data },
                            { onSuccess: () => setIsEditDialogOpen(false) }
                        )
                    }
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export const columns: ColumnDef<VenueListItem>[] = [
    // Kolom "select"
    { id: "select" /* ... */ },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "renter.fullName", header: "Renter" },
    {
        id: "verification",
        header: "Verification Status",
        cell: ({ row }) => <VerificationCell venue={row.original} />,
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell venue={row.original} />,
    },
];
