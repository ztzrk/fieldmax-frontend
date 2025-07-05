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
import { useUpdateSportType, useDeleteSportType } from "@/hooks/useSportTypes";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Checkbox } from "@radix-ui/react-checkbox";
import { toast } from "sonner";

export type Venue = {
    id: string;
    name: string;
    address: string;
    renter: {
        fullName: string;
        email: string;
    };
    description?: string;
    mainPhotoUrl?: string;
    createdAt: string;
};

const ActionsCell = ({ venue }: { venue: Venue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: deleteVenue } = useDeleteSportType();
    const { mutate: updateVenue, isPending } = useUpdateSportType();

    const handleDelete = async () => {
        deleteVenue(venue.id);
    };

    const handleEditSubmit = async (data: any) => {
        updateVenue(
            { id: venue.id, data },
            {
                onSuccess: () => {
                    toast.success(`${venue.name} updated successfully`);
                    setIsOpen(false);
                },
                onError: (error) => {
                    toast.error(
                        `Failed to update ${venue.name} error: ${error.message}`
                    );
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <ConfirmationDialog
                        trigger={
                            <DropdownMenuItem
                                className="text-red-500"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete Sport Type
                            </DropdownMenuItem>
                        }
                        title="Are you sure?"
                        description={`This will permanently delete the "${venue.name}" venue.`}
                        action="Delete"
                        onConfirm={handleDelete}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Sport Type</DialogTitle>
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

export const columns: ColumnDef<Venue>[] = [
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
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
    {
        accessorKey: "mainPhotoUrl",
        header: "Main Photo",
        cell: ({ row }) => (
            <img
                src={row.original.mainPhotoUrl}
                alt={row.original.name}
                className="h-10 w-10 object-cover rounded"
            />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell venue={row.original} />,
    },
];
