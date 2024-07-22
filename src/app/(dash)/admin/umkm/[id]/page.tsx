import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getUmkmById } from "@/services/umkm.service";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const umkm = await getUmkmById(params.id);

    if (!umkm) {
        redirect("/admin/umkm");
    }

    return (
        <main className="container py-4 space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbLink href="/admin/umkm">Dashboard UMKM</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>{umkm.nama}</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid xl:grid-cols-2 gap-4">
                <Link href={`/admin/umkm/${params.id}/edit`} className={cn(buttonVariants(), 'ml-auto w-fit')} >Ubah Data UMKM</Link>

                <section className="grid md:grid-cols-2 gap-2 md:gap-4">
                    <div className="p-4 border rounded-xl flex flex-col gap-2 h-fit overflow-x-hidden">
                        <h2 className="font-bold text-xl">Informasi UMKM</h2>
                        <hr />

                        <div className="flex mb-4 gap-2 overflow-x-auto">
                            {umkm.foto.map((foto, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="relative h-40 aspect-square"
                                    >
                                        <Image
                                            src={foto.url_foto}
                                            alt="gambar-umkm"
                                            className="object-cover"
                                            fill
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Nama Toko
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.nama}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Nama Pemilik
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.nama_pemilik}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Nomor HP Pemilik
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.nomor_hp}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Alamat
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.alamat}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Kelengkapan Surat
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.kelengkapan_surat}
                            </h2>
                        </span>
                    </div>

                    <div className="p-4 border rounded-xl flex flex-col gap-2 h-fit">
                        <h2 className="font-bold text-xl ">Produk</h2>

                        <hr />

                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Produk Dijual
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.produk}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Harga Produk
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.rentang_harga}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">
                                Volume
                            </p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.volume}
                            </h2>
                        </span>
                    </div>
                </section>
            </div>
        </main>
    );
}
