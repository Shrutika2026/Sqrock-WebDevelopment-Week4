import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-edge";

const publicRoutes = ["/", "/login", "/register", "/courses", "/coding", "/tests"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith("/courses/") ||
      pathname.startsWith("/coding/") ||
      pathname.startsWith("/tests/")
  );
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith("/api");
  const isStaticRoute =
    pathname.startsWith("/_next") || pathname.startsWith("/favicon");

  if (isApiRoute || isStaticRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute && user) {
    const dashboard =
      user.role === "student" ? "/dashboard" : "/instructor";
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  if (!isPublicRoute && !isAuthRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/instructor") && user?.role === "student") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && user?.role !== "student") {
    return NextResponse.redirect(new URL("/instructor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
