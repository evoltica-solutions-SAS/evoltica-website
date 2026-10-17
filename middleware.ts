import { NextResponse, type NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE, SESSION_COOKIE } from "@/lib/auth-cookies";

/**
 * Primera barrera de las áreas privadas (ADR-012). Es optimista: solo mira si
 * hay una cookie de sesión y, si no, redirige a /login sin tocar datos.
 * La autorización real (sesión válida + rol) ocurre en el servidor, en el
 * layout y en cada página/acción (`requireRole`). Una cookie falsificada pasa
 * este filtro y aun así no obtiene nada.
 */
export function middleware(request: NextRequest) {
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE) || request.cookies.has(DEMO_SESSION_COOKIE);

  if (!hasSessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = request.nextUrl.pathname.startsWith("/app")
      ? `?next=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`
      : "";
    const response = NextResponse.redirect(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/app", "/app/:path*", "/admin", "/admin/:path*"],
};
