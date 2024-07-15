import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "./config/db";
import UserModel from "./app/models/User";

export async function middleware(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.includes("dashboard");

  const cookies = request.headers.get("cookie");

  const res = await fetch(`${request.nextUrl.origin}/api/auth/islogin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cookies }),
  });

  if (!isDashboard && res.status === 200) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboard && res.status !== 200) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signup", "/signin"],
};
