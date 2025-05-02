import { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((req: NextRequest) => {
  // Middleware logic here if needed
});

export const config = {
  // Protect all routes under /dashboard
  matcher: ["/dashboard/:path*"],
};
