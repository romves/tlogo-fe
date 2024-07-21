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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);

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
    toast.promise(
      signIn("credentials", {
        username: form.getValues("username"),
        password: form.getValues("password"),
        redirect: false,
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
        <h2 className="mb-6 text-3xl font-semibold  text-gray-700">Masuk</h2>
        <p className="mb-6 text-sm  text-green-prim">Masuk ke Akun</p>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                      className={cn(fieldState.error && "border-red-400")}
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
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={cn(
                          fieldState.error && "border-red-400",
                          "pr-10"
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-btn rounded-lg focus:outline-none hover:bg-green-btn-hover transition-colors"
            >
              Masuk
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
