import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const Maps = dynamic(async () => await import("@/components/Maps"), {
    ssr: false,
});

export default function Home() {
    redirect("/umkm");

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          Home
        </main>
    );
}
