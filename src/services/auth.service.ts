'use server'

import { api } from "@/lib/axios";
import { LoginPayload } from "@/module/auth/types";

export async function login(payload: LoginPayload) {
    try {
        const { data } = await api.post("/auth/login", payload);
        return data.data;
    } catch (error) {
        console.error("Login error:", error);
        return error;
    }
}
