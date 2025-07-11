"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { VenueForm } from "./VenueForm";
import { useCreateVenue } from "@/hooks/useVenues";

export function CreateVenueButton() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { mutate: createVenue, isPending } = useCreateVenue();

    const handleSubmit = (values: any) => {
        createVenue(values, {
            onSuccess: (newVenue) => {
                setIsOpen(false);
                router.push(`/admin/venues/${newVenue.id}/edit`);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Venue</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Venue</DialogTitle>
                </DialogHeader>
                <VenueForm onSubmit={handleSubmit} isPending={isPending} />
            </DialogContent>
        </Dialog>
    );
}
