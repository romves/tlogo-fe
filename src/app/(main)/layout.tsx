import "@/app/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
