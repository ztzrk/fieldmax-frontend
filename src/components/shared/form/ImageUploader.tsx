"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploaderProps {
    venueId: string;
    onUploadComplete: (photos: any) => void;
}

export function ImageUploader({
    venueId,
    onUploadComplete,
}: ImageUploaderProps) {
    const [files, setFiles] = useState<FileList | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
            const urls = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setPreviewUrls(urls);
        }
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) return;
        setIsUploading(true);

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("photos", file);
        });

        try {
            const response = await api.post(
                `/uploads/${venueId}/photos`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            onUploadComplete(response.data.data);
            toast.success(`${files.length} image(s) uploaded successfully!`);
            setFiles(null);
            setPreviewUrls([]);
        } catch (error) {
            toast.error("Image upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
            />
            <div className="flex flex-wrap gap-4">
                {previewUrls.map((url, index) => (
                    <div
                        key={index}
                        className="rounded-md overflow-hidden w-24 h-24 relative"
                    >
                        <Image
                            src={url}
                            alt="Image preview"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                ))}
            </div>
            <Button
                type="button"
                onClick={handleUpload}
                disabled={!files || isUploading}
            >
                {isUploading
                    ? `Uploading ${files?.length} files...`
                    : "Upload Images"}
            </Button>
        </div>
    );
}
