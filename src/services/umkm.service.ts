import { BASE_URL, api, formDataApi } from "@/lib/axios";
import { CreateUmkm } from "@/module/umkm/form/schema";
import { UMKM, UMKMAdmin } from "@/module/umkm/types";
import axios from "axios";

async function getAllUmkm(): Promise<UMKMAdmin[]> {
    const { data } = await api.get("/umkm");
    return Promise.resolve(data.data);
}

async function getUmkmById(id: string): Promise<UMKMAdmin> {
    const { data } = await api.get(`/umkm/${id}`);
    return Promise.resolve(data.data);
}

async function createUmkm(data: CreateUmkm) {
    // const x = {
    //     nama: "UMKM Postman",
    //     koordinat_umkm: "-8.122907,112.1971171",
    //     alamat: "Jl. Raya",
    //     nama_pemilik: "Pemilik 1",
    //     nomor_hp: "08123456789",
    //     rentang_harga: "> 200.000",
    //     kelengkapan_surat: "NPWP",
    //     produk: "Minuman",
    //     volume: "12kg",
    //     foto: [
    //         {
    //             url_foto: "https://via.placeholder.com/150",
    //         },
    //     ],
    // };

    // return await fetch(`${BASE_URL}/umkm`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(x),
    // });

    return await api.post("/umkm", data);
}

async function updateUmkmById() {

}

async function deleteUmkmById(id: string) {
    return api.delete(`/umkm/${id}`);
}

async function createUmkmBatchCSV(payload: any) {
    const { data } = await formDataApi.post("/umkm/batch", payload);

    return Promise.resolve(data.data);
}

export {
    getAllUmkm,
    getUmkmById,
    createUmkm,
    updateUmkmById,
    deleteUmkmById,
    createUmkmBatchCSV,
};
