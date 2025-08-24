import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        authorized({ req, token }) {
            const { pathname } = req.nextUrl

            if (
                pathname.startsWith("/api/auth/") ||
                pathname === "/login" ||
                pathname === "/register"
            ) {
                return true
            }

            if (pathname.startsWith('/') || pathname.startsWith('/api/videos')) {
                return true
            }

            if (token) {
                return !!token //covert to boolean if-  token ? true : false
            }
        }
    },
)

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
};