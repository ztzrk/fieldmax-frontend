"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import {
    useUpdateVenue,
    useDeleteVenue,
    useApproveVenue,
    useRejectVenue,
} from "@/hooks/useVenues";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { VenueApiResponse } from "@/lib/schema/venue.schema";

const ActionsCell = ({ venue }: { venue: VenueApiResponse }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { mutate: deleteVenue } = useDeleteVenue();
    const { mutate: approveVenue } = useApproveVenue();
    const { mutate: rejectVenue } = useRejectVenue();

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
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/venues/${venue.id}/edit`}>
                            View & Edit Details
                        </Link>
                    </DropdownMenuItem>
                    {venue.status === "PENDING" && (
                        <>
                            <ConfirmationDialog
                                trigger={
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Approve
                                    </DropdownMenuItem>
                                }
                                title="Approve this venue?"
                                description="This venue will become public."
                                onConfirm={() => approveVenue(venue.id)}
                            />
                            <ConfirmationDialog
                                trigger={
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Reject
                                    </DropdownMenuItem>
                                }
                                title="Reject this venue?"
                                description="This venue will be marked as rejected."
                                onConfirm={() => rejectVenue(venue.id)}
                            />
                        </>
                    )}
                    <ConfirmationDialog
                        trigger={
                            <DropdownMenuItem
                                className="text-red-500"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete
                            </DropdownMenuItem>
                        }
                        title="Are you sure?"
                        description={`This will permanently delete the "${venue.name}" venue.`}
                        onConfirm={() => deleteVenue(venue.id)}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
};

export const columns: ColumnDef<VenueApiResponse>[] = [
    { id: "select" /* ... checkbox ... */ },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "renter.fullName", header: "Renter" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge
                    variant={
                        status === "APPROVED"
                            ? "default"
                            : status === "REJECTED"
                            ? "destructive"
                            : "secondary"
                    }
                >
                    {status}
                </Badge>
            );
        },
    },
    { id: "actions", cell: ({ row }) => <ActionsCell venue={row.original} /> },
];
