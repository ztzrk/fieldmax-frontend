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
import { UserForm } from "./userForm";
import UserService from "@/services/user.service";
import { toast } from "sonner";
import { useCreateUser } from "@/hooks/useUsers";

export function CreateUserButton() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const { mutate: createUser, isPending } = useCreateUser();

    const handleSubmit = async (values: any) => {
        createUser(values, {
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <UserForm onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    );
}
