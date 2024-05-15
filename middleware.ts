import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/organization(.*)",
  "/select-org(.*)",
  "/board(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!isProtectedRoute(req) && auth().userId) {
    let path = "/select-org";

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  const signInPath = process.env.NEXT_PUBLIC_SIGN_IN_URL || "/sign-in";
  if (!auth().userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL(signInPath, req.url));
  }

  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
