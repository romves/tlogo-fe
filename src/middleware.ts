import { request } from "http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/admin/:path*", "/admin"],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, raw: true });

    const { pathname } = req.nextUrl;

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
