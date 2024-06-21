import { MiddlewareConfig, NextRequest } from "next/server";

const authPath = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("EBUDDY_TOKEN");

  // Redirect to login page if user is not authenticated
  if (!authPath.includes(request.nextUrl.pathname) && !token) {
    return Response.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to home page if user is authenticated
  if (authPath.includes(request.nextUrl.pathname) && token) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
