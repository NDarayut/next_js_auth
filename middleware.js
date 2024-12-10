export {default} from "next-auth/middleware"

// prevent the dashboard page from access if user is not logged in
export const config = {matcher: ["/dashboard"]}