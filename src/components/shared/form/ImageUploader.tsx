"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploaderProps {
    onUploadComplete: (url: string) => void;
    initialImageUrl?: string | null;
}

export function ImageUploader({
    onUploadComplete,
    initialImageUrl,
}: ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        initialImageUrl || null
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post("/uploads/direct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const publicUrl = response.data.data.publicUrl;
            onUploadComplete(publicUrl);
            toast.success("Image uploaded successfully!");
            setPreviewUrl(publicUrl);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to upload image"
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Input
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
            />
            {previewUrl && (
                <div className="rounded-md overflow-hidden w-40 h-40 relative">
                    <Image
                        src={previewUrl}
                        alt="Image preview"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )}
            <Button
                type="button"
                onClick={handleUpload}
                disabled={!file || isUploading}
            >
                {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
        </div>
    );
}
