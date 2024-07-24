import "@/app/styles/globals.css";
import DashboardNavbar from "@/components/DashboardNavbar";
import type { Metadata } from "next";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
            <DashboardNavbar />
            {children}
        </>
    );
}
