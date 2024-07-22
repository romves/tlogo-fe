import { nullable, z } from "zod";

export const createUmkmSchema = z.object({
    nama: z.string().min(1, "Nama Umkm tidak boleh kosong").max(255),
    // deskripsi: z.string(),
    alamat: z.string().min(1, "Alamat tidak boleh kosong"),
    koordinat_umkm: z
        .string()
        .regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/i, "Koordinat tidak valid"),
    nama_pemilik: z.string().min(1, "Nama Pemilik tidak boleh kosong").max(255),
    nomor_hp: z
        .string()
        .regex(
            /^(\+62|62)8[1-9][0-9]{6,9}$/i,
            "Nomor HP tidak valid, pastikan diawali 62"
        ),
    rentang_harga: z
        .string()
        .min(1, "Rentang Harga tidak boleh kosong")
        .max(255),
    kelengkapan_surat: z.string(),
    produk: z.string().min(1, "Produk tidak boleh kosong"),
    volume: z.string(),
    foto: z.any(),
    // foto: z.string(),
});
export type CreateUmkm = z.infer<typeof createUmkmSchema>;

export const updateUmkmSchema = z.object({
    nama: z.string().min(1, "Nama Umkm tidak boleh kosong").max(255),
    alamat: z.string().min(1, "Alamat tidak boleh kosong"),
    koordinat_umkm: z
        .string()
        .regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/i, "Koordinat tidak valid"),
    nama_pemilik: z.string().min(1, "Nama Pemilik tidak boleh kosong").max(255),
    nomor_hp: z
        .string()
        .regex(
            /^(\+62|62)8[1-9][0-9]{6,9}$/i,
            "Nomor HP tidak valid, pastikan diawali 62"
        ),
    rentang_harga: z
        .string()
        .min(1, "Rentang Harga tidak boleh kosong")
        .max(255),
    kelengkapan_surat: z.string(),
    produk: z.string().min(1, "Produk tidak boleh kosong"),
    volume: z.string(),
    foto: z.any(),
});
export type UpdateUMKM = z.infer<typeof updateUmkmSchema>

export const createBatchUmkmCsvSchema = z.object({
    csv: z
        .instanceof(File, {
            message: "Dokumen CSV tidak boleh kosong",
        })
        .refine((file) => file.type === "text/csv", {
            message: "File harus berformat CSV",
        }),
});

export type CreateBatchUmkmCsv = z.infer<typeof createBatchUmkmCsvSchema>;
