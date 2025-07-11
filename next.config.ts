import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pnlbhqoechjyultecaft.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
};

export default nextConfig;
