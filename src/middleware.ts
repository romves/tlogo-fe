import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/admin/:path*", "/admin"],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, raw: true });

    if (!token && process.env.NEXTAUTH_URL) {
        return NextResponse.redirect(process.env.NEXTAUTH_URL + "/login");
    }
}
