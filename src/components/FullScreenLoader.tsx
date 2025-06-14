"use client";

import { LoaderCircle } from "lucide-react";

export function FullScreenLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
}
