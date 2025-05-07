// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public and protected routes
const isProtectedRoute = createRouteMatcher(["/(.*)"]);
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async(auth, req) => {

  console.log("Middleware triggered on:", req.nextUrl.pathname);
  const { userId } =await auth(); // ✅ No await
  console.log("User ID:", userId);


  if (isProtectedRoute(req) && !isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
