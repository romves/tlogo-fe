import UmkmCard from "@/components/UmkmCard";
import { UMKM } from "@/module/umkm/types";
import { getAllUmkm } from "@/services/umkm.service";
import React from "react";

export default async function Page() {
    const umkms = await getAllUmkm()
    return (
        <main className="w-[90%] mx-auto py-8">
            {umkms.length == 0 ? (
                <div className="text-center text-neutral-400 font-medium">
                    No UMKM data available.
                </div>
            ) : (
                umkms.map((umkm) => (
                    <section
                        key={umkm.id}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4"
                    >
                        <UmkmCard umkm={umkm} />
                    </section>
                ))
            )}
        </main>
    );
}
