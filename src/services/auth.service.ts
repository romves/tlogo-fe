'use server'

import { axiosInstance } from "@/lib/axios";
import { LoginPayload } from "@/module/auth/types";

export async function login(payload: LoginPayload) {
    const { data } = await axiosInstance.post("/auth/login", payload);

    return Promise.resolve(data.data);
}
