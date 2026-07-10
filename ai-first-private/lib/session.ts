import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { isAllowedEmail } from "@/lib/access";

export async function requireAllowedSession() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  if (!isAllowedEmail(email)) {
    redirect("/login?error=AccessDenied");
  }

  return session;
}

export async function getAllowedSession() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email || !isAllowedEmail(email)) {
    return null;
  }

  return session;
}
