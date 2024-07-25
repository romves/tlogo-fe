"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateUmkm, createUmkmSchema } from "@/module/umkm/form/schema";
import { updateUmkmById } from "@/services/umkm.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UMKMAdmin } from "../types";
import { uploadImagesLogic } from "@/services/file-upload.service";
import { X } from "lucide-react";

export default function UpdateUmkmForm({
    params,
    umkm,
}: {
    params: { id: string };
    umkm: UMKMAdmin;
}) {
    const router = useRouter();
    // const [photoFieldCount, setPhotoFieldCount] = useState(1);
    const form = useForm<CreateUmkm>({
        resolver: zodResolver(createUmkmSchema),
        defaultValues: {
            nama: umkm.nama ?? "",
            // deskripsi: "",
            koordinat_umkm: umkm.koordinat_umkm.join(",") ?? "",
            alamat: umkm.alamat ?? "",
            nama_pemilik: umkm.nama_pemilik ?? "",
            nomor_hp: umkm.nomor_hp ?? "",
            rentang_harga: umkm.rentang_harga ?? "",
            kelengkapan_surat: umkm.kelengkapan_surat ?? "",
            produk: umkm.produk ?? "",
            volume: umkm.volume ?? "",
            foto: [],
            // ...Array.from({ length: photoFieldCount }).reduce<{
            //     [key: string]: string;
            // }>((acc, _, index) => ({ ...acc, [`foto_${index}`]: "" }), {}),
        },
    });

    async function onSubmit() {
        try {
            const uploadedFileUrlList = await uploadImagesLogic(
                form.getValues("foto")
            );

            form.setValue(
                "foto",
                uploadedFileUrlList.map((url) => ({ url_foto: url }))
            );

            toast.promise(updateUmkmById(form.getValues(), params.id), {
                loading: "Memproses perubahan UMKM...",
                success: (data) => {
                    form.reset();
                    router.push(`/admin/umkm/${params.id}`);
                    router.refresh();
                    return "Sukses mengubah UMKM";
                },
                error: (err) => {
                    return err.message;
                },
            });
        } catch (error) {
            console.error("Error uploading images or updating UMKM:", error);
            toast.error("Gagal mengupdate UMKM");
        }
    }

    return (
        <div className="mx-auto max-w-xl py-8 md:p-8 space-y-2">
            <h2 className="font-semibold text-lg">Update UMKM</h2>
            <Form {...form}>
                <form
                    className="space-y-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="nama"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Nama Umkm</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Warung Murah Asli Pekalongan"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="deskripsi"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Input {...field} className={cn(fieldState.error && 'border-red-400')}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="alamat"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Alamat</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: Jalan Tlogo No. 123"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="koordinat_umkm"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Koordinat UMKM</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: -6.123456,106.123456"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nama_pemilik"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Nama Pemilik</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: John Doe"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nomor_hp"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Nomor HP</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="628xxxxxxxxxx"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="produk"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Produk UMKM</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: Makanan, Perabotan, dll"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="volume"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Volume Produk</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: 120ml atau 1kg, 5kg (jika > 1)"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rentang_harga"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Rentang Harga</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: 20.000 atau 10.000 - 50.000 "
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="kelengkapan_surat"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Kelengkapan Surat</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: SIUP, NPWP, TDP"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="foto"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Foto</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            onChange(
                                                Array.from(e.target.files || [])
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex overflow-x-auto gap-1">
                        {umkm.foto?.map((foto, index) => (
                            <div key={index} className="relative">
                                <img
                                    key={index}
                                    src={foto.url_foto}
                                    alt={`Foto UMKM ${umkm.nama}`}
                                    className="w-6/4"
                                />
                                <button
                                    className="absolute bg-neutral-800/70 top-1 right-1 rounded-full p-[2px]"
                                    type="button"
                                >
                                    <X
                                        size={16}
                                        color="#ffffff"
                                        strokeWidth={3}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>

                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </div>
    );
}
