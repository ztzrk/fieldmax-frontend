import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import VenueService from "@/services/venue.service";
import { toast } from "sonner";

export function useGetAllVenues() {
    return useQuery({
        queryKey: ["venues"],
        queryFn: VenueService.getAll,
    });
}

export function useCreateVenue() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => VenueService.create(data),
        onSuccess: () => {
            toast.success("Venue created successfully!");
            queryClient.invalidateQueries({ queryKey: ["venues"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create venue.");
        },
    });
}

export function useUpdateVenue() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            VenueService.update(id, data),
        onSuccess: () => {
            toast.success("Venue updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["venues"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update venue.");
        },
    });
}

export function useDeleteVenue() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => VenueService.delete(id),
        onSuccess: () => {
            toast.success("Venue deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["venues"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete venue.");
        },
    });
}
