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
import { uploadImagesLogic } from "@/services/file-upload.service";
import { createUmkm } from "@/services/umkm.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateUmkmForm() {
    const router = useRouter();
    const [photoFieldCount, setPhotoFieldCount] = useState(1);
    const form = useForm<CreateUmkm>({
        resolver: zodResolver(createUmkmSchema),
        defaultValues: {
            nama: "",
            // deskripsi: "",
            koordinat_umkm: "",
            alamat: "",
            nama_pemilik: "",
            nomor_hp: "",
            rentang_harga: "",
            kelengkapan_surat: "",
            produk: "",
            volume: "",
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

            toast.promise(createUmkm(form.getValues()), {
                loading: "Menambahkan UMKM...",
                success: () => {
                    form.reset(); // Reset the form
                    router.push(`/admin/umkm`); // Navigate to the UMKM admin page
                    router.refresh(); // Refresh the router
                    return "Sukses menambahkan UMKM";
                },
                error: "Gagal menambahkan UMKM",
            });
        } catch (error) {
            console.error("Error uploading images or creating UMKM:", error);
            toast.error("Gagal menambahkan UMKM");
        }
    }

    return (
        <div className="max-w-96 md:max-w-[50vw] py-8 md:p-8 space-y-2">
            <h2 className="font-semibold text-lg">Tambah UMKM</h2>
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

                    {/* <FormField
                        control={form.control}
                        name="foto"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>
                                    Link Foto{" "}
                                    <span className="!text-neutral-500 text-xs">
                                        (Google Drive)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Link 1, Link 2 (jika > 1)"
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* <FormField
                        control={form.control}
                        name="kategori_id"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">
                                                Makanan
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Minuman
                                            </SelectItem>
                                            <SelectItem value="2">
                                                Perabotan
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="foto"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Foto <span className="text-xs text-destructive">*Maksimal 4</span></FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            if (
                                                (e?.target?.files?.length ??
                                                    0) > 4
                                            ) {
                                                form.setError("foto", {
                                                    type: "manual",
                                                    message: "Maksimal 4 foto",
                                                });

                                                form.reset();
                                            } else {
                                                onChange(
                                                    Array.from(
                                                        e.target.files || []
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* {Array.from({ length: photoFieldCount }).map((_, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={`foto_${index}` as "foto"}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>
                                        Link Foto{" "}
                                        <span className="!text-neutral-500 text-xs">
                                            (Google Drive)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex items-end gap-2">
                                            <Input
                                                {...field}
                                                placeholder="Link 1, Link 2 (jika > 1)"
                                                className={cn(
                                                    fieldState.error &&
                                                        "border-red-400"
                                                )}
                                            />
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    onClick={() =>
                                                        photoFieldCount > 1 &&
                                                        setPhotoFieldCount(
                                                            (prev) => prev - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                    ))} */}

                    {/* <Button
                        type="button"
                        variant='link'
                        className="px-0"
                        onClick={() => setPhotoFieldCount((prev) => prev + 1)}
                    >
                        Tambah Foto
                    </Button>
                    <br  /> */}
                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </div>
    );
}
