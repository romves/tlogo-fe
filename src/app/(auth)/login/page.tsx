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
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
    const { data: session, status } = useSession();

    if (status == "authenticated") {
        redirect("/admin/umkm");
    }

    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginPayloadSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function onSubmit() {
        // signIn("credentials", {
        //     username: form.getValues("username"),
        //     password: form.getValues("password"),
        // })
        //     .then((res: any) => {
        //         if (res.error) {
        //             toast.error("Gagal masuk");
        //             return;
        //         }
        //         form.reset();
        //         toast.success("Berhasil masuk");
        //     })
        //     .catch((err) => {
        //         if (err.error) {
        //             toast.error("Gagal masuk");
        //             form.setError("username", {
        //                 type: "manual",
        //                 message: "Username atau password salah",
        //             });
        //             form.setError("password", {
        //                 type: "manual",
        //                 message: "Username atau password salah",
        //             });
        //             return;
        //         }
        //     });

        toast.promise(
            signIn("credentials", {
                username: form.getValues("username"),
                password: form.getValues("password"),
                redirect: false
            }),
            {
                loading: "Loading...",
                success: (data) => {
                    form.reset();
                    toast.success("Berhasil masuk");
                    return "Berhasil masuk";
                },
                error: (err) => {
                    form.setError("username", {
                        type: "manual",
                        message: "Username atau password salah",
                    });
                    form.setError("password", {
                        type: "manual",
                        message: "Username atau password salah",
                    });
                    return "Gagal masuk";
                },
            }
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
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
                        // method="POST"
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
                            // disabled={form.formState.isSubmitting}
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-btn rounded-lg focus:outline-none hover:bg-green-btn-hover transition-colors"
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
