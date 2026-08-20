import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const PROTECTED_PATHS = ["/auth/update-password", "/analytics", "/account"];

export async function middleware(request: NextRequest) {
    const { supabaseResponse, claims } = await updateSession(request);

    const isProtectedRoute = PROTECTED_PATHS.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedRoute && !claims) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/auth/login";
        redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};