"use client";

import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    disabled?: boolean;
    required?: boolean;
    isFullWidth?: boolean;
}

export function SelectField({
    control,
    name,
    label,
    placeholder,
    options,
    disabled,
    required,
    isFullWidth = true,
}: SelectFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        required={required}
                        disabled={disabled}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger
                                className={`${isFullWidth ? "w-full" : ""}`}
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
