import { type NextRequest, NextResponse } from "next/server";

const sessionCookieNames = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token"
];

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/programa-ai-first", request.url));
  response.headers.set("Cache-Control", "private, no-store, max-age=0");

  for (const name of sessionCookieNames) {
    response.cookies.set(name, "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: true
    });
  }

  return response;
}
