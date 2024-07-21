import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            name: string;
            accessToken: string;
        };
    }

    interface DefaultUser {
        username: string;
        accessToken: string;
    }

    // interface User {
    //     username: string;
    //     accessToken: string;
    // }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            username: string;
            accessToken: string;
        };
    }
}
