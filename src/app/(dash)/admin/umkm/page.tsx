import { buttonVariants } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import TableSection from "@/module/umkm/section/table";
import { getAllUmkm } from "@/services/umkm.service";
import Link from "next/link";

export const dynamic = "force-dynamic"

export default async function Page() {
    const umkm = await getAllUmkm();

    return (
        <main className="container my-8 grid gap-4">
            <Link
                className={cn(buttonVariants(), "ml-auto")}
                href="/admin/umkm/tambah-umkm"
            >
                Tambah Data
            </Link>

            <div className="overflow-x-auto">
                <TableSection umkm={umkm} />
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}
