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
import {
    updateUmkmById
} from "@/services/umkm.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UMKMAdmin } from "../types";

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

    function onSubmit(data: CreateUmkm) {
        toast.promise(updateUmkmById(form.getValues(), params.id), {
            loading: "Memproses perubahan UMKM...",
            success: (data) => {
                form.reset();
                router.push(`/admin/umkm/${params.id}`)
                router.refresh()
                return "Sukses mengubah UMKM";
            },
            error: (err) => {
                return err.message;
            },
        });
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
                    {/* <FormField
                        control={form.control}
                        name="foto"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Foto</FormLabel>`
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) =>
                                            onChange(
                                                e.target.files &&
                                                    e.target.files[0]
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

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
