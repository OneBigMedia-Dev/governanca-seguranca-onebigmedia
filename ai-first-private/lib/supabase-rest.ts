const DEFAULT_SUPABASE_URL = "https://nfxynemrjcruztnhhxof.supabase.co";

type SupabaseFetchOptions = {
  method?: string;
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
};

function normalizeEnvValue(value: string | undefined): string | undefined {
  return value?.trim().replace(/^\uFEFF/, "").replace(/^["']|["']$/g, "");
}

function getSupabaseConfig() {
  const configuredUrl = normalizeEnvValue(process.env.SUPABASE_URL);
  const url = configuredUrl && URL.canParse(configuredUrl) ? configuredUrl : DEFAULT_SUPABASE_URL;
  const serviceRoleKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }

  return { url, serviceRoleKey };
}

export async function supabaseRestFetch({
  method = "GET",
  path,
  body,
  headers = {}
}: SupabaseFetchOptions): Promise<Response> {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const target = new URL(`/rest/v1/${path}`, url);

  return fetch(target, {
    method,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store"
  });
}
