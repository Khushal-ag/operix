import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { verifyJwt } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const decoded = token ? verifyJwt(token) : null;

  const isProtected = req.nextUrl.pathname.startsWith("/admin");

  if (isProtected && !decoded) {
    const loginUrl = new URL("/signin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
