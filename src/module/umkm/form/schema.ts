import { z } from "zod";

export const createUmkmSchema = z.object({
    nama: z.string().min(1, "Nama Umkm tidak boleh kosong").max(255),
    // deskripsi: z.string(),
    alamat: z.string().min(1, "Alamat tidak boleh kosong"),
    koordinat_umkm: z.string().min(1, "Koordinat UMKM tidak boleh kosong"),
    nama_pemilik: z.string().min(1, "Nama Pemilik tidak boleh kosong").max(255),
    nomor_hp: z.string().min(1, "Nomor HP Pemilik tidak boleh kosong").max(255),
    rentang_harga: z
        .string()
        .min(1, "Rentang Harga tidak boleh kosong")
        .max(255),
    kelengkapan_surat: z.string(),
    produk: z.string().min(1, "Produk tidak boleh kosong"),
    volume: z.string(),
    foto: z.string(),
});

export type CreateUmkm = z.infer<typeof createUmkmSchema>;

export const createBatchUmkmCsvSchema = z.object({
    csv: z
        .instanceof(File, {
            message: "Dokuemn CSV tidak boleh kosong",
        })
        .refine((file) => file.type === "text/csv", {
            message: "File harus berformat CSV",
        }),
});

export type CreateBatchUmkmCsv = z.infer<typeof createBatchUmkmCsvSchema>;