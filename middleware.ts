/// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// List of PUBLIC routes
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    // Public route, no auth needed
    return;
  }

  // All other routes are protected
  auth().then((authObj) => {
    if (!authObj.userId) {
      // Redirect unauthenticated user to sign-in
      return Response.redirect(new URL("/sign-in", req.url));
    }
  });
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // This protects all routes except static files
};
