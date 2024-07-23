import Pagination from "@/components/Pagination";
import UmkmCard from "@/components/UmkmCard";
import { getAllUmkm } from "@/services/umkm.service";

export const dynamic = "force-dynamic";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        perPage?: string;
        page?: string;
    };
}) {
    const { data: umkms, meta } = await getAllUmkm(searchParams);
    return (
        <main className="container py-8">
            {umkms.length == 0 ? (
                <div className="text-center text-neutral-400 font-medium">
                    No UMKM data available.
                </div>
            ) : (
                <div className="space-y-4">
                    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
                        {umkms.map((umkm) => (
                            <UmkmCard key={umkm.id} umkm={umkm} />
                        ))}
                    </section>

                  <Pagination meta={meta} />
                </div>
            )}
        </main>
    );
}

