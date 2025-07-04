"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    SportTypeFormValues,
    sportTypeSchema,
} from "@/lib/schema/sport-types.schema";
import { IconCombobox } from "@/components/shared/IconComboBox";
import { on } from "events";

interface SportTypeFormProps {
    initialData?: Partial<SportTypeFormValues>;
    onSubmit: (values: SportTypeFormValues) => void;
    isPending: boolean;
}

export function SportTypeForm({
    initialData,
    onSubmit,
    isPending,
}: SportTypeFormProps) {
    const form = useForm<SportTypeFormValues>({
        resolver: zodResolver(sportTypeSchema),
        defaultValues: initialData || { name: "", iconName: "" },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Futsal" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="iconName"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                                <IconCombobox
                                    value={field.value}
                                    onChange={field.onChange}
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
