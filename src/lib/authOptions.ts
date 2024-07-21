import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL } from "./axios";
import { loginPayloadSchema } from "@/module/auth/types";
import { LoginPayload } from "@/module/auth/types";
import { login } from "@/services/auth.service";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: "dsatlogo_secret_24_key",
    providers: [
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                if (
                    loginPayloadSchema.safeParse(credentials).success === false
                ) {
                    throw new Error("Invalid credentials");
                }

                const { username, password } = credentials as LoginPayload;

                const res = await login({ username, password });

                if (!res.user) {
                    throw new Error("Invalid credentials");
                }

                const decoded = jwt.decode(res.accessToken) as {
                    username: string;
                    iat: number;
                    exp: number;
                };

                if (!decoded) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: res.user.id,
                    username: decoded.username,
                    accessToken: res.accessToken,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session, profile }) {
            // console.log("jwt callback", { token, user, session, profile });
            if (user) {
                return {
                    ...token,
                    name: user.username,
                    accessToken: user.accessToken,
                };
            }

            return token;
        },
        async session({ session, token, user }): Promise<any> {
            // console.log("session callback", { session, token, user });

            session.user.accessToken = token.accessToken as string;

            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};
