import { LayoutDashboard, Building, FileText } from "lucide-react";

export type NavItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

export const renterNavItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/renter/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Venues",
        href: "/renter/venues",
        icon: Building,
    },
    {
        label: "Bookings",
        href: "/renter/bookings",
        icon: FileText,
    },
];
