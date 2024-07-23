import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./styles/globals.css";


const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Desa Tlogo, Kabupaten Blitar",
    description: "Website Lapak UMKM dan Peta Digital Desa Tlogo, Kabupaten Blitar",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={plusJakartaSans.className}>
                <Providers>{children}</Providers>
                <Toaster position="top-center"/>
            </body>
        </html>
    );
}
