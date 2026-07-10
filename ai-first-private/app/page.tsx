import { redirect } from "next/navigation";

import { getAllowedSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getAllowedSession();

  if (session) {
    redirect("/checklist");
  }

  redirect("/login");
}
