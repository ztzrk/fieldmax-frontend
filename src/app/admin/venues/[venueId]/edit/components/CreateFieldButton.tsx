"use client";

import { useState } from "react";
import { useCreateField } from "@/hooks/useFields";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FieldForm } from "./FieldForm";

interface CreateFieldButtonProps {
    venueId: string;
}

export function CreateFieldButton({ venueId }: CreateFieldButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: createField, isPending } = useCreateField();

    const handleSubmit = (values: any) => {
        createField(
            { ...values, venueId },
            {
                onSuccess: () => {
                    setIsOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Field</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Field</DialogTitle>
                </DialogHeader>
                <FieldForm onSubmit={handleSubmit} isPending={isPending} />
            </DialogContent>
        </Dialog>
    );
}
