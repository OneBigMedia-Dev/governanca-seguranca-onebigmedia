function parseAllowedEntries(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const allowedEntries = parseAllowedEntries();

  return allowedEntries.some((entry) => {
    if (entry.startsWith("@")) {
      return normalizedEmail.endsWith(entry);
    }

    return normalizedEmail === entry;
  });
}
