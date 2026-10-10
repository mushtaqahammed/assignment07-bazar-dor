import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  // User login না করলে signin page-এ পাঠাবে
  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // User login করা থাকলে requested page-এ যেতে দেবে
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/productDetail/:path*"],
};
