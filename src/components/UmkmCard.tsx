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
            <Card className="h-[19rem] md:h-[20rem]">
                <CardHeader>
                    <div className="relative w-full h-[10rem] rounded-md overflow-hidden">
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
                    <CardTitle className="text-base lg:text-xl leading-tight line-clamp-2">
                        {umkm.nama}
                    </CardTitle>
                    <div className="space-y-1 md:space-y-2">
                        <CardDescription className="text-xs before:content-cart-icon before:mr-1 flex line-clamp-2">
                            {umkm.produk}
                        </CardDescription>
                        <CardDescription className="line-clamp-2 text-xs before:content-loc-pin-icon before:mr-1">
                            {umkm.alamat}
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
