import UpdateUmkmForm from "@/module/umkm/form/update";
import { getUmkmById } from "@/services/umkm.service";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbLink href="/admin/umkm">
                        Dashboard UMKM
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbLink href={`/admin/umkm/${umkm.id}`}>
                        {umkm.nama}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Update</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <UpdateUmkmForm umkm={umkm} params={params} />
        </main>
    );
}
