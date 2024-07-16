import CreateUmkmForm from "@/module/umkm/form/create";
import CreateBatchUmkmForm from "@/module/umkm/form/create-batch";
import React from "react";


export default function Page() {
  

    return (
        <main className="grid">
            <CreateUmkmForm />
            <CreateBatchUmkmForm />
        </main>
    );
}
