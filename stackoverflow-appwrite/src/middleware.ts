import { NextResponse, NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  return NextResponse.next();
}

export const config = {
  /* match all the request paths except for the ones that starts with:
  - api
  - favicon.com
  - _next/static
  - _next/image
  */

  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
