
import UmkmCard from "@/components/UmkmCard";
import { UMKM } from "@/module/umkm/types";
import { getAllUmkm } from "@/services/umkm.service";
import React from "react";

export default async function Page() {
    const umkms = (await getAllUmkm()) as UMKM[];
    return (
        <main className="w-[90%] mx-auto py-8">
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
                {umkms.map((umkm) => (
                    <UmkmCard key={umkm.id} umkm={umkm} />
                ))}
            </section>
        </main>
    );
}
