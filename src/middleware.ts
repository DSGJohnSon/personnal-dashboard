import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/login"]);
const isBasePage = createRouteMatcher(["/"]);
const isProtectedRoute = createRouteMatcher(["/*", "/dashboard(.*)"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (isAuthPage(request) && convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/dashboard");
  }
  if (
    !isAuthPage(request) &&
    isProtectedRoute(request) &&
    !convexAuth.isAuthenticated()
  ) {
    return nextjsMiddlewareRedirect(request, "/login");
  }
  if (isBasePage(request)) {
    return nextjsMiddlewareRedirect(request, "/dashboard");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
