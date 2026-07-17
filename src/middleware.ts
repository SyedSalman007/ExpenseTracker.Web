import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "@/lib/jwt";
import { ROUTES } from "@/lib/constants";

const AUTH_PATHS: string[] = [ROUTES.LOGIN, ROUTES.SIGN_UP];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isTokenValid(request.cookies.get("token")?.value);

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(authenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN, request.url)
    );
  }

  if (authenticated && AUTH_PATHS.includes(pathname)) {
    console.log(`[middleware] ${pathname}: already authenticated, redirecting to dashboard`);
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (!authenticated && !AUTH_PATHS.includes(pathname)) {
    console.log(`[middleware] ${pathname}: no valid token, redirecting to login`);
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
