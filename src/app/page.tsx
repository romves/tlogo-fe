import dynamic from "next/dynamic";

const Maps = dynamic(async () => await import("@/components/Maps"), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          Home
        </main>
    );
}
