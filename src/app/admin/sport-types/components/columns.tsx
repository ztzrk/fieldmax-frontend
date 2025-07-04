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
import { SportTypeForm } from "./SportTypeForm";
import { useUpdateSportType, useDeleteSportType } from "@/hooks/useSportTypes";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Checkbox } from "@radix-ui/react-checkbox";
import { toast } from "sonner";

export type SportType = {
    id: string;
    name: string;
    iconUrl?: string;
};

const ActionsCell = ({ sportType }: { sportType: SportType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: deleteSportType } = useDeleteSportType();
    const { mutate: updateSportType, isPending } = useUpdateSportType();

    const handleDelete = async () => {
        deleteSportType(sportType.id);
    };

    const handleEditSubmit = async (data: any) => {
        updateSportType(
            { id: sportType.id, data },
            {
                onSuccess: () => {
                    toast.success(`${sportType.name} updated successfully`);
                    setIsOpen(false);
                },
                onError: (error) => {
                    toast.error(
                        `Failed to update ${sportType.name} error: ${error.message}`
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
                        onClick={() =>
                            navigator.clipboard.writeText(sportType.id)
                        }
                    >
                        Copy sport type ID
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
                                Delete
                            </DropdownMenuItem>
                        }
                        title="Are you sure?"
                        description={`This will permanently delete the "${sportType.name}" sport type.`}
                        action="Delete"
                        onConfirm={handleDelete}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Sport Type</DialogTitle>
                </DialogHeader>
                <SportTypeForm
                    initialData={sportType}
                    onSubmit={handleEditSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export const columns: ColumnDef<SportType>[] = [
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
    { accessorKey: "iconUrl", header: "Icon URL" },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell sportType={row.original} />,
    },
];
