"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VenueFormValues, venueSchema } from "@/lib/schema/venue.schema";
import { useGetAllUsers } from "@/hooks/useUsers";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/shared/form/InputField";
import { SelectField } from "@/components/shared/form/SelectField";
import { ImageUploader } from "@/components/shared/form/ImageUploader";

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
    const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsers();
    const renters = usersData?.filter((user) => user.role === "RENTER") || [];

    const renterOptions = renters.map((renter) => ({
        value: renter.id,
        label: renter.fullName,
    }));

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
                />
                <InputField
                    control={form.control}
                    name="description"
                    label="Description"
                />
                <InputField
                    control={form.control}
                    name="address"
                    label="Address"
                />
                <SelectField
                    control={form.control}
                    name="renterId"
                    label="Renter (Owner)"
                    placeholder="Select a renter"
                    options={renterOptions}
                />
                <FormField
                    control={form.control}
                    name="mainPhotoUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Main Photo</FormLabel>
                            <FormControl>
                                <ImageUploader
                                    initialImageUrl={field.value}
                                    onUploadComplete={(url) =>
                                        field.onChange(url)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    );
}
