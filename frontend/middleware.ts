import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = (await cookies()).get("access_token");
  const redirect = (url: string) => {
    request.nextUrl.pathname = url;
    return NextResponse.redirect(request.nextUrl);
  };

  if (pathname === "/") {
    if (accessToken) {
      return redirect("/dashboard");
    } else {
      return redirect("/login");
    }
  }
  const protectedPaths = ["/dashboard"];
  if (protectedPaths.includes(pathname)) {
    if (accessToken) {
      return NextResponse.next();
    } else {
      return redirect("/login");
    }
  }
  return NextResponse.next();
}
