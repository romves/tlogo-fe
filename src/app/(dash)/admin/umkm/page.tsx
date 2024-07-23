import Pagination from "@/components/Pagination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TableSection from "@/module/umkm/section/table";
import { getAllUmkm } from "@/services/umkm.service";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        perPage?: string;
        page?: string;
    };
}) {
    const {data: umkms, meta} = await getAllUmkm(searchParams);

    return (
        <main className="container my-8 grid gap-4">
            <Link
                className={cn(buttonVariants(), "ml-auto")}
                href="/admin/umkm/tambah-umkm"
            >
                Tambah Data
            </Link>

            <div className="overflow-x-auto">
                <TableSection umkm={umkms} />
            </div>

            <Pagination meta={meta} />
        </main>
    );
}
