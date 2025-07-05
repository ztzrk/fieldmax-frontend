"use client";

import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
}

export function InputField({
    control,
    name,
    label,
    placeholder,
    type = "text",
}: InputFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                            value={field.value ?? ""}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
