"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VenueFormValues, venueSchema } from "@/lib/schema/venue.schema";
import { useGetAllUsers } from "@/hooks/useUsers";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/shared/form/InputField";
import { SelectField } from "@/components/shared/form/SelectField";

interface VenueFormProps {
    initialData?: Partial<VenueFormValues>;
    onSubmit: (values: VenueFormValues) => void;
    isPending: boolean;
}

export function VenueForm({
    initialData,
    onSubmit,
    isPending,
}: VenueFormProps) {
    const { data: usersData } = useGetAllUsers();
    const renters = usersData?.filter((user) => user.role === "RENTER") || [];

    const form = useForm<VenueFormValues>({
        resolver: zodResolver(venueSchema),
        defaultValues: initialData || {
            name: "",
            address: "",
            renterId: "",
            description: "",
            mainPhotoUrl: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    control={form.control}
                    name="name"
                    label="Venue Name"
                    placeholder="Enter venue name"
                />
                <InputField
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter venue address"
                />
                <SelectField
                    control={form.control}
                    name="renterId"
                    label="Renter (Owner)"
                    options={renters.map((renter) => ({
                        value: renter.id,
                        label: renter.fullName,
                    }))}
                />
                <InputField
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Enter venue description"
                />
                <InputField
                    control={form.control}
                    name="mainPhotoUrl"
                    label="Main Photo URL"
                    placeholder="Enter main photo URL"
                />
                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    );
}
