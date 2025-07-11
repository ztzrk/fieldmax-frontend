"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteVenuePhoto } from "@/hooks/useVenues";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";

type Photo = { id: string; url: string };

interface PhotoGalleryProps {
    photos: Photo[];
    venueId: string;
}

export function PhotoGallery({ photos, venueId }: PhotoGalleryProps) {
    const { mutate: deletePhoto } = useDeleteVenuePhoto(venueId);

    if (photos.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                No photos uploaded yet.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                    <Image
                        src={photo.url}
                        alt="Venue Photo"
                        width={200}
                        height={200}
                        className="rounded-md object-cover aspect-square"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ConfirmationDialog
                            trigger={
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            }
                            title="Delete this photo?"
                            description="This action cannot be undone."
                            onConfirm={() => deletePhoto(photo.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
