import { buttonVariants } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import CreateUmkmForm from "@/module/umkm/form/create";
import TableSection from "@/module/umkm/section/table";
import { getAllUmkm } from "@/services/umkm.service";
import Link from "next/link";

export default async function Page() {
    const umkm = await getAllUmkm();

    return (
        <main className="w-[90%] mx-auto my-8 grid gap-4">
            <Link
                className={cn(buttonVariants(), "ml-auto")}
                href="/admin/umkm/tambah-umkm"
            >
                Tambah Data
            </Link>
            {/* <CreateForm /> */}

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
