import CreateUmkmForm from "@/module/umkm/form/create";
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
        <div>
            <CreateUmkmForm />
        </div>
    );
}
