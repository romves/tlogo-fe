/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "via.placeholder.com",
            },
            {
                hostname: "drive.google.com",
            },
            {
                hostname: "tezldhnoobzflypxvpuo.supabase.co",
            },
        ],
    },
};

export default nextConfig;
