// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  "/dashboard",  // Add the route you want to protect
      // Add more routes as needed
]);

export default clerkMiddleware(async(auth, req) => {
  const {userId}=await auth();
  if (isProtectedRoute(req)&&!userId) {
    return new Response("Unauthorized",{status:401});
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

