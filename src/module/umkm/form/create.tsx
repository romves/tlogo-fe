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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreateUmkmForm() {
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
            kategori: "",
            foto: "",
        },
    });

    function onSubmit(data: CreateUmkm) {
        console.log(data);
    }

    return (
        <div className="max-w-96 p-8 space-y-2">
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
                                        placeholder="Contoh: -6.123456, 106.123456"
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
                                        placeholder="08xxxxxxxxxx"
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
                        name="kategori"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
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
                    <FormField
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
                                        className={cn(
                                            fieldState.error && "border-red-400"
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </div>
    );
}
