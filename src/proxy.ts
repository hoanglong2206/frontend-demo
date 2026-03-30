import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password", "/home", "/chat", "/discover"];
const PROTECTED_ROUTE_PREFIX = ["settings", "ai"];
// Profile routes (/:username) are public in the Instagram demo
const DYNAMIC_PROTECTED_ROUTES = /^\/(?!home|chat|discover)[^\/]+$/;

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasAuthCookie = request.cookies.has("accessToken");

	const isAuthRoute = ["/login", "/register", "/forgot-password"].includes(
		pathname,
	);
	if (hasAuthCookie && isAuthRoute) {
		return NextResponse.redirect(new URL("/home", request.url));
	}

	const isPublic = PUBLIC_ROUTES.includes(pathname);
	const isProtected =
		!isPublic &&
		(PROTECTED_ROUTE_PREFIX.some((prefix) =>
			pathname.startsWith(`/${prefix}`),
		) ||
			DYNAMIC_PROTECTED_ROUTES.test(pathname));

	if (!hasAuthCookie && isProtected) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	// Run middleware on all routes except static assets and API routes
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

