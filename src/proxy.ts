import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

/**
 * Legacy paths kept alive for inbound links, bookmarks, and search results.
 *
 * NOTE: Next.js 16 only executes `src/proxy.ts`. The previous rules lived in
 * `src/app/middleware.ts`, which never ran — every one of these redirects
 * 404'd. Keep new legacy routes here, not in an `app/middleware.ts`.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/research": "/bdb-labs/research",
  "/publications": "/bdb-labs/publications",
  "/repository": "/bdb-labs/repository",
  "/advisory": "/bpv/advisory",
  "/case-studies": "/bpv/case-studies",
  "/writing": "/insights",
};

/** Prefix rewrites, applied after the exact-match table. */
const LEGACY_PREFIXES: Array<[string, string]> = [["/writing/", "/insights/"]];

function redirectLegacyPath(req: NextRequest): NextResponse | null {
  const { pathname } = req.nextUrl;

  const exact = LEGACY_REDIRECTS[pathname];
  if (exact) {
    return NextResponse.redirect(new URL(exact, req.url), 308);
  }

  for (const [from, to] of LEGACY_PREFIXES) {
    if (pathname.startsWith(from)) {
      const target = `${to}${pathname.slice(from.length)}`;
      return NextResponse.redirect(new URL(target, req.url), 308);
    }
  }

  return null;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const legacy = redirectLegacyPath(req);
  if (legacy) return legacy;

  const isLoggedIn = Boolean(req.auth);
  const isDashboard = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/dashboard/login";

  if (isDashboard && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/research",
    "/publications",
    "/repository",
    "/advisory",
    "/case-studies",
    "/writing",
    "/writing/:path*",
  ],
};
