import { readFile } from "node:fs/promises";
import path from "node:path";

import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { isAllowedEmail } from "@/lib/access";

type ProtectedHtmlFile = "programa-ai-first.html" | "pre-curso-ai-first.html";

function loginRedirect(request: NextRequest): NextResponse {
  const url = new URL("/login", request.url);
  url.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function rewriteHtml(html: string): string {
  const privateNav = [
    '<div style="position:sticky;top:0;z-index:9999;background:#08090d;border-bottom:1px solid rgba(255,255,255,.14);padding:10px 16px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:13px;color:#f4f2ec">',
    '<div style="max-width:1180px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">',
    '<strong style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#D896FF">Área privada AI First</strong>',
    '<span style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">',
    '<a style="color:#f4f2ec;text-decoration:none" href="/orientacoes">Orientações</a>',
    '<a style="color:#a4a6b5;text-decoration:none" href="/instalacao">Instalação</a>',
    '<a style="color:#a4a6b5;text-decoration:none" href="/checklist">Checklist</a>',
    '<a style="color:#a4a6b5;text-decoration:none" href="/materiais">Materiais</a>',
    '<a style="color:#a4a6b5;text-decoration:none" href="/cronograma">Cronograma</a>',
    '<a style="color:#a4a6b5;text-decoration:none" href="/duvidas">Dúvidas</a>',
    '<a style="color:#a4a6b5;text-decoration:none" href="/logout">Sair</a>',
    "</span>",
    "</div>",
    "</div>"
  ].join("");

  return html
    .replaceAll("../onebigmedia%20logo.png", "/onebigmedia%20logo.png")
    .replaceAll("./onebigmedia%20logo.png", "/onebigmedia%20logo.png")
    .replaceAll('href="pre-curso-ai-first.html"', 'href="/pre-curso-ai-first"')
    .replaceAll('href="programa-ai-first.html"', 'href="/programa-ai-first"')
    .replace("<body>", `<body>${privateNav}`);
}

function rewritePublicProgramHtml(html: string, email: string | null): string {
  const safeEmail = email ? escapeHtml(email) : null;
  const sessionLinks = email
    ? [
        '<span style="color:#a4a6b5">Logado como ',
        safeEmail,
        "</span>",
        '<a style="color:#f4f2ec;text-decoration:none" href="/orientacoes">Área privada</a>',
        '<a style="color:#a4a6b5;text-decoration:none" href="/checklist">Checklist</a>',
        '<a style="color:#a4a6b5;text-decoration:none" href="/logout">Sair</a>'
      ].join("")
    : "";

  const publicNav = [
    '<div style="position:sticky;top:0;z-index:9999;background:#08090d;border-bottom:1px solid rgba(255,255,255,.14);padding:10px 16px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:13px;color:#f4f2ec">',
    '<div style="max-width:1180px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">',
    '<strong style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#D896FF">Programa AI First</strong>',
    '<span style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">',
    sessionLinks,
    "</span>",
    "</div>",
    "</div>"
  ].join("");

  return html
    .replaceAll("../onebigmedia%20logo.png", "/onebigmedia%20logo.png")
    .replaceAll("./onebigmedia%20logo.png", "/onebigmedia%20logo.png")
    .replaceAll('href="pre-curso-ai-first.html"', 'href="/pre-curso-ai-first"')
    .replaceAll('href="programa-ai-first.html"', 'href="/programa-ai-first"')
    .replace("<body>", `<body>${publicNav}`);
}

export async function protectedHtmlResponse(
  request: NextRequest,
  fileName: ProtectedHtmlFile
): Promise<NextResponse> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email || !isAllowedEmail(email)) {
    return loginRedirect(request);
  }

  const htmlPath = path.join(process.cwd(), "content", fileName);
  const html = await readFile(htmlPath, "utf8");

  return new NextResponse(rewriteHtml(html), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}

export async function publicProgramHtmlResponse(): Promise<NextResponse> {
  const session = await auth();
  const email = session?.user?.email;
  const allowedEmail = email && isAllowedEmail(email) ? email : null;

  const htmlPath = path.join(process.cwd(), "content", "programa-ai-first.html");
  const html = await readFile(htmlPath, "utf8");

  return new NextResponse(rewritePublicProgramHtml(html, allowedEmail), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0"
    }
  });
}
