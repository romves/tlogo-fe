import UmkmCard from "@/components/UmkmCard";
import { UMKM } from "@/module/umkm/types";
import { getAllUmkm } from "@/services/umkm.service";
import React from "react";

export const dynamic = 'force-dynamic'

export default async function Page() {
    const umkms = await getAllUmkm();
    return (
        <main className="container py-8">
            {umkms.length == 0 ? (
                <div className="text-center text-neutral-400 font-medium">
                    No UMKM data available.
                </div>
            ) : (
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
                    {umkms.map((umkm) => (
                        <UmkmCard key={umkm.id} umkm={umkm} />
                    ))}
                </section>
            )}
        </main>
    );
}
