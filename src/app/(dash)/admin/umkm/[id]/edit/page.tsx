import UpdateUmkmForm from "@/module/umkm/form/update";
import { getUmkmById } from "@/services/umkm.service";
import React from "react";

export default async function Page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const umkm = await getUmkmById(params.id);

    return (
        <main className="container">
            <UpdateUmkmForm umkm={umkm} params={params} />
        </main>
    );
}
