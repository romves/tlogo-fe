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
        <main className="container">
            <Breadcrumb className="py-4">
                <BreadcrumbList>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbLink href="/umkm">Lapak Umkm</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>{umkm.nama}</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid xl:grid-cols-2 gap-4">
                <section className="flex flex-col gap-2 md:gap-4 md:max-w-[600px]">
                    <div className="relative aspect-[6/4] w-full overflow-hidden rounded-xl shadow-md">
                        <Image
                            src={umkm.foto[0].url_foto}
                            alt="gambar-umkm"
                            className="object-cover"
                            fill
                        />
                    </div>
                    <div className="flex gap-2">
                        {umkm.foto.length > 1 ? (
                            umkm.foto.slice(1, 4).map((foto, index) => (
                                <div
                                    className="relative aspect-square overflow-hidden rounded-xl w-[31.7%] shadow-md"
                                >
                                    <Image
                                        key={index}
                                        src={foto.url_foto}
                                        alt="gambar-umkm"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="bg-neutral-300  aspect-square w-[31.7%] rounded-xl shadow-md"></div>
                                <div className="bg-neutral-300  aspect-square w-[31.7%] rounded-xl shadow-md"></div>
                                <div className="bg-neutral-300  aspect-square w-[31.7%] rounded-xl shadow-md"></div>
                               
                            </>
                        )}
                    </div>
                </section>

                <section className="bg-white space-y-2 p-4 shadow-md rounded-xl h-fit">
                    <h1 className="text-lg md:text-xl font-semibold">
                        Informasi Toko
                    </h1>

                    <div className="grid gap-2">
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">Nama Toko</p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.nama}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">Nama Pemilik</p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.nama_pemilik}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">Produk Dijual</p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.produk}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">Harga Produk</p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.rentang_harga}
                            </h2>
                        </span>
                        <span>
                            <p className="text-xs lg:text-sm text-neutral-700/70 font-medium">Alamat</p>
                            <h2 className="text-sm md:text-base font-semibold">
                                {umkm.alamat}
                            </h2>
                        </span>

                        <div className="text-xs md:text-sm mt-2 text-black/50 font-medium">
                            Informasi lebih lanjut hubungi penjual melalui{" "}
                            <a
                                href={`https://wa.me/${umkm.nomor_hp}`}
                                className="text-blue-500"
                            >
                                Whatsapp
                            </a>
                        </div>

                        <hr />

                        <h1 className="text-base md:text-lg font-semibold">
                            Lokasi
                        </h1>
                        <div className="">
                            <iframe
                                className="w-full aspect-[21/9]"
                                src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3949.802864216327!2d${umkm.koordinat_umkm[1]}!3d${umkm.koordinat_umkm[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMDcnMTcuNiJTIDExMsKwMTInMDIuNSJF!5e0!3m2!1sen!2sid!4v1721375669775!5m2!1sen!2sid`}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}