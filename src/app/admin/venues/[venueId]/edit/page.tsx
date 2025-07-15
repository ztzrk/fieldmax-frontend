"use client";

import {
    useGetVenueById,
    useUpdateVenue,
    useApproveVenue,
    useUploadVenuePhotos,
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CreateFieldButton } from "./components/CreateFieldButton";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./components/columns";

export default function EditVenuePage() {
    const params = useParams();
    const venueId = Array.isArray(params.venueId)
        ? params.venueId[0]
        : params.venueId;

    const queryClient = useQueryClient();

    const {
        data: venue,
        isLoading: isLoadingVenue,
        isError,
    } = useGetVenueById(venueId as string);
    const { mutate: updateVenue, isPending: isUpdating } = useUpdateVenue(
        venueId as string
    );
    const { mutate: approveVenue } = useApproveVenue(venueId as string);
    const { mutateAsync: uploadPhotos, isPending: isUploading } =
        useUploadVenuePhotos(venueId as string);

    if (isLoadingVenue) {
        return <FullScreenLoader />;
    }

    if (isError || !venue) {
        return (
            <div className="text-center text-red-500 py-10">
                Error: Venue not found or failed to load.
            </div>
        );
    }

    const handleFormSubmit = (values: any) => {
        updateVenue({ data: values });
    };

    const handleUpload = async (files: File[]) => {
        await uploadPhotos(files);
        queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
    };

    const photoCount = venue.photos?.length || 0;
    const isApprovable = photoCount >= 3;

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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span tabIndex={0}>
                                        <ConfirmationDialog
                                            trigger={
                                                <Button
                                                    size="sm"
                                                    disabled={!isApprovable}
                                                >
                                                    Approve
                                                </Button>
                                            }
                                            title="Approve this venue?"
                                            description="This venue will become public and bookable."
                                            onConfirm={() => approveVenue()}
                                        />
                                    </span>
                                </TooltipTrigger>
                                {!isApprovable && (
                                    <TooltipContent>
                                        <p>
                                            Requires at least 3 photos to
                                            approve.
                                        </p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                        <RejectDialog venueId={venueId as string} />
                    </div>
                )}
                {venue.status == "REJECTED" && (
                    <Dialog>
                        <DialogTrigger>
                            <Button>Reject Message</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reject Message</DialogTitle>
                                <DialogDescription>
                                    {venue.rejectionReason || "No Message"}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Venue Details
                        </h2>
                        <VenueForm
                            initialData={venue}
                            onSubmit={handleFormSubmit}
                            isPending={isUpdating}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Photo Gallery
                        </h2>
                        <PhotoGallery
                            photos={venue.photos || []}
                            venueId={venueId as string}
                        />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            Fields in this Venue
                        </h2>
                        <CreateFieldButton venueId={venueId as string} />
                    </div>
                    <DataTable columns={columns} data={venue.fields || []} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        Add New Photos
                    </h2>
                    <ImageUploader
                        isUploading={isUploading}
                        onUpload={handleUpload}
                    />
                </div>
            </div>
        </div>
    );
}
