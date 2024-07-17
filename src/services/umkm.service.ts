import { axiosInstance } from "@/lib/axios";
import { UMKM, UMKMAdmin } from "@/module/umkm/types";
import axios from "axios";

async function getAllUmkm(): Promise<UMKMAdmin[]> {
    const { data } = await axiosInstance.get("/umkm");
    return Promise.resolve(data.data);
}

async function getUmkmById(id: string) {
    return await axiosInstance.get(`/umkm/${id}`);
}

async function createUmkmById() {}

async function updateUmkmById() {}

async function deleteUmkmById(id: string) {
    return axiosInstance.delete(`/umkm/${id}`);
}

async function createUmkmBatchCSV(data: any) {
    return await axios.post("http://localhost:3001/umkm/batch", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export {
    getAllUmkm,
    getUmkmById,
    createUmkmById,
    updateUmkmById,
    deleteUmkmById,
    createUmkmBatchCSV,
};
