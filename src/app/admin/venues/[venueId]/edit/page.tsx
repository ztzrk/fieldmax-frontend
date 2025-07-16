"use client";

import {
    useGetVenueById,
    useUpdateVenue,
    useUploadVenuePhotos,
} from "@/hooks/useVenues";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { VenueForm } from "../../components/VenueForm";
import { ImageUploader } from "@/components/shared/form/ImageUploader";
import { PhotoGallery } from "./components/PhotoGallery";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { CreateFieldButton } from "./components/CreateFieldButton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { VenueActions } from "./components/VenueActions";
import { PageHeader } from "@/app/admin/components/PageHeader";
import { columns } from "./components/columns";

export default function EditVenuePage() {
    const params = useParams();
    const venueId = Array.isArray(params.venueId)
        ? params.venueId[0]
        : params.venueId || "";

    const {
        data: venue,
        isLoading,
        isError,
        refetch,
    } = useGetVenueById(venueId as string);
    const { mutate: updateVenue, isPending: isUpdating } = useUpdateVenue(
        venueId as string
    );
    const { mutateAsync: uploadPhotos, isPending: isUploading } =
        useUploadVenuePhotos(venueId as string);

    const handleFormSubmit = (values: any) => {
        updateVenue({ data: values });
    };

    const handleUploadComplete = async () => {
        await refetch();
    };

    if (isLoading) return <FullScreenLoader />;
    if (isError || !venue)
        return (
            <p className="text-center text-red-500 py-10">
                Error: Venue not found.
            </p>
        );

    return (
        <div className="space-y-8">
            <PageHeader
                title={venue.name}
                description="Update venue details, photos, and fields."
                backHref="/admin/venues"
            >
                <VenueActions venue={venue} />
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Venue Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <VenueForm
                                initialData={venue}
                                onSubmit={handleFormSubmit}
                                isPending={isUpdating}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Photo Gallery</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PhotoGallery
                                photos={venue.photos || []}
                                venueId={venueId!}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Photos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUploader
                                onUpload={handleUploadComplete}
                                isUploading={isUploading}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Fields in this Venue</CardTitle>
                            <CardDescription>
                                Manage all fields for {venue.name}
                            </CardDescription>
                        </div>
                        <CreateFieldButton venueId={venueId!} />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={venue.fields || []} />
                </CardContent>
            </Card>
        </div>
    );
}
