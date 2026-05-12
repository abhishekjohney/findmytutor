import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Protect /dashboard, /parent, /tutor, /admin
  const isDashboardRoute = 
    pathname.startsWith("/tutor") || 
    pathname.startsWith("/parent") || 
    pathname.startsWith("/admin");

  if (isDashboardRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = session.user.role;

    // Role-based routing checks
    if (pathname.startsWith("/tutor") && role !== "TUTOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/parent", request.url));
    }

    if (pathname.startsWith("/parent") && role !== "PARENT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/tutor", request.url));
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user is on a generic dashboard redirect path
  if (pathname === "/dashboard/redirect") {
    if (!session) return NextResponse.redirect(new URL("/login", request.url));
    
    switch (session.user.role) {
      case "ADMIN":
        return NextResponse.redirect(new URL("/admin", request.url));
      case "TUTOR":
        return NextResponse.redirect(new URL("/tutor", request.url));
      case "PARENT":
      default:
        return NextResponse.redirect(new URL("/parent", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tutor/:path*", "/parent/:path*", "/admin/:path*", "/dashboard/redirect"],
};
