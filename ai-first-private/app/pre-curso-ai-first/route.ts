import { type NextRequest } from "next/server";

import { protectedHtmlResponse } from "@/lib/protected-html";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  return protectedHtmlResponse(request, "pre-curso-ai-first.html");
}
