"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { IconCombobox } from "@/components/shared/IconComboBox";
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    iconName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SportTypeFormProps {
    initialData?: Partial<FormValues>;
    onSubmit: (values: FormValues) => Promise<void>;
}

export function SportTypeForm({ initialData, onSubmit }: SportTypeFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { name: "", iconName: "" },
    });

    const handleSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        await onSubmit(values);
        setIsSubmitting(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
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
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    );
}
