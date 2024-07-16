import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.includes("dashboard");

  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });

  if (!isDashboard && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signup", "/signin"],
};
