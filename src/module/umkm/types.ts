export interface UMKMAdmin {
    id: number;
    nama: string;
    deskripsi: string;
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

export type UMKM = Omit<UMKMAdmin, "kelengkapan_surat">;
