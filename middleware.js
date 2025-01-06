import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Your secret for JWT validation
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  // Get the token from the user's cookies
  const token = await getToken({ req, secret });

  // Check if the user's role is "admin"
  const isAdmin = token?.role === "admin";

  // Redirect non-admin users to the home page
  if (req.nextUrl.pathname.startsWith("/admin/dashboard/") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access for admins
  return NextResponse.next();
}

// Configure which routes this middleware applies to
export const config = {
  matcher: ["/admin/dashboard/:path*"], // Apply middleware to all routes under /admin/dashboard/
};
