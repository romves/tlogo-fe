import { getAllUmkm } from "@/services/umkm.service";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { UMKM } from "@/module/umkm/types";
import Image from "next/image";
import Link from "next/link";

export default async function UmkmCard({ umkm }: { umkm: UMKM }) {
    return (
        <Link
            href={{
                pathname: `/umkm/${umkm.id}`,
            }}
        >
            <Card className="h-[18rem] md:h-[20rem]">
                <CardHeader>
                    <div className="relative w-full h-[10rem]">
                        <Image
                            className="object-cover"
                            loading="lazy"
                            src={
                                umkm?.foto[0]?.url_foto ??
                                "https://via.placeholder.com/200"
                            }
                            alt={umkm.nama}
                            fill
                        />
                    </div>
                </CardHeader>
                <CardContent className="space-y-1 md:space-y-3">
                    <CardTitle className="text-base lg:text-xl">
                        {umkm.nama}
                    </CardTitle>
                    <div className="md:space-y-2">
                        <CardDescription>{umkm.produk}</CardDescription>
                        <CardDescription className="line-clamp-2 text-xs">
                            {umkm.alamat}
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
