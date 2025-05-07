// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// Define routes that should be protected


const isProtectedRoute = createRouteMatcher(["/(.*)"]); // matches all routes
const isPublicRoute = createRouteMatcher(["/"]);  



export default clerkMiddleware(async(auth, req) => {
  const {userId}=await auth();
  if (isProtectedRoute(req)&&!isPublicRoute(req)&&!userId) {
    return NextResponse.redirect(new URL("/sign-in",req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

