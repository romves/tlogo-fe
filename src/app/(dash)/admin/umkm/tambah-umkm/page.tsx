import Maps from "@/components/Maps";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateUmkmForm from "@/module/umkm/form/create";
import CreateBatchUmkmForm from "@/module/umkm/form/create-batch";
import React from "react";

export default function Page() {
    return (
        <main className="w-[90%] mx-auto text-lg">
            <Breadcrumb className="pt-8">
                <BreadcrumbList>
                    <BreadcrumbLink href="/admin/umkm">UMKM</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Tambah UMKM</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid md:grid-cols-2 justify-center">
                <CreateUmkmForm />
                <CreateBatchUmkmForm />
            </div>
            {/* <Maps /> */}
        </main>
    );
}
