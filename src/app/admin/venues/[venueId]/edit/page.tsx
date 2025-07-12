"use client";

import {
    useApproveVenue,
    useGetVenueById,
    useUpdateVenue,
} from "@/hooks/useVenues";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { VenueForm } from "../../components/VenueForm";
import { ImageUploader } from "@/components/shared/form/ImageUploader";
import { PhotoGallery } from "./components/PhotoGallery";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { RejectDialog } from "./components/RejectDialog";
import {
    AlertDialog,
    AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { AlertCircle } from "lucide-react";
import {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EditVenuePage() {
    const params = useParams();
    const venueId = Array.isArray(params.venueId)
        ? params.venueId[0]
        : params.venueId;

    const queryClient = useQueryClient();
    const { data: venue, isLoading: isLoadingVenue } = useGetVenueById(
        venueId as string
    );
    const { mutate: updateVenue, isPending: isPending } = useUpdateVenue();
    const { mutate: approveVenue } = useApproveVenue();

    const handleFormSubmit = (values: any) => {
        if (!venueId) return;
        updateVenue({ id: venueId, data: values });
    };

    const handleUploadComplete = () => {
        if (!venueId) return;
        queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
    };

    if (!venueId) {
        return <p>Venue ID not found.</p>;
    }

    if (isLoadingVenue) return <FullScreenLoader />;
    if (!venue) return <p>Venue not found.</p>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                        Edit Venue: {venue.name}
                    </h1>
                    <p className="text-muted-foreground">
                        Update venue details and photos.
                    </p>
                </div>
                {venue.status === "PENDING" && (
                    <div className="flex gap-2">
                        <ConfirmationDialog
                            trigger={<Button size="sm">Approve</Button>}
                            title="Approve this venue?"
                            description="This venue will become public and bookable."
                            onConfirm={() => approveVenue(venueId as string)}
                        />
                        <RejectDialog venueId={venueId as string} />
                    </div>
                )}
            </div>

            {venue.status === "REJECTED" && (
                <AlertDialog>
                    <AlertDialogContent>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDialogHeader>
                            <AlertDialogTitle>Venue Rejected</AlertDialogTitle>
                            <AlertDialogDescription>
                                Reason:{" "}
                                {venue.rejectionReason || "No reason provided."}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Venue Details
                        </h2>
                        <VenueForm
                            initialData={venue}
                            onSubmit={handleFormSubmit}
                            isPending={isPending}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Photo Gallery
                        </h2>
                        <PhotoGallery
                            photos={venue.photos || []}
                            venueId={venueId}
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        Add New Photos
                    </h2>
                    <ImageUploader
                        venueId={venueId}
                        onUploadComplete={handleUploadComplete}
                    />
                </div>
            </div>
        </div>
    );
}
