import UmkmCard from "@/components/UmkmCard";
import { UMKM } from "@/module/umkm/types";
import { getAllUmkm } from "@/services/umkm.service";
import React from "react";

export default async function Page() {
    const umkms = (await getAllUmkm()) as UMKM[];

    console.log(umkms);

    return (
        <main className="w-[90%] mx-auto py-8">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4">
                {umkms.map((umkm) => (
                    <UmkmCard key={umkm.id} umkm={umkm} />
                ))}
            </section>
        </main>
    );
}
