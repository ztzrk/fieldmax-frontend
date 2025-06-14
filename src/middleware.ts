import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPaths = ["/login", "/register"];

    const isPublicPath = publicPaths.some(
        (publicPath) =>
            path === publicPath ||
            (publicPath !== "/" && path.startsWith(publicPath))
    );

    const token = request.cookies.get("sessionId")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
