"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "sonner";
import { deleteUmkmById } from "@/services/umkm.service";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function DeleteUMKM({ id }: { id: string }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <Dialog open={open}>
            <DialogTrigger
                className={buttonVariants({
                    variant: "destructive",
                })}
                onClick={() => setOpen(true)}
            >
                Hapus UMKM
            </DialogTrigger>
            <DialogContent className="max-w-[350px]">
                <DialogHeader>
                    <DialogTitle>
                        Anda yakin menghapus data UMKM ini?
                    </DialogTitle>
                    <DialogDescription>
                        Data UMKM yang sudah dihapus tidak bisa dikembalikan.
                    </DialogDescription>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            className={buttonVariants({
                                variant: "destructive",
                            })}
                            onClick={() => {
                                setOpen(false);
                                toast.promise(deleteUmkmById(id), {
                                    loading: "Menghapus data UMKM...",
                                    success: () => {
                                        router.replace("/admin/umkm")
                                        return "Data UMKM berhasil dihapus"
                                    },
                                    error: "Gagal menghapus data UMKM",
                                });
                            }}
                        >
                            Hapus
                        </Button>
                        <Button
                            className={buttonVariants({
                                variant: "secondary",
                            })}
                            onClick={() => setOpen(false)}
                        >
                            Batal
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
