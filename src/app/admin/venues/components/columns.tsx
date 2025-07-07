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
import { useUpdateVenue, useDeleteVenue } from "@/hooks/useVenues";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { VenueListItem } from "@/lib/schema/venue.schema";

const ActionsCell = ({ venue }: { venue: VenueListItem }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { mutate: deleteVenue } = useDeleteVenue();
    const { mutate: updateVenue, isPending } = useUpdateVenue();

    const handleDelete = async () => {
        deleteVenue(venue.id);
    };

    const handleEditSubmit = async (data: any) => {
        updateVenue(
            { id: venue.id, data },
            {
                onSuccess: () => {
                    setIsEditDialogOpen(false);
                },
            }
        );
    };

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
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(venue.id)}
                    >
                        Copy venue ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Edit Venue</DropdownMenuItem>
                    </DialogTrigger>
                    <ConfirmationDialog
                        trigger={
                            <DropdownMenuItem
                                className="text-red-500"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete Venue
                            </DropdownMenuItem>
                        }
                        title="Are you sure?"
                        description={`This will permanently delete the "${venue.name}" venue.`}
                        onConfirm={handleDelete}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Venue</DialogTitle>
                </DialogHeader>
                <VenueForm
                    initialData={venue}
                    onSubmit={handleEditSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export const columns: ColumnDef<VenueListItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "renter.fullName", header: "Renter (Owner)" },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return date.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell venue={row.original} />,
    },
];
