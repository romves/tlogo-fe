export interface UMKMAdmin {
    id: number;
    nama: string;
    alamat: string;
    koordinat_umkm: string[];
    nama_pemilik: string;
    nomor_hp: string;
    rentang_harga: string;
    kelengkapan_surat: string;
    produk: string;
    volume: string;
    foto: [
        {
            url_foto: string;
        }
    ];
}

export type UMKM = Omit<UMKMAdmin, "deskripsi" | "koordinat_umkm" | "rentang_harga" | "kelengkapan_surat" | "volume">;
