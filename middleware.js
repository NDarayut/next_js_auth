import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Secret key that is used to validate the JWT 
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  // Get the token from the user's cookies
  const token = await getToken({ req, secret });

  // Check if the user is logged in
  const isLoggedIn = token != null; // If the token exist then the user is logged in

  // If user is logged in and trying to access /login or /register, redirect them to the homepage
  if (isLoggedIn && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check if the user's role is "admin"
  const isAdmin = token?.role === "admin";

  // Redirect non-admin users to the home page if accessing the admin dashboard
  if (req.nextUrl.pathname.startsWith("/admin/dashboard/") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes this middleware applies to
export const config = {
  matcher: ["/admin/dashboard/:path*", "/login", "/register"], // Apply middleware to these routes
};
