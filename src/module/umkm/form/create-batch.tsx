"use client";

import React from "react";
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
import { createUmkmBatchCSV } from "@/services/umkm.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBatchUmkmCsvSchema } from "./schema";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { create } from "domain";

export default function CreateBatchUmkmForm() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(createBatchUmkmCsvSchema),
    });

    async function onSubmit() {
        // await createUmkmBatchCSV(form.getValues())
        //     .then(() => {
        //         toast.success("Berhasil menambahkan UMKM");
        //         form.reset();
        //         // refresh

        //         router.push("/admin/umkm");
        //     })
        //     .catch((err) => {
        //         toast.error(err.message);
        //     });
        toast.promise(createUmkmBatchCSV(form.getValues()), {
            loading: "Loading...",
            success: (data) => {
                form.reset();
                router.push("/admin/umkm");

                return data.message;
            },
            error: (err) => {
                return err.message;
            },
        });
    }

    return (
        <div className="max-w-96 md:max-w-[50vw] py-8 md:p-8">
            <h2 className="font-semibold text-lg">
                Tambah UMKM via Google Sheets CSV
            </h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <FormField
                        name="csv"
                        control={form.control}
                        render={({
                            field: { value, onChange, ...field },
                            fieldState,
                        }) => {
                            const error = fieldState.error;

                            return (
                                <FormItem>
                                    <FormLabel>Dokumen CSV</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className={cn(
                                                error &&
                                                    "border-red-500 text-red-500"
                                            )}
                                            type="file"
                                            accept="text/csv"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    onChange(e.target.files[0]);
                                                    form.setValue(
                                                        "csv",
                                                        e.target.files[0]
                                                    );
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </div>
    );
}
