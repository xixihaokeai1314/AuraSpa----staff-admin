import { NextRequest, NextResponse } from "next/server";

// Route protection map: path prefix → allowed roles
const PROTECTED: Record<string, string[]> = {
  "/customer": ["customer"],
  "/staff": ["staff"],
  "/manager": ["manager"],
  "/admin": ["owner"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matchedPrefix = Object.keys(PROTECTED).find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!matchedPrefix) return NextResponse.next();

  const role = request.cookies.get("auraspa_role")?.value;
  const allowedRoles = PROTECTED[matchedPrefix];

  // Not logged in → redirect to login
  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Wrong role → redirect to their own dashboard
  if (!allowedRoles.includes(role)) {
    const redirects: Record<string, string> = {
      customer: "/customer",
      staff: "/staff",
      manager: "/manager",
      owner: "/admin",
    };
    return NextResponse.redirect(new URL(redirects[role] ?? "/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/staff/:path*", "/manager/:path*", "/admin/:path*"],
};
