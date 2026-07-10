import { publicProgramHtmlResponse } from "@/lib/protected-html";

export const dynamic = "force-dynamic";

export function GET() {
  return publicProgramHtmlResponse();
}
