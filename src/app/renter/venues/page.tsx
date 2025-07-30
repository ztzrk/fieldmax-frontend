"use client";

import { CreateVenueWizard } from "./components/CreateVenueWizard";

export default function RenterVenuesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">My Venues</h1>
                    <p className="text-muted-foreground">
                        Manage all your venues and their fields.
                    </p>
                </div>
                <CreateVenueWizard />
            </div>
            <p className="text-center text-muted-foreground pt-10">
                Your venues table will be displayed here.
            </p>
        </div>
    );
}
