import { readFile } from "node:fs/promises";
import path from "node:path";

import { type NextRequest, NextResponse } from "next/server";

import { getAllowedSessionEmail } from "@/lib/session";

type Material = {
  fileName: string;
  downloadName: string;
  contentType: string;
};

const materials: Record<string, Material> = {
  "guia-instalacao-ai-first": {
    fileName: "guia-instalacao-ai-first.pptx",
    downloadName: "Guia Instalacao AI First.pptx",
    contentType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  },
  "guia-ferramentas-ai-first": {
    fileName: "guia-ferramentas-ai-first.docx",
    downloadName: "Guia de ferramentas AI First.docx",
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }
};

type MaterialRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, context: MaterialRouteContext) {
  const user = await getAllowedSessionEmail();

  if (!user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    return response;
  }

  const { slug } = await context.params;
  const material = materials[slug];

  if (!material) {
    return Response.json(
      { error: "not_found" },
      {
        status: 404,
        headers: {
          "Cache-Control": "private, no-store, max-age=0"
        }
      }
    );
  }

  const filePath = path.join(process.cwd(), "content", "materials", material.fileName);
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": material.contentType,
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(material.downloadName)}`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
