import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUmkmById } from "@/services/umkm.service";
import Image from "next/image";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const umkm = await getUmkmById(params.id);

    return (
        <main className="w-[90%] mx-auto py-4">
            <Breadcrumb className="pb-4">
                <BreadcrumbList>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbLink href="/umkm">Lapak Umkm</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>{umkm.nama}</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid xl:grid-cols-2 gap-4">
                <section className="flex gap-2">
                    <div className="relative w-[70%] aspect-square">
                        <Image
                            src={umkm.foto[0].url_foto}
                            alt="gambar-umkm"
                            className="object-cover"
                            fill
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[30%]">
                        {umkm.foto.length > 1 ? (
                            umkm.foto
                                .slice(1)
                                .map((foto, index) => (
                                    <Image
                                        key={index}
                                        src={foto.url_foto}
                                        alt="gambar-umkm"
                                        width={800}
                                        height={600}
                                        className="object-cover"
                                    />
                                ))
                        ) : (
                            <>
                                <div className="bg-neutral-200 w-full aspect-square"></div>
                                <div className="bg-neutral-200 w-full aspect-square"></div>
                            </>
                        )}
                    </div>
                </section>
                <section className="space-y-4 p-4 py-5 md:p-8 md:py-9 shadow-md rounded-xl h-fit">
                    <h1 className="text-lg md:text-3xl font-semibold">
                        Informasi Toko
                    </h1>

                    <div className="grid gap-3">
                        <span>
                            <p className="text-xs md:text-lg">Nama Toko</p>
                            <h2 className="text-sm md:text-2xl font-medium">
                                {umkm.nama}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs md:text-lg">Nama Pemilik</p>
                            <h2 className="text-sm md:text-2xl font-medium">
                                {umkm.nama_pemilik}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs md:text-lg">Produk Dijual</p>
                            <h2 className="text-sm md:text-2xl font-medium">
                                {umkm.produk}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs md:text-lg">Harga Produk</p>
                            <h2 className="text-sm md:text-2xl font-medium">
                                {umkm.rentang_harga}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs md:text-lg">Alamat</p>
                            <h2 className="text-sm md:text-2xl font-medium">
                                {umkm.alamat}
                            </h2>
                        </span>

                        <div className="text-xs md:text-base mt-4">
                            Informasi lebih lanjut hubungi penjual melalui{" "}
                            <a
                                href={`https://wa.me/${umkm.nomor_hp}`}
                                className="text-blue-500"
                            >
                                Whatsapp
                            </a>
                        </div>
                    </div>
                </section>
                <section className="space-y-2 p-4 shadow-md rounded-xl">
                    <h1 className="text-lg md:text-3xl font-semibold">
                        Lokasi Toko
                    </h1>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            className="w-full aspect-video"
                            src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3949.802864216327!2d${umkm.koordinat_umkm[1]}!3d${umkm.koordinat_umkm[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMDcnMTcuNiJTIDExMsKwMTInMDIuNSJF!5e0!3m2!1sen!2sid!4v1721375669775!5m2!1sen!2sid`}
                            loading="lazy"
                        ></iframe>
                    </div>
                </section>
            </div>
        </main>
    );
}
