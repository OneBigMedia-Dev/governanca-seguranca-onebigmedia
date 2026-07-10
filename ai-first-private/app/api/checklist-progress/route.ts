import { checklistItemIds } from "@/lib/checklist-data";
import { getAllowedSessionEmail } from "@/lib/session";
import { supabaseRestFetch } from "@/lib/supabase-rest";

type ProgressRow = {
  checked_ids?: string[];
  updated_at?: string;
};

const allowedChecklistIds = new Set(checklistItemIds);

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0"
    }
  });
}

function normalizeCheckedIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const ids = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => allowedChecklistIds.has(item));

  return Array.from(new Set(ids)).sort();
}

function encodedEmailFilter(email: string): string {
  return encodeURIComponent(`eq.${email}`);
}

export async function GET() {
  const user = await getAllowedSessionEmail();

  if (!user) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  try {
    const response = await supabaseRestFetch({
      path: `ai_first_checklist_progress?email=${encodedEmailFilter(user.email)}&select=checked_ids,updated_at`,
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      return jsonResponse({ error: "progress_load_failed" }, 502);
    }

    const rows = (await response.json()) as ProgressRow[];
    const row = rows[0];

    return jsonResponse({
      checkedIds: normalizeCheckedIds(row?.checked_ids ?? []) ?? [],
      updatedAt: row?.updated_at ?? null
    });
  } catch {
    return jsonResponse({ error: "progress_load_failed" }, 500);
  }
}

export async function PUT(request: Request) {
  const user = await getAllowedSessionEmail();

  if (!user) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const checkedIds = normalizeCheckedIds(
    typeof body === "object" && body !== null && "checkedIds" in body
      ? (body as { checkedIds: unknown }).checkedIds
      : null
  );

  if (!checkedIds) {
    return jsonResponse({ error: "invalid_checked_ids" }, 400);
  }

  try {
    const response = await supabaseRestFetch({
      method: "POST",
      path: "ai_first_checklist_progress?on_conflict=email",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation"
      },
      body: {
        email: user.email.toLowerCase(),
        user_name: user.name,
        checked_ids: checkedIds
      }
    });

    if (!response.ok) {
      return jsonResponse({ error: "progress_save_failed" }, 502);
    }

    const rows = (await response.json()) as ProgressRow[];

    return jsonResponse({
      checkedIds,
      updatedAt: rows[0]?.updated_at ?? null
    });
  } catch {
    return jsonResponse({ error: "progress_save_failed" }, 500);
  }
}
