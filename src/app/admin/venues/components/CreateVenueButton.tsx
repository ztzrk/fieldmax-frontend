"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCreateVenue } from "@/hooks/useVenues";
import { VenueForm } from "./VenueForm";

export function CreateVenueButton() {
    const [isOpen, setIsOpen] = useState(false);

    const { mutate: createVenue, isPending } = useCreateVenue();

    const handleSubmit = async (data: any) => {
        createVenue(data, {
            onSuccess: () => {
                toast.success(`${data.name} created successfully`);
                setIsOpen(false);
            },
            onError: (error) => {
                toast.error(
                    `Failed to create ${data.name} error: ${error.message}`
                );
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Venue</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Venue</DialogTitle>
                </DialogHeader>
                <VenueForm onSubmit={handleSubmit} isPending={isPending} />
            </DialogContent>
        </Dialog>
    );
}
