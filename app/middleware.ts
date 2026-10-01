import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname =
    req.nextUrl.pathname;

  const adminToken =
    req.cookies.get(
      "admin-session"
    )?.value;

  const userToken =
    req.cookies.get(
      "user-session"
    )?.value;

  if (
    pathname.startsWith(
      "/admin/dashboard"
    )
  ) {
    if (
      adminToken !==
      process.env.ADMIN_KEY
    ) {
      return NextResponse.redirect(
        new URL(
          "/login/admin",
          req.url
        )
      );
    }
  }

  if (
    pathname.startsWith("/user")
  ) {
    if (
      userToken !==
      process.env.USER_BASE_KEY
    ) {
      return NextResponse.redirect(
        new URL(
          "/login/user",
          req.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/user/:path*",
  ],
};