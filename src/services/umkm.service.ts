import { api, formDataApi } from "@/lib/axios";
import { CreateUmkm, UpdateUMKM } from "@/module/umkm/form/schema";
import { UMKMAdmin } from "@/module/umkm/types";

async function getAllUmkm(query?: {
    perPage?: string;
    page?: string;
}): Promise<{ data: UMKMAdmin[]; meta: Meta }> {
    try {
        const searchParams = new URLSearchParams();
        if (query?.perPage) {
            searchParams.append("perPage", query.perPage);
        }
        if (query?.page) {
            searchParams.append("page", query.page);
        }

        const { data } = await api.get(`/umkm?${searchParams.toString()}`);

        console.log(data);

        return { data: data.data, meta: data.meta };
    } catch (error) {
        console.error("Error get all umkm:", error);
        throw new Error("Failed to fetch UMKM data. Please try again later.");
    }
}

async function getUmkmById(id: string): Promise<UMKMAdmin> {
    try {
        const { data } = await api.get(`/umkm/${id}`);
        return data.data;
    } catch (error) {
        console.error("Error get umkm by id:", error);
        throw new Error(
            "Failed to fetch UMKM data by ID. Please try again later."
        );
    }
}

async function createUmkm(data: CreateUmkm): Promise<UMKMAdmin> {
    // return await fetch(`${BASE_URL}/umkm`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(x),
    // });

    return await api.post("/umkm", data);
}

async function updateUmkmById(payload: UpdateUMKM, id: string) {
    try {
        const { data } = await api.put(`/umkm/${id}`, payload);

        return data.data;
    } catch (error) {
        console.error("Error update umkm", error);
        throw new Error("Failed to update UMKM");
    }
}

async function deleteUmkmById(id: string) {
    return api.delete(`/umkm/${id}`);
}

async function createUmkmBatchCSV(payload: any) {
    const { data } = await formDataApi.post("/umkm/batch", payload);

    return data.data;
}

export {
    createUmkm,
    createUmkmBatchCSV,
    deleteUmkmById,
    getAllUmkm,
    getUmkmById,
    updateUmkmById,
};
