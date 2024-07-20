import { z } from "zod";

export const loginPayloadSchema = z.object({
    username: z.string().min(3, "Username harus lebih dari 3 karakter"),
    password: z.string().min(8, "Password harus lebih dari 8 karakter"),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
