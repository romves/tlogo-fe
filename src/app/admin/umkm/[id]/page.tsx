import { Button } from "@/components/ui/button";
import { UMKMAdmin } from "@/module/umkm/types";
import { getUmkmById } from "@/services/umkm.service";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const umkm = await getUmkmById(params.id);

    return (
        <main className="container py-4">
            <div className="grid xl:grid-cols-2 gap-4">
                <Button className="w-fit ml-auto">
                    Ubah Data UMKM
                </Button>

                <section className="grid md:grid-cols-2 gap-2 md:gap-4">
                    <div className="p-4 border rounded-xl flex flex-col gap-2 h-fit overflow-x-hidden">
                        <h2 className="font-bold text-xl">Informasi UMKM</h2>
                        <hr />

                        <div className="flex mb-4 gap-2 overflow-x-scroll">
                            {umkm.foto.map((foto) => {
                                return (
                                    <img
                                        src={foto.url_foto}
                                        alt="gambar-umkm"
                                        className="object-cover"
                                    />
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
