"use client";

import loginImage from "@/assets/loginImage.png";
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
import { LoginPayload, loginPayloadSchema } from "@/module/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
    // const { data: session, status } = useSession();

    // if (status == "authenticated") {
    //     redirect("/admin/umkm");
    // }

    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginPayloadSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function onSubmit() {
        console.log({
            username: form.getValues("username"),
            password: form.getValues("password"),
        })

        toast.success("Berhasil masuk");
        signIn("credential", {
            redirect: false,
            username: form.getValues("username"),
            password: form.getValues("password"),
            callbackUrl: `${window.location.origin}/admin/umkm`,
        })
            .then((res: any) => {
                if (res.error) {
                    toast.error("Gagal masuk");
                    return;
                }

                form.reset();
                toast.success("Berhasil masuk");
            })
            .catch((err) => {
                toast.error("Coba lagi");

                form.setError("username", {
                    type: "manual",
                    message: "Coba lagi",
                });
                form.setError("password", {
                    type: "manual",
                    message: "Coba lagi",
                });
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <Head>
                <title>Masuk</title>
            </Head>

            <div className=" w-full max-w-md p-8">
                <Image
                    src={loginImage}
                    width={300}
                    height={300}
                    alt="login image"
                    className="mx-auto object-cover"
                />
                <h2 className="mb-6 text-3xl font-semibold  text-gray-700">
                    Masuk
                </h2>
                <p className="mb-6 text-sm  text-green-prim">Masuk ke Akun</p>

                <Form {...form}>
                    <form
                        method="POST"
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Nama Pengguna</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Nama Pengguna"
                                            className={cn(
                                                fieldState.error &&
                                                    "border-red-400"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Kata Sandi</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="••••••••"
                                            className={cn(
                                                fieldState.error &&
                                                    "border-red-400"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <div className="mb-4">
                            <label
                                htmlFor="nama"
                                className="block mb-2 text-sm font-medium "
                            >
                                Nama Pengguna
                            </label>
                            <input
                                type="text"
                                id="nama"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                                placeholder="Nama pengguna"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-600"
                            >
                                Kata Sandi
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2  border rounded-lg focus:outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div> */}
                        <button
                            disabled={form.formState.isSubmitting}
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-btn rounded-lg focus:outline-none"
                        >
                            Masuk
                        </button>
                        {/* <button
                            onClick={() => signIn()}
                            type="button"
                            className="w-full px-4 py-2 text-white bg-green-btn rounded-lg focus:outline-none"
                        >
                            Masuk
                        </button> */}
                    </form>
                </Form>
            </div>
        </div>
    );
}
